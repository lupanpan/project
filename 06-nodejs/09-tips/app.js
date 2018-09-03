const koa = require('koa')
const views = require('koa-views') // 模板引擎
const convert = require('koa-convert') // 兼容koa1的中间件
const json = require('koa-json') // 自动将返回的数据转换为json格式
const bodyParser = require('koa-bodyparser') // Http 请求解析中间件
const koaBody = require('koa-body') // 从 POST 请求的数据体里面提取键值对
const logger = require('koa-logger') // tj大神写的koa开发时替换console.log输出的一个插件
const cors = require('koa-cors') // 跨域请求模块
const koaStatic = require('koa-static') // 静态资源请求中间件, 静态资源例如html、js、css、jpg、png等等
const moment = require('moment')

const loggers = require('./middleware/loggers')
const router = require('./routes/allRoute')
const db = require('./config/dbConfig')

const app = new koa()

// 转换和组合多个中间件,并返回中间件。
app.use(convert.compose(
    koaBody({ multipart: true }),
    bodyParser(),
    json(),
    logger(),
    cors()
))

// 静态资源请求中间件
app.use(convert(koaStatic(__dirname + '/public')))
// 本地log
app.use(convert(loggers()))

// 这句话的意思，以及语法不明白，只知道这是设置模板中使用moment的
app.use(convert(function* (next){
    this.state = {
      moment: moment
    }
    yield *next
  }))

// 设置模板引擎
app.use(views(__dirname + '/views', {
    map: {
        html: 'ejs'
    }
    // extension: 'ejs'
}))

// use route
// router.routes() 添加路由中间件，router.allowedMethods() 对请求进行一些限制处理
app.use(router.routes(), router.allowedMethods())

// mongodb connect
db.connect()

// 监听error事件 (运行过程中一旦出错，Koa会触发一个error事件)
app.on('error', (err, ctx) => {
    log.error('server error', err, ctx)
})

console.log('this is emacs insert')

module.exports = app

