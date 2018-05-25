/**
 * Created by Mtime on 2018/5/24.
 */
(function ($) {
    $.fn.tableListSlide = function (options) {
        var that = this;

        // 获取每日排片占比列的宽度
        var moveWidth = $(this).find(".day").outerWidth();
        // 获取表格外层div的宽度
        var wrapWidth = $(this).parent().width();
        // 获取表格宽度
        var tableWidth = $(this).outerWidth();

        // 注册右侧点击事件
        $("#tableCut .cut-btn").on("click", function () {

            // 获取点击滑动按钮的类型
            var slideType = $(this).attr("data-type");

            // 获取表格偏移出去的距离
            var scrollWidth = $(that).position().left;

            // 判断向左移动时偏移距离+外侧宽度大于表格最大宽度则不移动，向右移动时偏移距离为0则不移动
            if((-scrollWidth + wrapWidth >= tableWidth && slideType==="left") || (scrollWidth==0 && slideType==="right")) {
                return false;
            }

            // 计算移动的位置
            var tableLeft = slideType==="left" ? (scrollWidth-moveWidth) : (scrollWidth+moveWidth);

            // 设置表格的移动
            $(that).css("left", tableLeft);
            // 设置固定部分的定位
            $(".fixation").css("left", Math.abs(tableLeft));
        });
    };
})(jQuery);