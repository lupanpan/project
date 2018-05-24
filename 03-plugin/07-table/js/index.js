/**
 * Created by Mtime on 2018/5/24.
 */
(function ($) {
    $.fn.tableListSlide = function (options) {
        var that = this;
        // 注册点击事件
        $("#tableCut .left").on("click", function () {
            // 获取每日排片占比列的宽度
            var moveWidth = $(that).find(".day").innerWidth();
            console.log(moveWidth);
        });
    };
})(jQuery);