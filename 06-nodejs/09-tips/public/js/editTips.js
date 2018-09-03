var editTip = function () {
    return this;
}

// 初始化
editTip.prototype.init = function () {
    // 初始化事件
    this.initEvent();
    // 设置表单数据
    this.initForm();
}

// 设置表单数据
editTip.prototype.initForm = function () {
    console.log("tipsList: ", tipsList)

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
editTip.prototype.initEvent = function () {
    var that = this;
}

$(function () {
    var editTipObj = new editTip()
    editTipObj.init()
});


