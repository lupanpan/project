var tipList = function () {
    return this;
}

// 初始化
tipList.prototype.init = function () {
    // 初始化事件
    this.initEvent();
    // 设置 dataTable
    this.initDataTable();
}

// 设置 dataTable
tipList.prototype.initDataTable = function () {
    // 初始化表格分页
    $('#tipsTable').DataTable({
        "language": datatableLang, // 提示信息
        "paging": true, // 是否开启本地分页
        "lengthChange": false, //是否允许产品改变表格每页显示的记录数
        "searching": false, // 是否允许开启本地检索功能
        "info": true, // 控制是否显示表格左下角的信息
        "autoWidth": false, //自适应宽度，
        "bSort": false, // 禁止排序
    });

    this.tipsTable = $('#tipsTable').DataTable()
}

// 初始化事件
tipList.prototype.initEvent = function () {
    var that = this;

    // 添加事件
    $(".add-btn").on("click", function () {
        // 跳转到添加页面
        window.location = window.location.origin + "/tips/create"
    })

    // 编辑事件
    $("#tipsTable").on("click", ".edit", function () {
        // 获取该行数据的_id
        var _id = $(this).parents("tr").attr("data-id");
        // 跳转到编辑页面，并且传递该行_id的参数
        window.location = window.location.origin + "/tips/edit/" + _id;

    })

    // 删除事件
    $("#tipsTable").on("click", ".del", function () {
        var thisElement = this;

        // 删除处理函数
        function delData() {
            // 获取该行数据的_id
            var _id = $(thisElement).parents("tr").attr("data-id");

            // 拼接路由接口
            var url = "/tips/del/" + _id
            var param = {}

            // 使用 ajax 请求删除接口
            ajax.load(url, param, (data) => {
                // 判断返回数据是否成功
                if (data.flag) {
                    // 如果删除成功，则移除该行数据，这里不重新刷新页面了
                    that.tipsTable.row($(thisElement).parents("tr"))
                    .remove()
                    .draw();
                }
                else {
                    // 删除失败，暂时没有删除失败的处理
                    console.log(data)
                }
            })
        }

        // 删除提示框
        layer.msg('确定删除？', {
            time: 0,
            btn: ['确定', '取消'],
            yes: function(index) {
                layer.close(index);
                // 删除数据
                delData();
            }
        });
    })
}

$(function () {
    var tipListObj = new tipList()
    tipListObj.init()
});


