const koa = require('koa');
const bodyParser = require('koa-bodyparser');

const app = new koa();

// 设置中间件
app.use(bodyParser());

// 

app.listen(3000);