// 系统级别错误: token过期、无权限、业务级别错误、网络级别错误、数据库错误

exports.resData = function (data) {
    let respon = {
        'flag': true,
        'data': data
    }
    return respon
}

exports.errData = function (err) {
    let respon = {
        'flag': false,
        'data': err
    }
    return respon
}