const path = require('path')
const config = require('config')

module.exports = {
    env: config.env, // 环境名称
    port: config.port, // 服务端口号
    root: path.resolve(__dirname, '..')
}