const fs = require('fs')
const path = require('path')

// 递归创建目录, 异步方法
function mkdirs (dirname, callback) {
    fs.exists(dirname, function (exists) {
        if (exists) {
            callback()
        }
        else {
            // 如果不存在该目录，则获取上层目录，再调用该函数进行递归
            mkdirs(path.dirname(dirname), function () {
                // 创建该目录，然后递归结束时，一层一层结束时再调用回调函数，创建目录
                fs.mkdir(dirname, callback);
            })
        }
    })
}

// 递归创建目录, 同步方法
function mkdirsSync (dirname) {
    if (fs.existsSync(dirname)) {
        return true
    }
    else {
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname)
            return true
        }
    }
}

module.exports.mkdirs = mkdirs
module.exports.mkdirsSync = mkdirsSync