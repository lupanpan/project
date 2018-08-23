$(function () {

    
    $('#tipsTable').DataTable({
        "language": datatableLang, // 提示信息
        "paging": true, // 是否开启本地分页
        "lengthChange": false, //是否允许产品改变表格每页显示的记录数
        "searching": false, // 是否允许开启本地检索功能
        "info": true, // 控制是否显示表格左下角的信息
        "autoWidth": false, //自适应宽度，
        "bSort": false, // 禁止排序
    });
});


