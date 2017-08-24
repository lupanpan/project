(function ($) {
    $.fn.monthpicker = function (options) {
        // options 参数的结构
        options = {
            ranges: "thismonth",
            startDate: "2017-08-31",
            endDate: "2017-08-01"
        };

        // 设置当前日期控件的代码
        $("#nowDate").val(new Date());
        // 获取当前时间
        var nowDate = new Date($("#nowDate").val());
        // 当前年月
        var nowYM = {
            year: nowDate.getFullYear(),
            month: monthDate.fillZero(nowDate.getMonth() + 1)
        };
        // 根据当前时间获取所在月的最后一天
        var nowMonthEndDate = monthDate.getMonthNumByDay(nowDate).endDay;

        // 初始化控件内容
        var startcon = "", endcon = "", input_val = "";
        if (options.startDate && options.endDate) {
            startcon = getWeekRangeCon(monthDate.getWeekNumByDay(new Date(options.startDate)));
            endcon = getWeekRangeCon(monthDate.getWeekNumByDay(new Date(options.endDate)));
            input_val = startcon + "-" + endcon;
        }
        $(this).val(input_val).attr({
            startdate: options.startDate,
            enddate: options.endDate,
            ranges: options.ranges,
            startcon: startcon,
            endcon: endcon,
            title: input_val
        });

        // 控件点击事件
        $(this).click(function () {
            var that = this;

            // 获取控件的id
            var id = $(this).attr("id");

            // 如果存在下拉框，则移除
            if ($('#' + id + "_monthpicker").length > 0) {
                $('#' + id + "_monthpicker").remove();
                return false;
            }

            // 设置弹出下拉框
            $("body").append(getPickerHtml(id));
            $('#' + id + "_monthpicker").css({
                "top": $(this).offset().top + 39,
                "left": $(this).offset().left
            });

            // 点击的状态
            var clickStart = 0;
            // 起始日期
            var oneStartDate = null;
            // 日期的点击事件
            $(".monthpicker").on("click", ".date-item", function () {
                console.log('click');
                // 移除所有月范围选中状态
                $('.ranges-item').removeClass("active");

                // 如果为第一次点击
                if (clickStart == 0) {
                    // 设置起始日期
                    oneStartDate = $(this).attr("startday");

                    // 移除其他所有选中的状态
                    $(".date-lists .date-item").removeClass("select");
                    // 添加选中样式
                    $(this).addClass("select");

                    // 设置左侧文本框的内容与属性
                    $(".monthpicker .date-start").val(getMonthInputCon(oneStartDate));
                    $(".monthpicker .date-start").attr("startdate", oneStartDate).attr("con", getMonthInputCon(oneStartDate));

                    // 移除左侧文本框激活状态，为右侧文本框添加激活状态
                    $(".monthpicker .date-start").removeClass("active");
                    $(".monthpicker .date-end").addClass("active");
                }
                // 如果第二次点击
                else if (clickStart == 1) {
                    // 判断当前日期与第一次点击日期的大小
                    if (monthDate.compareDate(oneStartDate, $(this).attr("startday"))) {
                        // 如果第二次点击的日期小于第一次点击的日期，则clickStart还初始化为1，并且设置第一个文本框的数据
                        // 设置起始日期
                        oneStartDate = $(this).attr("startday");

                        // 移除其他所有选中的状态
                        $(".date-lists .date-item").removeClass("select");
                        // 添加选中样式
                        $(this).addClass("select");

                        // 设置左侧文本框的内容与属性
                        $(".monthpicker .date-start").val(getMonthInputCon(oneStartDate));
                        $(".monthpicker .date-start").attr("startdate", oneStartDate).attr("con", getMonthInputCon(oneStartDate));
                        clickStart = 1;
                        return;
                    }
                    // 如果第二次点击的日期大于第一次点击的日期，则设置右侧文本框数据
                    else {
                        // 设置右侧文本框的内容与属性
                        $(".monthpicker .date-end").val(getMonthInputCon($(this).attr("endday")));
                        $(".monthpicker .date-end").attr("enddate", $(this).attr("endday"));
                        // 移除左侧文本框激活状态，为右侧文本框添加激活状态
                        $(".monthpicker .date-end").removeClass("active");
                        $(".monthpicker .date-start").addClass("active");

                        // 计算日期间隔，如果为特定周范围，则选中对应的周范围
                        var datestart = $(".monthpicker .date-start").attr("startdate");
                        var dateend = $(".monthpicker .date-end").attr("enddate");





















                        // 获取上周范围的最后一天
                        var endDateObj_endday = monthDate.getWeekNumByDay(new Date(monthDate.getBeforeDate(nowMonthEndDate, 7))).endDay;

                        // 判断时间范围
                        if (monthDate.GetDateDiff(datestart, nowMonthEndDate) == 6 && dateend == nowMonthEndDate) {
                            // 本周
                            $('.ranges-item[data-range-key="thisweek"]').addClass("active");
                        }
                        else if (monthDate.GetDateDiff(datestart, nowMonthEndDate) == 13 && endDateObj_endday == dateend) {
                            // 上周
                            $('.ranges-item[data-range-key="lastweek"]').addClass("active");
                        }
                        else if (monthDate.GetDateDiff(datestart, nowMonthEndDate) == 27 && dateend == nowMonthEndDate) {
                            // 近4周
                            $('.ranges-item[data-range-key="last4week"]').addClass("active");
                        }
                        else if (monthDate.GetDateDiff(datestart, nowMonthEndDate) == 55 && dateend == nowMonthEndDate) {
                            // 近8周
                            $('.ranges-item[data-range-key="last8week"]').addClass("active");
                        }
                        else {
                            // 自定义
                            $('.ranges-item[data-range-key="custom"]').addClass("active");
                        }
                    }
                }
                clickStart = (clickStart == 0 ? 1 : 0);
            });

            // 日期的鼠标移入事件
            $(".monthpicker").on("mouseover", ".date-item", function () {
                // 将鼠标移入项的内容，显示到激活的文本框中
                $(".date-input.active").val($(this).html());

                // 如果为第二次点击后，鼠标移动则选中范围
                if (clickStart == 1) {
                    // 移除除了第一个选中元素外其他所有被选中的元素
                    $(".date-lists .date-item[startday!=" + oneStartDate + "]").removeClass("select");

                    // 获取当前的startday
                    var twoStartday = $(this).attr("startday");
                    // 如果第二个startday大于第一个startday，则将中的元素选中变蓝
                    if (!monthDate.compareDate(oneStartDate, twoStartday)) {
                        setMonthListSelect(oneStartDate, $(this).attr("endday"));
                    }
                }
            });

            // 日期的鼠标移出列表包裹层的事件
            $(".monthpicker").on("mouseleave", ".date-lists", function () {
                // 鼠标移出后，将左侧文本框数据恢复到原本的数据
                var val = $(".monthpicker .date-start").attr("con") || "";
                $(".monthpicker .date-start").val(val);
            });

            // 范围列表点击事件
            $(".monthpicker").on("click", ".ranges-item", function () {
                // 获取点击按钮的时间范围
                var rangeKey = $(this).attr("data-range-key");
                if (rangeKey == "custom") {
                    return;
                }

                // 选中的当前点击的，并且取消其他的选中状态
                $(this).addClass("active").siblings(".ranges-item").removeClass("active");

                // 获取起始与结束日期
                var startDate = null;
                var endDate = monthDate.getMonthNumByDay(nowDate).endDay;
                if (rangeKey == "thismonth") {
                    // 根据当前时间，获取本月的最后一天时间
                    startDate = monthDate.getMonthNumByDay(nowDate).startDay;
                }
                else if (rangeKey == "lastmonth") {
                    startDate = monthDate.getPrevMonth(nowDate,1);
                    endDate = monthDate.getMonthNumByDay(startDate).endDay;
                }
                else if (rangeKey == "last3month") {
                    // 根据当前时间，获取本周的最后一天时间
                    startDate = monthDate.getPrevMonth(nowDate,3);
                }
                else if (rangeKey == "last6month") {
                    // 根据当前时间，获取本周的最后一天时间
                    startDate = monthDate.getPrevMonth(nowDate,3);
                }

                // 设置左右文本框
                $(".monthpicker .date-start").val(getMonthInputCon(startDate));
                $(".monthpicker .date-start").attr("startdate", startDate).attr("con", getMonthInputCon(startDate));
                $(".monthpicker .date-end").val(getMonthInputCon(endDate));
                $(".monthpicker .date-end").attr("enddate", endDay).attr("con", getMonthInputCon(endDate));

                // 需要重新渲染月列表
                setDateListPlate(new Date(startDay).getFullYear());

                // 判断是否隐藏左右箭头按钮
                setPrevNextBtnShow();
            });

            // 确定按钮点击事件
            $(".monthpicker .applyBtn").on("click", function () {
                if ($(".monthpicker .date-end").val().length > 0) {
                    var val = $(".monthpicker .date-start").val() + "-" + $(".monthpicker .date-end").val();
                    $(that).val(val);
                    $(that).attr({
                        "startdate": $(".monthpicker .date-start").attr("startdate"),
                        "enddate": $(".monthpicker .date-end").attr("enddate"),
                        "ranges": $(".ranges-item.active").attr("data-range-key"),
                        "title": val,
                        "startcon": $(".monthpicker .date-start").val(),
                        "endcon": $(".monthpicker .date-end").val()
                    });
                }
                else {
                    $(that).val("");
                    $(that).attr({
                        "startdate": "",
                        "enddate": "",
                        "ranges": "",
                        "title": "",
                        "startcon": "",
                        "endcon": ""
                    });
                }

                // 移除弹框
                $('#' + id + "_monthpicker").remove();
            });

            // 取消按钮点击事件
            $(".monthpicker .cancelBtn").on("click", function () {
                // 移除弹框
                $('#' + id + "_monthpicker").remove();
            });

            // 上月按钮单击事件
            $(".monthpicker .prev").on("click", function () {
                // 获取日期标题的元素
                var yearCon = $('.monthpicker .date-year-con').html();
                // 根据当前年，获取上年
                var prevYear = monthDate.getPrevMonth(yearCon);
                // 设置周列表
                setDateListPlate(prevYear);

                // 判断是否隐藏左右箭头按钮
                setPrevNextBtnShow();
            });

            // 下月按钮单击事件
            $(".monthpicker .next").on("click", function () {
                // 获取日期标题的元素
                var yearCon = $('.monthpicker .date-year-con').html();
                // 根据当前年，获取下年
                var nextYear = monthDate.getNextYear(yearCon);
                // 设置周列表
                setDateListPlate(nextYear);

                // 判断是否隐藏左右箭头按钮
                setPrevNextBtnShow();
            });

            // 点击空白选择框消失
            $(document).click(function (e) {
                var clickEle = $(e.target).attr('id');
                var clickName = $(e.target).attr('class');
                if (clickEle == id) {
                    return false;
                }
                if (clickName) {
                    if (clickName == 'monthpicker' || clickName.indexOf("ranges-item") >= 0 || clickName.indexOf("date-item") >= 0 || clickName.indexOf("arrows") >= 0 || clickName.indexOf("ranges-btn") >= 0 || clickName.indexOf("date-year-con") >= 0 || clickName.indexOf("fa") >= 0 || clickName.indexOf("date-input") >= 0) {
                        return false;
                    }
                }

                // 触发一下确定按钮点击事件
                $(".monthpicker .applyBtn").trigger("click");
            });

            // 生成弹框时绑定的数据
            function loadmonthpicker() {
                // 判断文本框是否有值
                if ($(that).val()) {
                    // 获取起始时间与结束时间
                    var startdate = $(that).attr("startdate");
                    var enddate = $(that).attr("enddate");

                    // 根据文本框的内容设置左右文本框
                    $(".monthpicker .date-start").val($(that).attr("startcon")).attr({
                        "startdate": startdate,
                        "con": $(that).attr("startcon")
                    });
                    $(".monthpicker .date-end").val($(that).attr("endcon")).attr({
                        "enddate": enddate,
                        "con": $(that).attr("endcon")
                    });

                    // 设置选中左侧周列表
                    $(".ranges-item[data-range-key=" + $(that).attr("ranges") + "]").addClass("active");

                    // 判断是否为非自定义时间
                    if ($(that).attr("ranges") != "custom") {
                        // 如果为非自定义时间，则根据周范围生成选中日期
                        $(".ranges-item[data-range-key=" + $(that).attr("ranges") + "]").trigger("click");
                    }
                    else {
                        // 如果为自定义时间，则根据自定义时间生成日期列表
                        var leftYM = {};
                        var rightYM = {};
                        var startdate_date = new Date(startdate);
                        if (startdate_date.getMonth() == nowDate.getMonth()) {
                            // 如果起始时间与目前的当月相同，则渲染本月与上月的周列表
                            rightYM = {
                                year: startdate_date.getFullYear(),
                                month: monthDate.fillZero(startdate_date.getMonth() + 1)
                            };
                            // 上月的年月
                            leftYM = monthDate.getPrevMonth(rightYM.year, rightYM.month);
                        }
                        else {
                            // 如果起始时间与目前的当月不同，则渲染起始时间的月与下月的周列表
                            leftYM = {
                                year: startdate_date.getFullYear(),
                                month: monthDate.fillZero(startdate_date.getMonth() + 1)
                            };
                            // 下月的年月
                            rightYM = monthDate.getNextMonth(leftYM.year, leftYM.month);
                        }

                        // 设置周列表
                        setDateListPlate(leftYM.year, leftYM.month, "left");
                        setDateListPlate(rightYM.year, rightYM.month, "right");
                    }
                }
                else {
                    // 如果没有起始时间则生成本月与上月时间
                    // 上月的年月
                    var prevYM = monthDate.getPrevMonth(nowYM.year, nowYM.month);
                    // 设置周列表
                    setDateListPlate(prevYM.year, prevYM.month, "left");
                    setDateListPlate(nowYM.year, nowYM.month, "right");
                }

                // 判断是否隐藏左右箭头按钮
                setPrevNextBtnShow();
            }

            // 获取拼接文本框的内容
            function getMonthInputCon(date) {
                return new Date(date).getFullYear()+"年"+(new Date(date).getMonth()+1)+"月";
            }

            // 判断是否隐藏左右箭头按钮
            function setPrevNextBtnShow() {
                // 获取年月标题元素
                var yearCon = $(".calendar-left .date-year-con").html();

                // 判断年与当前相同
                if (yearCon == nowYM.year) {
                    $(".monthpicker .arrows.next").hide();
                }
                else if (yearCon == '2013') {
                    $(".monthpicker .arrows.prev").hide();
                }
            }

            // 根据起始与结束日期将已存在的日期列表进行选中
            function setMonthListSelect(startDate, endDate) {
                $(".date-lists .date-item").each(function () {
                    if ((!monthDate.compareDate(startDate, $(this).attr("startday"))) && (!monthDate.compareDate($(this).attr("endday"), endDate))) {
                        $(this).addClass("select");
                    }
                })
            }

            // 获取日期的弹出代码
            function getPickerHtml(id) {
                var htmlArr = [];
                // 生成日期弹出框
                htmlArr.push('<div class="monthpicker" id="' + id + '_monthpicker">');
                <!--范围列表部分-->
                htmlArr.push('<div class="ranges">');
                htmlArr.push('<ul>');
                htmlArr.push('<li class="ranges-item" data-range-key="thismonth">本月</li>');
                htmlArr.push('<li class="ranges-item" data-range-key="lastmonth">上月</li>');
                htmlArr.push('<li class="ranges-item" data-range-key="last3month">近3月</li>');
                htmlArr.push('<li class="ranges-item" data-range-key="last6month">近6月</li>');
                htmlArr.push('<li class="ranges-item" data-range-key="custom">自定义</li>');
                htmlArr.push('</ul>');
                htmlArr.push('<div class="range-btns">');
                htmlArr.push('<button class="ranges-btn applyBtn" type="button">确认</button>');
                htmlArr.push('<button class="ranges-btn cancelBtn" type="button">取消</button>');
                htmlArr.push('</div>');
                htmlArr.push('</div>');
                <!--右侧日期列表部分-->
                htmlArr.push('<div class="calendar">');
                <!--左侧顶部文本框-->
                htmlArr.push('<div class="date-input-wrap fix">');
                <!--顶部文本框-->
                htmlArr.push('<div class="date-input-panel date-input-left">');
                htmlArr.push('<input class="date-input" type="text" name="date-start" value="2017年1月" disabled>');
                htmlArr.push('<i class="fa fa-calendar"></i>');
                htmlArr.push('</div>');
                <!--顶部文本框-->
                htmlArr.push('<div class="date-input-panel date-input-right">');
                htmlArr.push('<input class="date-input" type="text" name="date-start" value="2017年8月" disabled>');
                htmlArr.push('<i class="fa fa-calendar"></i>');
                htmlArr.push('</div>');
                htmlArr.push('</div>');
                <!--日期的所属的年-->
                htmlArr.push('<div class="date-year">');
                <!--左右箭头-->
                htmlArr.push('<div class="arrows prev"><i class="fa fa-chevron-left"></i></div>');
                htmlArr.push('<div class="arrows next"><i class="fa fa-chevron-right"></i></div>');
                <!--年份-->
                htmlArr.push('<p class="date-year-con">2017</p>');
                htmlArr.push('</div>');
                <!--日期列表项-->
                htmlArr.push('<div class="date-lists">');
                htmlArr.push('</div>');
                htmlArr.push('</div>');
                htmlArr.push('</div>');
                return htmlArr.join('');
            }

            // 根据获取的月数组，生成显示的月列表
            function getMonthListHtml(dateArr) {
                console.log(dateArr);
                // 获取文本框的起始日期与结束日期
                var startDate = $(".monthpicker .date-start").attr("startdate");
                var endDate = $(".monthpicker .date-end").attr("enddate");
                // 选中状态样式
                var selectClass = "";
                // 是否为本月，文字
                var nowMonth = "";

                // 拼接月列表代码
                var htmlArr = [];
                htmlArr.push('<ul class="fix">');
                // 循环月数组
                for (var i = 0; i < dateArr.length; i++) {
                    // 判断的月列表项是否在起始与结束时间内，如果在起始与结束时间内，则添加选中状态
                    if ((startDate && endDate) && (!monthDate.compareDate(startDate, dateArr[i].startDay)) && (!monthDate.compareDate(dateArr[i].endDay, endDate))) {
                        selectClass = " select";
                    }
                    else {
                        selectClass = "";
                    }

                    // 判断月的最后一天是否与本月的最后一天相同，即为本月
                    if(nowMonthEndDate = dateArr[i].endDay){
                        nowMonth = "（本月）";
                    }
                    else {
                        nowMonth = "";
                    }

                    htmlArr.push('<li class="date-item' + selectClass + '" monthNo="' + dateArr[i].monthNo + '" startDay="' + dateArr[i].startDay + '" endDay="' + dateArr[i].endDay + '">' + dateArr[i].monthNo + '月' + nowMonth + '</li>');
                }
                htmlArr.push('</ul>');
                return htmlArr.join('');
            }

            // 设置板块的日期和代码
            function setDateListPlate(year) {
                // 获取月的数组
                var dateList = monthDate.getMonthByYear(year);
                // 根据月数组，生成月列表
                $(".monthpicker .date-lists").html(getMonthListHtml(dateList));
                    // 设置显示的年标题
                $(".monthpicker .date-year-con").html(year);
            }

            // 初始化生成弹出框后的数据绑定
            loadmonthpicker();
        })
    };
})(jQuery);
