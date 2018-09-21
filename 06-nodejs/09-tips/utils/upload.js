const multer = require('koa-multer')

// 配置上传文件的路径
var storage = multer.diskStorage({
    // 定义文件保存路径
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    // 修改文件名
    filename: function (req, file, cb) {
        var filenameArr = file.originalname.split('.')
        cb(null, Date.now() + '.' + filenameArr[filenameArr.length - 1])
    }
})

var upload = multer({ storage: storage })

module.exports = upload