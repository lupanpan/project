var datatableLang = {
    "sProcessing": "处理中...",
    "sLengthMenu": "每页 _MENU_ 项",
    "sZeroRecords": "没有匹配结果",
    "sInfo": "当前显示第 _START_ 至 _END_ 项，共 _TOTAL_ 项。",
    "sInfoEmpty": "当前显示第 0 至 0 项，共 0 项",
    "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
    "sInfoPostFix": "",
    // "sSearch": "本地搜索：",
    "sUrl": "",
    "sEmptyTable": "暂无数据",
    "sLoadingRecords": "载入中...",
    "sInfoThousands": ",",
    "oPaginate": {
        "sFirst": "首页",
        "sPrevious": "上页",
        "sNext": "下页",
        "sLast": "末页",
        "sJump": "跳转"
    },
    "oAria": {
        "sSortAscending": ": 以升序排列此列",
        "sSortDescending": ": 以降序排列此列"
    }
}


// $('#tipsTable').DataTable({
    //            "processing" : true, //DataTables载入数据时，是否显示进度条
    //            "serverSide": true,  //  开启服务端模式
    //             "language": lang, //提示信息
    //             "autoWidth": false, //自适应宽度，
    //             "sScrollY" : 450, //DataTables的高  
    //             "sScrollX" : 820, //DataTables的宽
    //             "columnDefs": [
    //                 {"targets": 0, "width": "10%"},  // 设置第一列的宽度
    //                 {"targets": 1, "width": "10%"},
    //                 {"targets": 2, "width": "10%"},
    //                 {"targets": 3, "width": "10%"},
    //                 {"targets": 4, "width": "20%"},
    //                 {"targets": 5, "width": "20%"},
    //                 {"targets": 6, "width": "20%"}
    //             ],
    //              "lengthMenu": [10, 20, 30],   // 显示每页显示的条数  
    //             "stripeClasses": ["odd", "even"],   // 为奇偶行添加样式
    //             "searching": true,       // 是否允许开启本地检索功能
    //             "bFilter": false,         // 去掉 搜索框
    //             "paging": true,            // 是否开启本地分页
    //             "lengthChange": true, //是否允许产品改变表格每页显示的记录数
    //             "info": true,             // 控制是否显示表格左下角的信息
    //             "bSort": false, // 禁止排序
    //             "deferRender": true,   // 延迟渲染
    //              "pageLength": 10,      // 每页显示的条数
    //                                     //跟数组下标一样，第一列从0开始，这里表格初始化时，
    //             "order": [2, 'asc'],   //asc升序   desc降序 // 下标为2，第三列 生序排列
    //             "aoColumnDefs": [{
    //                 "orderable": false,// 指定列不参与排序
    //                 "aTargets": [1,3,4,5,6] // 指定 下标为[1,3,4,5,6]的不排序 
    //             }],
    //             "initComplete": function () {  // 给每列添加下拉搜索
    //                 var api = this.api();
    //                 api.columns().indexes().flatten().each(function (i) {
    //                     if (i != 0 && i != 2 && i != 6) {  // 第1，3，7不添加，其余的添加
    //                         var column = api.column(i);
    //                         var select = $('<select><option value=""></option></select>')
    //                             .appendTo($(column.header())) // 显示在table中最上面在thead里面
    //                             .on('change', function () {
    //                                 var val = $.fn.dataTable.util.escapeRegex(
    //                                     $(this).val()
    //                                 );
    //                                 column
    //                                     .search(val ? val : '', true, false)
    //                                     .draw();
    //                             });
    
    //                         column.data().unique().sort().each(function (d, j) {
    //                             var text = $(d).html();  // 获取 span 里面的 text
    //                             var val = $(d).attr("value"); // 获取span 里面的自定义属性 value
    //                             if(text != null && text.trim() != "" && val != null && text.trim() != ""){
    //                                 select.append('<option value="' + val + '">' + text + '</option>')
    //                             }
    
    //                         });
    //                     }
    
    //                 });
    //             },
    //            "ajax": {  // ajax 请求数据
    //                 "url": "请求路径",
    //                 "type": "get"
    //             },
    //           "columns":[
            
    //         ]
        
        
    // });