/**
 * Created by Mtime on 2017/8/25.
 */
(function ($) {
    $.fn.yearPicker = function (option) {
        // option参数的格式
        options = {
            startDate: "2015-01-01",
            endDate: "2016-12-31"
        };

        // 设置当前代码
        $("#nowDate").val(new Date());
        // 获取当前时间
        var nowDate = new Date($("#nowDate").val());
        // 获取当前年
        var nowYear = nowDate.getFullYear();
        // 获取ename
        var ename = $(this).attr("ename");

        // 初始化下拉框列表的数据
        $("#" + ename + "_mtime_year_start").html(getOptionHtml("start"));
        $("#" + ename + "_mtime_year_end").html(getOptionHtml("end"));

        // 为起始时间下拉框添加值修改事件
        $("#" + ename + "_mtime_year_start").change(function () {
            var startYear = $(this).find("option:selected").text();
            $("#" + ename + "_mtime_year_end").html(getOptionHtml("end",startYear));
        });

        // 获取下拉列表的option参数
        function getOptionHtml(type, startYear) {
            // 默认startYear为2013年
            startYear = startYear || 2013;
            // 定义代码数组，起始日期，结束日期
            var optionHtml = [], startDate = "", endDate = "", value = "";
            for (; startYear <= nowYear; startYear++) {
                startDate = startYear + "-01-01";
                endDate = startYear + "-12-31";
                value = (type == "start") ? startDate : endDate;
                optionHtml.push('<option startDate="' + startDate + '" endDate="' + endDate + '" value="' + value + '">' + startYear + '</option>');
            }
            return optionHtml.join('');
        }

        // 如果有起始与结束时间，则绑定对应的时间
        if(options.startDate && options.endDate) {
            $("#" + ename + "_mtime_year_start").val(options.startDate);
            $("#" + ename + "_mtime_year_end").val(options.endDate);
        }
        else {
            $("#" + ename + "_mtime_year_start").val(nowYear+"-01-01");
            $("#" + ename + "_mtime_year_end").val(nowYear+"-12-31");
        }
    };
})(jQuery);