const _ = require('lodash')
const logUtil = require('../utils/logUtil')

export default () => {
    return async (ctx, next) => {
        // 响应开始时间
        const start = new Date()
        // 响应间隔时间
        let ms

        try {
            // 存储返回数据格式
            ctx._pipeDoneData = {}
            ctx._pipeFailData = {}

            // 返回完成数据
            ctx.pipeDone = result => {
                ctx._pipeDoneData = { code: '0000', result }
            }
            ctx.pipeFail = (code, msg) => {
                // 获取error中的message中的数据
                const errorMsg = _.get(msg, 'message') || msg
                ctx._pipeFailData = { code, msg: errorMsg }
            }

            // 执行下一个中间件
            await next()

            // 拦截返回, 判断数据为空
            if (!_.isEmpty(ctx._pipeFailData)) {
                return ctx.body = ctx._pipeFailData;
            }
            if (!_.isEmpty(ctx._pipeDoneData)) {
                return ctx.body = ctx._pipeDoneData
            }
        }
        catch (error) {
            console.log('error')
            console.log(error)

            // 计算处理时间
            ms = new Date() - start

            // 记录异常日志
            logUtil.logError(ctx, error, ms)
        }
    }
}