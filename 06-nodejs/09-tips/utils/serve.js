// 系统级别错误: token过期、无权限、业务级别错误、网络级别错误、数据库错误

exports.resdata = function (data, code, msg) {
    let _code = code ? code : '0000'
    let _msg = msg ? msg : 'success'
    let respon = {
        'flag': true,
        'respHead': {
            'code': _code,
            'message': _msg
        },
        'data': data
    }
    return respon
}

exports.errData = function (err, code, msg) {
    let _code = code ? code : '9999'
    let _msg = msg ? msg : 'error'
    let respon = {
        'flag': false,
        'respHead': {
            'code': _code,
            'message': _msg
        },
        'data': {
            'err': err
        }
    }
    return respon
}