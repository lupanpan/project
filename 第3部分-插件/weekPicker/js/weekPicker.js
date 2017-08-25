(function ($) {
    $.fn.weekPicker = function (options) {
        // options 参数的结构
        options = {
            ranges: "thisweek",
            startDate: "2017-08-21",
            endDate: "2017-08-27"
        };

        // 设置当前代码
        $("#nowDate").val(new Date());
        // 获取当前时间
        var nowDate = new Date($("#nowDate").val());
        // 当前年月
        var nowYM = {
            year: nowDate.getFullYear(),
            month: weekDate.fillZero(nowDate.getMonth() + 1)
        };
        // 根据当前时间所在周的最后一天时间
        var nowWeekEndDate = weekDate.getWeekNumByDay(nowDate).endDay;

        // 初始化控件内容
        var startcon = "",endcon = "",input_val = "";
        if(options.startDate && options.endDate){
            startcon = getWeekRangeCon(weekDate.getWeekNumByDay(new Date(options.startDate)));
            endcon = getWeekRangeCon(weekDate.getWeekNumByDay(new Date(options.endDate)));
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
            if ($('#' + id + "_weekpicker").length > 0) {
                $('#' + id + "_weekpicker").remove();
                return false;
            }

            // 设置弹出下拉框
            $("body").append(getPickerHtml(id));
            $('#' + id + "_weekpicker").css({
                "top": $(this).offset().top + 39,
                "left": $(this).offset().left
            });

            // 点击的状态
            var clickStart = 0;
            // 起始日期
            var oneStartDate = null;
            // 日期的点击事件
            $(".weekpicker").on("click", ".date-item", function () {
                console.log('click');
                // 移除所有周范围选中状态
                $('.ranges-item').removeClass("active");
                
                // 如果为第一次点击
                if (clickStart == 0) {
                    // 设置起始日期
                    oneStartDate = $(this).attr("startday");

                    // 移除其他所有选中的状态
                    $(".date-lists .date-item").removeClass("select");
                    // 添加选中样式
                    $(this).addClass("select");
                    // 设置与它周相同的也选中
                    $(".date-lists .date-item[startday=" + oneStartDate + "]").addClass("select");

                    // 设置左侧文本框的内容与属性
                    $(".weekpicker .date-start").val($(this).html());
                    $(".weekpicker .date-start").attr("startdate", oneStartDate).attr("con", $(this).html());

                    // 移除左侧文本框激活状态，为右侧文本框添加激活状态
                    $(".weekpicker .date-start").removeClass("active");
                    $(".weekpicker .date-end").addClass("active");
                }
                // 如果第二次点击
                else if (clickStart == 1) {
                    // 判断当前日期与第一次点击日期的大小
                    if (weekDate.compareDate(oneStartDate, $(this).attr("startday"))) {
                        // 如果第二次点击的日期小于第一次点击的日期，则clickStart还初始化为1，并且设置第一个文本框的数据
                        // 设置起始日期
                        oneStartDate = $(this).attr("startday");

                        // 移除其他所有选中的状态
                        $(".date-lists .date-item").removeClass("select");
                        // 添加选中样式
                        $(this).addClass("select");
                        // 设置与它周相同的也选中
                        $(".date-lists .date-item[startday=" + oneStartDate + "]").addClass("select");

                        // 设置左侧文本框的内容与属性
                        $(".weekpicker .date-start").val($(this).html());
                        $(".weekpicker .date-start").attr("startdate", oneStartDate).attr("con", $(this).html());
                        clickStart = 1;
                        return;
                    }
                    // 如果第二次点击的日期大于第一次点击的日期，则设置右侧文本框数据
                    else {
                        // 设置右侧文本框的内容与属性
                        $(".weekpicker .date-end").val($(this).html());
                        $(".weekpicker .date-end").attr("enddate", $(this).attr("endday"));
                        // 移除左侧文本框激活状态，为右侧文本框添加激活状态
                        $(".weekpicker .date-end").removeClass("active");
                        $(".weekpicker .date-start").addClass("active");

                        // 计算日期间隔，如果为特定周范围，则选中对应的周范围
                        var datestart = $(".weekpicker .date-start").attr("startdate");
                        var dateend = $(".weekpicker .date-end").attr("enddate");
                        // 获取上周范围的最后一天
                        var endDateObj_endday = weekDate.getWeekNumByDay(new Date(weekDate.getBeforeDate(nowWeekEndDate, 7))).endDay;

                        // 判断时间范围
                        if (weekDate.GetDateDiff(datestart, nowWeekEndDate) == 6 && dateend == nowWeekEndDate) {
                            // 本周
                            $('.ranges-item[data-range-key="thisweek"]').addClass("active");
                        }
                        else if (weekDate.GetDateDiff(datestart, nowWeekEndDate) == 13 && endDateObj_endday == dateend) {
                            // 上周
                            $('.ranges-item[data-range-key="lastweek"]').addClass("active");
                        }
                        else if (weekDate.GetDateDiff(datestart, nowWeekEndDate) == 27 && dateend == nowWeekEndDate) {
                            // 近4周
                            $('.ranges-item[data-range-key="last4week"]').addClass("active");
                        }
                        else if (weekDate.GetDateDiff(datestart, nowWeekEndDate) == 55 && dateend == nowWeekEndDate) {
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
            $(".weekpicker").on("mouseover", ".date-item", function () {
                // 将鼠标移入项的内容，显示到激活的文本框中
                $(".date-input.active").val($(this).html());

                // 如果为第二次点击后，鼠标移动则选中范围
                if (clickStart == 1) {
                    // 移除除了第一个选中元素外其他所有被选中的元素
                    $(".date-lists .date-item[startday!=" + oneStartDate + "]").removeClass("select");

                    // 获取当前的startday
                    var twoStartday = $(this).attr("startday");
                    // 如果第二个startday大于第一个startday，则将中的元素选中变蓝
                    if (!weekDate.compareDate(oneStartDate, twoStartday)) {
                        setWeekListSelect(oneStartDate, $(this).attr("endday"));
                    }
                }
            });

            // 日期的鼠标移出列表包裹层的事件
            $(".weekpicker").on("mouseleave", ".date-lists", function () {
                // 鼠标移出后，将左侧文本框数据恢复到原本的数据
                var val = $(".weekpicker .date-start").attr("con") || "";
                $(".weekpicker .date-start").val(val);
            });

            // 范围列表点击事件
            $(".weekpicker").on("click", ".ranges-item", function () {
                // 获取点击按钮的时间范围
                var rangeKey = $(this).attr("data-range-key");
                if (rangeKey == "custom") {
                    return;
                }

                // 选中的当前点击的，并且取消其他的选中状态
                $(this).addClass("active").siblings(".ranges-item").removeClass("active");

                // 获取起始与结束日期
                var startDateObj = null;
                var endDateObj = null;
                if (rangeKey == "thisweek") {
                    // 根据当前时间，获取本周的最后一天时间
                    endDateObj = weekDate.getWeekNumByDay(nowDate);
                    startDateObj = weekDate.getWeekNumByDay(new Date(weekDate.getBeforeDate(endDateObj.endDay, 6)));
                }
                else if (rangeKey == "lastweek") {
                    // 根据当前时间获取本周最后一天时间，在获取上周最后一天时间
                    var lastDate = weekDate.getWeekNumByDay(nowDate).endDay;
                    endDateObj = weekDate.getWeekNumByDay(new Date(weekDate.getBeforeDate(lastDate, 7)));
                    startDateObj = weekDate.getWeekNumByDay(new Date(weekDate.getBeforeDate(endDateObj.endDay, 6)));
                }
                else if (rangeKey == "last4week") {
                    // 根据当前时间，获取本周的最后一天时间
                    endDateObj = weekDate.getWeekNumByDay(nowDate);
                    startDateObj = weekDate.getWeekNumByDay(new Date(weekDate.getBeforeDate(endDateObj.endDay, 27)));
                }
                else if (rangeKey == "last8week") {
                    // 根据当前时间，获取本周的最后一天时间
                    endDateObj = weekDate.getWeekNumByDay(nowDate);
                    startDateObj = weekDate.getWeekNumByDay(new Date(weekDate.getBeforeDate(endDateObj.endDay, 55)));
                }

                // 设置左右文本框
                $(".weekpicker .date-start").val(getWeekRangeCon(startDateObj));
                $(".weekpicker .date-start").attr("startdate", startDateObj.startDay).attr("con", getWeekRangeCon(startDateObj));
                $(".weekpicker .date-end").val(getWeekRangeCon(endDateObj));
                $(".weekpicker .date-end").attr("enddate", endDateObj.endDay).attr("con", getWeekRangeCon(endDateObj));

                // 需要重新渲染左右周列表
                var leftYM = {};
                var rightYM = {};
                var startDateObj_startDay = new Date(startDateObj.startDay);
                if (startDateObj_startDay.getMonth() == nowDate.getMonth()) {
                    // 如果起始时间与目前的当月相同，则渲染本月与上月的周列表
                    rightYM = {
                        year: startDateObj_startDay.getFullYear(),
                        month: weekDate.fillZero(startDateObj_startDay.getMonth() + 1)
                    };
                    // 上月的年月
                    leftYM = weekDate.getPrevMonth(rightYM.year, rightYM.month);
                }
                else {
                    // 如果起始时间与目前的当月不同，则渲染起始时间的月与下月的周列表
                    leftYM = {
                        year: startDateObj_startDay.getFullYear(),
                        month: weekDate.fillZero(startDateObj_startDay.getMonth() + 1)
                    };
                    // 下月的年月
                    rightYM = weekDate.getNextMonth(leftYM.year, leftYM.month);
                }

                // 设置周列表
                setDateListPlate(leftYM.year, leftYM.month, "left");
                setDateListPlate(rightYM.year, rightYM.month, "right");

                // 判断是否隐藏左右箭头按钮
                setPrevNextBtnShow();
            });

            // 确定按钮点击事件
            $(".weekpicker .applyBtn").on("click", function () {
                if($(".weekpicker .date-end").val().length > 0){
                    var val = $(".weekpicker .date-start").val() + "-" + $(".weekpicker .date-end").val();
                    $(that).val(val);
                    $(that).attr({
                        "startdate": $(".weekpicker .date-start").attr("startdate"),
                        "enddate": $(".weekpicker .date-end").attr("enddate"),
                        "ranges": $(".ranges-item.active").attr("data-range-key"),
                        "title": val,
                        "startcon": $(".weekpicker .date-start").val(),
                        "endcon": $(".weekpicker .date-end").val()
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
                $('#' + id + "_weekpicker").remove();
            });

            // 取消按钮点击事件
            $(".weekpicker .cancelBtn").on("click", function () {
                // 移除弹框
                $('#' + id + "_weekpicker").remove();
            });

            // 上月按钮单击事件
            $(".weekpicker .prev").on("click", function () {
                // 获取日期标题的元素
                var yearConEle = $(this).siblings('.date-year-con');
                // 获取当前的年月
                var year = yearConEle.attr('year');
                var month = yearConEle.attr('month');

                // 将左侧的数据移入到右侧
                $(".calendar-right .date-year-con").html(yearConEle.html()).attr({year: year, month: month});
                $(".calendar-right .date-lists").html($(".calendar-left .date-lists").html());

                // 根据当前年月，获取上月的年月
                var prevYM = weekDate.getPrevMonth(year, month);
                // 设置周列表
                setDateListPlate(prevYM.year, prevYM.month, "left");

                // 判断是否隐藏左右箭头按钮
                setPrevNextBtnShow();
            });

            // 下月按钮单击事件
            $(".weekpicker .next").on("click", function () {
                // 获取日期标题的元素
                var yearConEle = $(this).siblings('.date-year-con');
                // 获取当前的年月
                var year = yearConEle.attr('year');
                var month = yearConEle.attr('month');

                // 将左侧的数据移入到右侧
                $(".calendar-left .date-year-con").html(yearConEle.html()).attr({year: year, month: month});
                $(".calendar-left .date-lists").html($(".calendar-right .date-lists").html());

                // 根据当前年月，获取上月的年月
                var nextYM = weekDate.getNextMonth(year, month);
                // 设置周列表
                setDateListPlate(nextYM.year, nextYM.month, "right");

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
                if(clickName){
                    if(clickName == 'weekpicker' || clickName.indexOf("ranges-item") >= 0 || clickName.indexOf("date-item") >= 0 || clickName.indexOf("arrows") >= 0 || clickName.indexOf("ranges-btn") >= 0 || clickName.indexOf("date-year-con") >= 0 || clickName.indexOf("fa") >= 0 || clickName.indexOf("date-input") >= 0 || clickName.indexOf("ranges-items") >= 0){
                        return false;
                    }
                }

                // 触发一下确定按钮点击事件
                $(".weekpicker .applyBtn").trigger("click");
            });

            // 生成弹框时绑定的数据
            function loadWeekpicker() {
                // 判断文本框是否有值
                if ($(that).val()) {
                    // 获取起始时间与结束时间
                    var startdate = $(that).attr("startdate");
                    var enddate = $(that).attr("enddate");

                    // 根据文本框的内容设置左右文本框
                    $(".weekpicker .date-start").val($(that).attr("startcon")).attr({
                        "startdate": startdate,
                        "con": $(that).attr("startcon")
                    });
                    $(".weekpicker .date-end").val($(that).attr("endcon")).attr({
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
                                month: weekDate.fillZero(startdate_date.getMonth() + 1)
                            };
                            // 上月的年月
                            leftYM = weekDate.getPrevMonth(rightYM.year, rightYM.month);
                        }
                        else {
                            // 如果起始时间与目前的当月不同，则渲染起始时间的月与下月的周列表
                            leftYM = {
                                year: startdate_date.getFullYear(),
                                month: weekDate.fillZero(startdate_date.getMonth() + 1)
                            };
                            // 下月的年月
                            rightYM = weekDate.getNextMonth(leftYM.year, leftYM.month);
                        }

                        // 设置周列表
                        setDateListPlate(leftYM.year, leftYM.month, "left");
                        setDateListPlate(rightYM.year, rightYM.month, "right");
                    }
                }
                else {
                    // 如果没有起始时间则生成本月与上月时间
                    // 上月的年月
                    var prevYM = weekDate.getPrevMonth(nowYM.year, nowYM.month);
                    // 设置周列表
                    setDateListPlate(prevYM.year, prevYM.month, "left");
                    setDateListPlate(nowYM.year, nowYM.month, "right");
                }

                // 判断是否隐藏左右箭头按钮
                setPrevNextBtnShow();
            }

            // 判断是否隐藏左右箭头按钮
            function setPrevNextBtnShow() {
                // 获取年月标题元素
                var leftYearConEle = $(".calendar-left .date-year-con");
                var rightYearConEle = $(".calendar-right .date-year-con");

                // 判断右侧年月与当前相同
                if (rightYearConEle.attr("year") == nowYM.year && rightYearConEle.attr("month") == nowYM.month) {
                    $(".calendar-right .next").hide();
                }
                else {
                    $(".calendar-right .next").show();
                }

                // 判断左侧年月与最小时间相同
                if (leftYearConEle.attr("year") == '2013' && leftYearConEle.attr("month") == '01') {
                    $(".calendar-left .prev").hide();
                }
                else {
                    $(".calendar-left .prev").show();
                }
            }

            // 根据起始与结束日期将已存在的日期列表进行选中
            function setWeekListSelect(startDate, endDate) {
                $(".date-lists .date-item").each(function () {
                    if ((!weekDate.compareDate(startDate, $(this).attr("startday"))) && (!weekDate.compareDate($(this).attr("endday"), endDate))) {
                        $(this).addClass("select");
                    }
                })
            }

            // 获取日期的弹出代码
            function getPickerHtml(id) {
                var htmlArr = [];
                // 生成日期弹出框
                htmlArr.push('<div class="weekpicker" id="' + id + '_weekpicker">');
                // <!--范围列表部分-->;
                htmlArr.push('<div class="ranges">');
                htmlArr.push('<ul class="ranges-items">');
                htmlArr.push('<li class="ranges-item" data-range-key="thisweek">本周</li>');
                htmlArr.push('<li class="ranges-item" data-range-key="lastweek">上周</li>');
                htmlArr.push('<li class="ranges-item" data-range-key="last4week">近4周</li>');
                htmlArr.push('<li class="ranges-item" data-range-key="last8week">近8周</li>');
                htmlArr.push('<li class="ranges-item" data-range-key="custom">自定义</li>');
                htmlArr.push('</ul>');
                htmlArr.push('<div class="range-btns">');
                htmlArr.push('<button class="ranges-btn applyBtn" type="button">确认</button>');
                htmlArr.push('<button class="ranges-btn cancelBtn" type="button">取消</button>');
                htmlArr.push('</div>');
                htmlArr.push('</div>');
                //<!--左侧日历-->
                htmlArr.push('<div class="calendar calendar-left">');
                //<!--顶部文本框-->
                htmlArr.push('<div class="date-input-wrap">');
                htmlArr.push('<input class="date-input date-start active" type="text" name="date-start" value="" disabled>');
                htmlArr.push('<i class="fa fa-calendar"></i>');
                htmlArr.push('</div>');
                //<!--日期的所属的年月-->
                htmlArr.push('<div class="date-year">');
                htmlArr.push('<div class="arrows prev"><i class="fa fa-chevron-left"></i></div>');
                htmlArr.push('<p class="date-year-con">八月 2017</p>');
                htmlArr.push('</div>');
                //<!--日期列表项-->
                htmlArr.push('<div class="date-lists">');
                htmlArr.push('</div>');
                htmlArr.push('</div>');
                //<!--右侧日历-->
                htmlArr.push('<div class="calendar calendar-right">');
                // <!--顶部文本框-->
                htmlArr.push('<div class="date-input-wrap">');
                htmlArr.push('<input class="date-input date-end" type="text" name="date-end" value="" disabled>');
                htmlArr.push('<i class="fa fa-calendar"></i>');
                htmlArr.push('</div>');
                //<!--日期的所属的年月-->
                htmlArr.push('<div class="date-year">');
                htmlArr.push('<div class="arrows next"><i class="fa fa-chevron-right"></i></div>');
                htmlArr.push('<p class="date-year-con">八月 2017</p>');
                htmlArr.push('</div>');
                // <!--日期列表项-->
                htmlArr.push('<div class="date-lists">');
                htmlArr.push('</div>');
                htmlArr.push('</div>');
                htmlArr.push('</div>');
                return htmlArr.join('');
            }

            // 根据获取的周数组，生成显示的周列表
            function getWeekListHtml(dateArr) {
                console.log(dateArr);
                // 获取文本框的起始日期与结束日期
                var startDate = $(".weekpicker .date-start").attr("startdate");
                var endDate = $(".weekpicker .date-end").attr("enddate");
                // 选中状态样式
                var selectClass = "";

                // 拼接周列表代码
                var htmlArr = [];
                htmlArr.push('<ul class="fix">');

                // 循环周数组
                for (var i = 0; i < dateArr.length; i++) {
                    // 判断的周是否在起始与结束时间内，如果在起始与结束时间内，则添加选中状态
                    if ((startDate && endDate) && (!weekDate.compareDate(startDate, dateArr[i].startDay)) && (!weekDate.compareDate(dateArr[i].endDay, endDate))) {
                        selectClass = " select";
                    }
                    else {
                        selectClass = "";
                    }

                    htmlArr.push('<li class="date-item' + selectClass + '" weekNo="' + dateArr[i].weekNo + '" startDay="' + dateArr[i].startDay + '" endDay="' + dateArr[i].endDay + '">' + getWeekRangeCon(dateArr[i]) + '</li>');
                }
                htmlArr.push('</ul>');
                return htmlArr.join('');
            }

            // 设置显示的年月
            function getYearCon(year, month) {
                var monthChinese = {
                    1: "一",
                    2: "二",
                    3: "三",
                    4: "四",
                    5: "五",
                    6: "六",
                    7: "七",
                    8: "八",
                    9: "九",
                    10: "十",
                    11: "十一",
                    12: "十二"
                };
                month = parseInt(month);
                return monthChinese[month] + '月 ' + year;
            }

            // 设置板块的日期和代码
            function setDateListPlate(year, month, plateName) {
                // 获取月的周数组
                var dateList = weekDate.getWeekByYearMonth(year, month);
                // 根据周数组，生成周列表
                if (plateName == "left") {
                    $(".calendar-left .date-lists").html(getWeekListHtml(dateList));
                    // 设置显示的年月标题
                    $(".calendar-left .date-year-con").html(getYearCon(year, month));
                    $(".calendar-left .date-year-con").attr({year: year, month: month});
                }
                else if (plateName == "right") {
                    $(".calendar-right .date-lists").html(getWeekListHtml(dateList));
                    $(".calendar-right .date-year-con").html(getYearCon(year, month));
                    $(".calendar-right .date-year-con").attr({year: year, month: month});
                }
            }

            // 初始化生成弹出框后的数据绑定
            loadWeekpicker();
        })

        // 获取拼接的范围周内容
        function getWeekRangeCon(weekObj) {
            return weekObj.weekNo + '周(' + weekObj.startDay.substring(weekObj.startDay.lastIndexOf("-") + 1) + '日-' + weekObj.endDay.substring(weekObj.endDay.lastIndexOf("-") + 1) + '日)';
        }
    };
})(jQuery);
