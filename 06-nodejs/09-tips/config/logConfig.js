const path = require('path')
const config = require('./config')

// 拼接日志目录路径
const logPath = path.resolve(__dirname, '../' + config.logPath)
// 错误日志输出完整路径
const errorLogPath = logPath + config.errorLogPath + "/" + config.errorLogFileName
// 错误日志输出完整路径
const responseLogPath = logPath + config.responseLogPath + "/" + config.responseLogFileName

module.exports = {
    "appenders": {
        error: {
            "category": "errorLogger", // logger名称
            "type": "dateFile", // 日志类型
            "filename": errorLogPath, // 日志输出位置
            "alwaysIncludePattern": true, // 是否总是有后缀名
            "pattern": "-yyyy-MM-dd-hh.log", // 后缀，每小时创建一个新的日志文件
            "path": config.errorLogPath
        },
        response: {
            "category": "resLogger",
            "type": "dateFile",
            "filename": responseLogPath,
            "alwaysIncludePattern": true,
            "pattern": "-yyyy-MM-dd-hh.log",
            "path": config.responseLogPath
        }
    },
    "categories": {
        error: { appenders: ['error'], level: 'error' },
        response: { appenders: ['response'], level: 'info' },
        default: { appenders: ['response'], level: 'info' }
    }
}

