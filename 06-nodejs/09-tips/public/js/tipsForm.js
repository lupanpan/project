var tipsForm = function () {
    return this;
}

// 初始化
tipsForm.prototype.init = function () {
    // 初始化事件
    this.initEvent();
    // 设置表单数据
    this.initForm();
}

// 设置表单数据
tipsForm.prototype.initForm = function () {
    // 如果为添加类型则返回，不操作
    if (type === "add") {
        return false;
    }

    // 隐藏域id
    $("#tipId").val(tipsList._id)
    // 小窍门标题
    $("#tipTitle").val(tipsList.tiptitle)
    // 小窍门内容
    $("#tipCon").val(tipsList.tipcon)
    // 一级分类
    $("#tipClassone").val(tipsList.classone)
    // 二级分类
    $("#tipClasstwo").val(tipsList.classtwo)
    // 实用度
    $("#rate").val(tipsList.rate)
    // 关键字
    $("#keyword").val(tipsList.keyword)
    // 创建人昵称
    $("#author").val(tipsList.author)
    // 是否启用
    $("#isuse").val(tipsList.isuse.toString())
    // 是否发布
    $("#release").val(tipsList.release.toString())
}

// 初始化事件
tipsForm.prototype.initEvent = function () {
    var that = this;

    // 表单提交
    $("#formSave").on("click", function () {
        var options = {
            url: (type === "add" ? "/tips/create" : "/tips/edit"),
            type: 'post',
            dataType: 'json',
            clearForm: true,
            resetForm: true,
            success: function (data) {
                // 跳转到列表页
                window.location.href = window.location.origin + "/tips/";
            },
            error: function (data) {
                console.log("失败！", data)
            }
        }

        $("form").ajaxForm(options)
    })
}

$(function () {
    var tipsFormObj = new tipsForm()
    tipsFormObj.init()
});


