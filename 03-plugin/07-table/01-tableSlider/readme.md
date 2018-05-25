实现方式是，table外层包裹了一个div，显示了部分的table；点击左右滑块的时候，根据"每日排片占比"的宽度设置table表格的left偏移，然后将“影城名称、省、市、总排片占比”再设置相反的left，这样table偏移走了，然后这几个固定的又设置偏移回来了，在视觉上固定显示到div的左侧

有几个注意的地方，就是table需要有一个固定的宽度，不然table放到div中就会被挤压；“每日排片占比”的宽度是相同的；还有一个是样式问题，table表格的样式需要这么设置一下，不然table移动的时候边框线会跟着一起动了

```css
.row-piece {
    position: relative;
    border-spacing: 0;
    /*border-collapse: collapse;*/
    font-size: 13px;
    width: 1180px;
    border-right: 1px solid #737373;
    border-bottom: 1px solid #737373;
}

.row-piece th, .row-piece td{
    border-left: 1px solid #737373;
    border-top: 1px solid #737373;
}
```