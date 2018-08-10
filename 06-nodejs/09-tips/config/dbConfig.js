const config = require('./config')
const mongoose = require('mongoose')

exports.connect = function(request, response) {
    // 链接数据库, useMongoClient防止报错
    mongoose.connect(config.mongoHost + config.mongoDatabase, { useMongoClient: true })

    // 获取数据库链接
    let db = mongoose.connection
    // 错误提示
    db.on('error', console.error.bind(console, 'connection error:'))
    // 成功提示
    db.once('open', function (callback) {
        console.log('mongodb connet success!')
    })
}