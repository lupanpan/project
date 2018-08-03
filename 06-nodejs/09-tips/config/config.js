module.exports = {
    // 环境配置
    env: 'test', // 环境名称
    port: 2018, // 服务端口号

    // 数据库配置
    mongoDatabase: 'tips',
    mongoHost: 'mongodb://localhost/',

    // 日志配置
    logPath: 'logs', // 日志根目录
    errorLogPath: '/error', // 错误日志目录
    errorLogFileName: 'error', // 错误日志文件名
    responseLogPath: '/response', // 响应日志目录
    responseLogFileName: 'response', // 响应日志文件名
}