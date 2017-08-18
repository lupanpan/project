(function ($) {
    $.fn.hsCheckData = function (options) {
        var defaults = {
            isShowCheckBox: false, //是否为多选，默认为false
            minCheck: 0, //默认为0，不限最少选择个数
            maxCheck: 0, //默认为0，不限最多选择个数
            data: null, //数据
            defText: null //默认值
        };

        // 合并多个对象
        var opts = $.extend(defaults, options);

        // 添加hsCheckData样式，为什么要这里加？
        $(this).addClass("hsCheckData");

        // 如果默认值不为null
        if (opts.defText != null) {
            // 设置控件文本显示
            $(this).text(opts.defText);

            // 分割为数组
            var defArray = opts.defText.split('-');
            var dataid = "";
            // 根据名称获取它的id
            for (var i = 0; i < defArray.length; i++) {
                dataid += setDefCode(defArray[i]) + "-";
            }
            dataid = dataid.substr(0, dataid.length - 1);
            $(this).attr('data-id', dataid)
        }

        // 根据名称获取它的id
        function setDefCode(deftext) {
            var defId = "";

            // 遍历所有的data数据
            for (var i = 0; i < opts.data.length; i++) {
                // 根据key值遍历每个data对象
                for (var key in opts.data[i]) {
                    var aa = opts.data[i][key];
                    // 判断key键对应的属性是否为object
                    if (opts.data[i][key].toString().indexOf("object") == -1) {
                        if (opts.data[i][key] == deftext) {
                            // 返回对象中的key值
                            return Object.keys(opts.data[i]);
                        }
                    } else {
                        var jsonTmp = opts.data[i][key];
                        for (var k = 0; k < jsonTmp.length; k++) {
                            for (var key in jsonTmp[k]) {
                                if (jsonTmp[k][key] == deftext) {
                                    return Object.keys(jsonTmp[k]);
                                }
                            }
                        }
                    }
                }
            }
        }

        // 获取控件的id
        var id = $(this).attr("id");

        // 控件点击事件
        $(this).click(function () {
            // 如果存在下拉框，则移除
            if ($('#' + id + "_hcd").length > 0) {
                $('#' + id + "_hcd").remove();
                $('#' + id).removeClass('hsCjeckData_check');
                return false;
            }
            // 下拉框箭头朝上
            $(this).addClass("hsCjeckData_check")

            // 下拉框代码
            var mainHtml = "<div id='" + id + "_hcd' class='hcd_main_border'>";
            //1、筛选input
            var filterHtml = filterHtmlFun();
            //2、数据列表
            var dataListHtml = dataListHtmlFun();
            //3、确定按钮
            var btnHtml = buttonHtml();
            mainHtml += filterHtml + dataListHtml + btnHtml + "</div>";
            //4、输出选择框
            $("body").append(mainHtml);

            //5、设置悬浮位置和大小、默认值
            var width = $(this).outerWidth();
            var height = $(this).outerHeight();
            var x = $(this).offset().top;
            var y = $(this).offset().left;
            $('#' + id + '_input').css("width", (width - 26));
            $('#' + id + '_hcd').css("width", (width - 2)).css("left", y).css("top", (x + height));

            //判断是否存在已经选择的
            setCheckData();

            //6、绑定事件
            //展开二级列表的小三角点击事件
            $('.exsitChild').click(function () {
                if ($(this).parent().nextAll("ul").is(":hidden")) {
                    $(this).addClass("exsitChild_check");
                } else {
                    $(this).removeClass("exsitChild_check");
                }
                $(this).parent().nextAll("ul").toggle();
                return false;
            });

            //去掉一级二级列表中多选框点击事件的事件冒泡
            $("[name='dataliCheck']").click(function (e) {
                e.stopPropagation();
            });
            $("[name='childcheckbox']").click(function (e) {
                e.stopPropagation();
            });

            // 列表div的点击事件
            $("[name='datali']>div").click(function () {
                if (!opts.isShowCheckBox) {
                    // 如果为单选下拉框
                    $('.hcd_dataList :checkbox').prop("checked", false);
                    $(this).children('input[type="checkbox"]').prop("checked", true);
                    var data_id = "";
                    var data_value = "";
                    data_id = $(this).children('input[type="checkbox"]').val();
                    data_value = $(this).children('input[type="checkbox"]').nextAll("span").text();
                    $('#' + id).attr('data-id', data_id).text(data_value);
                    $('#' + id + "_hcd").remove();
                    $('#' + id).removeClass('hsCjeckData_check');
                } else {
                    // 如果为多选下拉框
                    if ($(this).children('input[type="checkbox"]').is(":checked")) {
                        $(this).children('input[type="checkbox"]').prop("checked", false);
                    } else {
                        $(this).children('input[type="checkbox"]').prop("checked", true);
                    }
                }
                return false;
            });

            // 确定按钮的点击事件
            if (!opts.isShowCheckBox) {
                // 如果为单选下拉框，则不显示确定按钮
                $('#' + id + '_btn').hide();
            } else {
                // 如果为多选下拉框
                $("#" + id + "_btn").click(function () {
                    // data_id属性的值
                    var data_id = "";
                    // 选中的选项列表
                    var data_value = [];

                    // 遍历下拉列表中的复选框，选择选中的值
                    $('#' + id + '_hcd').find('input[type="checkbox"]').each(function (index, element) {
                        if ($(this).prop("checked")) {
                            // 拼接data_id
                            data_id += $(this).val() + "-";
                            // 拼接选中的选项列表
                            data_value.push('<li><span class="select_icon">×</span>');
                            data_value.push('<span class="select_text" select-id="'+$(this).attr("value")+'">' + $(this).nextAll("span").text() + '</span></li>');
                        }
                    });

                    // 截取data_id最后一个字符'-'
                    data_id = data_id.substr(0, data_id.length - 1);

                    // 控制选择最少的选项
                    if (data_id.split('-').length < opts.minCheck && opts.minCheck != 0) {
                        alert("至少选择 " + opts.minCheck + " 个选项")
                        return false;
                    }

                    // 控制选择最多的选项
                    if (data_id.split('-').length > opts.maxCheck && opts.maxCheck != 0) {
                        alert("最多选择 " + opts.maxCheck + " 个选项")
                        return false;
                    }

                    // 设置data-id属性值
                    $('#' + id).attr('data-id', data_id);
                    // 移除下拉框代码
                    $('#' + id + "_hcd").remove();
                    // 移除'正三角'样式
                    $('#' + id).removeClass('hsCjeckData_check');

                    // 设置选择项的列表
                    // 如果没有拼接的代码则添加请选择文字
                    if(data_value.length > 0){
                        $('#' + id).html('<ul class="select_list">' + data_value.join("") + '</ul>');
                    }
                    else {
                        $('#' + id).html('<span class="select_empty">请选择</span>');
                    }
                });
            }

            // 筛选
            $('#' + id + '_input').keyup(function () {
                if ($(this).val() != "") {
                    var filterHtml = "<ul>";
                    var getFilterHtml = getFilterHtmlFun($(this).val());
                    filterHtml += getFilterHtml + "</ul>";
                    $('#' + id + "_hcd").children(".hcd_dataList").html(filterHtml);
                    $("[name='dataliCheck']").click(function (e) {
                        e.stopPropagation();
                    });
                    $("[name='childcheckbox']").click(function (e) {
                        e.stopPropagation();
                    });
                    $("[name='datali']>div").click(function () {
                        if (!opts.isShowCheckBox) {
                            $('.hcd_dataList :checkbox').prop("checked", false);
                            $(this).children('input[type="checkbox"]').prop("checked", true);
                            var data_id = "";
                            var data_value = "";
                            data_id = $(this).children('input[type="checkbox"]').val();
                            data_value = $(this).children('input[type="checkbox"]').nextAll("span").text();
                            $('#' + id).attr('data-id', data_id).text(data_value);
                            $('#' + id + "_hcd").remove();
                            $('#' + id).removeClass('hsCjeckData_check');
                        } else {
                            if ($(this).children('input[type="checkbox"]').is(":checked")) {
                                $(this).children('input[type="checkbox"]').prop("checked", false);
                            } else {
                                $(this).children('input[type="checkbox"]').prop("checked", true);
                            }
                        }
                        return false;
                    });
                    setCheckData();
                } else {
                    $('#' + id + "_hcd").children(".hcd_dataList").html(dataListHtmlFun());
                    setCheckData();
                }
            });

            return false;
        });

        //设置显示默认值
        setShowData();

        //点击选中项列表的关闭按钮
        $('#' + id).on("click",".select_icon",function(e){
            // 如果存在下拉框，则移除
            if ($('#' + id + "_hcd").length > 0) {
                $('#' + id + "_hcd").remove();
                $('#' + id).removeClass('hsCjeckData_check');
            }

            // 移除data-id中对应的id
            // 获取选中标签的select-id
            var selectId = $(this).parent().find(".select_text").attr("select-id");
            // 获取该控件的data-id
            var dataId = $('#' + id).attr("data-id");
            var dataIdArr = dataId.split('-');
            for(var i = 0; i < dataIdArr.length; i++){
                // 如果遍历当前的值等于selectId，则移除该值
                if(dataIdArr[i] == selectId){
                    dataIdArr.splice(i);
                    break;
                }
            }
            // 重新设置该控件的data-id
            $('#' + id).attr("data-id",dataIdArr.join("-"));

            // 如果id为空，则添加请选择文字
            if(dataIdArr.length == 0){
                $('#' + id).html('<span class="select_empty">请选择</span>');
            }

            // 移除点击的选项
            $(this).parents("li").remove();

            // 阻止冒泡
            e.stopPropagation();
        })

        //点击空白选择框消失
        $(document).click(function (e) {
            var clickEle = $(e.target).attr('id');
            var clickName = $(e.target).attr('name');
            if (clickEle == id + "_input" || clickEle == id + "_hcd" || clickName == 'datali') {
                return false;
            }
            $('#' + id + "_hcd").remove();
            $('#' + id).removeClass('hsCjeckData_check');
        });
        //筛选input
        function filterHtmlFun() {
            var html = "<div class='hcd_filter'>";
            html += "<input type='text' id='" + id + "_input' class='hcd_filter_input'/>";
            html += "</div>";
            return html;
        }

        //数据列表
        function dataListHtmlFun() {
            var html = "<div class='hcd_dataList'>"
            //1、解析json数据
            var data = getDataHtml();
            html += data + "</div>"
            return html;
        }

        //绑定默认值
        function setCheckData() {
            if ($('#' + id).attr("data-id") != undefined && $('#' + id).attr("data-id") != "") {
                var data_id = $('#' + id).attr("data-id");
                var dataidArray = data_id.split('-');
                for (var i = 0; i < dataidArray.length; i++) {
                    $('#' + id + "_hcd").find('.hcd_dataList input[value="' + dataidArray[i] + '"]').prop("checked", true);
                }
            }
        }

        // 设置显示默认值
        function setShowData() {
            // 插入的html代码
            var selectHtml = [];
            // 判断是否有data-id属性
            if ($('#' + id).attr("data-id") != undefined && $('#' + id).attr("data-id") != "") {
                // 获取data-id属性值
                var data_id = $('#' + id).attr("data-id");
                var dataidArray = data_id.split('-');

                // 拼接代码
                selectHtml.push('<ul class="select_list">');
                for (var i = 0; i < dataidArray.length; i++) {
                    selectHtml.push('<li><span class="select_icon">×</span>');
                    selectHtml.push('<span class="select_text" select-id="'+dataidArray[i]+'">' + getName(opts.data, dataidArray[i]) + '</span></li>');
                }
                selectHtml.push('</ul>');
            }

            // 如果没有拼接的代码则添加请选择文字
            if(selectHtml.length > 0){
                $('#' + id).html(selectHtml.join(""));
            }
            else {
                $('#' + id).html('<span class="select_empty">请选择</span>');
            }
        }

        //获取名称
        function getName(json, jsonId) {
            for (var i = 0; i < json.length; i++) {
                for (var key in json[i]) {
                    if (key == jsonId) {

                        return json[i][key];
                    } else if (jsonId.indexOf(key) > -1) {
                        return getName(json[i]["childCity"], jsonId);
                    }
                }
            }
        }

        //解析Json并生成html
        function getDataHtml() {
            var html = "<ul>"
            var childIsNUll = true;
            for (var i = 0; i < opts.data.length; i++) {
                if ("childCity" in opts.data[i]) {
                    childIsNUll = false;
                }
                for (var key in opts.data[i]) {
                    if (opts.data[i][key].toString().indexOf("object") == -1) {
                        if (childIsNUll == false) {
                            html += "<li class='ec' name='datali'><div><a class='exsitChild'></a>";
                            if (opts.isShowCheckBox) {
                                html += "<input type='checkbox' name='dataliCheck' value='" + key + "'/>";
                            } else {
                                html += "<input type='checkbox' style='display:none' name='dataliCheck' value='" + key + "'/>";
                            }
                            html += "<span class='list_text'>" + opts.data[i][key] + "</span></div > ";
                            childIsNUll = true
                        } else {
                            html += "<li  name='datali'><div>";
                            if (opts.isShowCheckBox) {
                                html += "<input type='checkbox' name='dataliCheck' value='" + key + "'/>";
                            } else {
                                html += "<input type='checkbox' style='display:none' name='dataliCheck' value='" + key + "'/>";
                            }
                            html += "<span>" + opts.data[i][key] + "</span>";
                            html += "</div></li>"
                        }
                    } else {
                        html += childDataHtml(opts.data[i][key]);
                        html += "</li>"
                    }
                }
            }
            html += "</ul>";
            return html;
        }

        //解析子项
        function childDataHtml(json) {
            var html = "<ul style='display:none;padding-left:20px;'>";
            for (var i = 0; i < json.length; i++) {
                for (var key in json[i]) {
                    html += "<li name='datali'><div>";
                    if (opts.isShowCheckBox) {
                        html += "<input name='childcheckbox' type='checkbox' value='" + key + "'/>";
                    } else {
                        html += "<input name='childcheckbox' style='display:none' type='checkbox' value='" + key + "'/>";
                    }
                    html += "<span>" + json[i][key] + "</span></div ></li > ";
                }
            }
            return html + "</ul>";
        }

        // 拼接确定按钮
        function buttonHtml() {
            var html = "<div class='hcd_btn_div'>";
            html += "<button type='button' id='" + id + "_btn' class='hcd_btn'>确定</button>";
            html += "</div>";
            return html;
        }

        //过滤父项目
        function getFilterHtmlFun(filterInput) {
            var html = "";
            for (var i = 0; i < opts.data.length; i++) {
                for (var key in opts.data[i]) {
                    if (opts.data[i][key].indexOf(filterInput) > -1) {
                        html += "<li name='datali'><div>";
                        if (opts.isShowCheckBox) {
                            html += "<input name='dataliCheck' type='checkbox' value='" + key + "'/>";
                        } else {
                            html += "<input name='dataliCheck' style='display:none' type='checkbox' value='" + key + "'/>";
                        }
                        html += "<span>" + opts.data[i][key] + "</span></div ></li > ";
                    } else {
                        html += getChildFilterHtmlFun(opts.data[i][key], filterInput);
                    }
                }
            }
            return html;
        }

        function getChildFilterHtmlFun(json, filterInput) {
            var html = "";
            for (var i = 0; i < json.length; i++) {
                for (var key in json[i]) {
                    if (json[i][key].indexOf(filterInput) > -1) {
                        html += "<li name='datali'><div>";
                        if (opts.isShowCheckBox) {
                            html += "<input name= 'childcheckbox' name= 'dataliCheck' type= 'checkbox' value= '" + key + "' />";
                        } else {
                            html += "<input name= 'childcheckbox' name= 'dataliCheck' style='display:none' type= 'checkbox' value= '" + key + "' />";
                        }
                        html += "<span>" + json[i][key] + "</span></div ></li > ";
                    }
                }
            }
            return html;
        }
    };
})(jQuery);