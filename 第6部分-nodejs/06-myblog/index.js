/**
 * Created by Mtime on 2017/10/9.
 */
var express = require('express');
var app = express();
var indexRouter = require('./routes/index');
var userRouter = require('./routes/users');

app.use('/', indexRouter);
app.use('/users', userRouter);

app.listen(3000);

/*
路由的代码注释：
将 / 和 /users/:name 的路由分别放到了 routes/index.js 和 routes/users.js 中，
每个路由文件通过生成一个 express.Router 实例 router 并导出，通过 app.use 挂载到不同的路径。
这两种代码实现了相同的功能，但在实际开发中推荐使用 express.Router 将不同的路由分离到不同的路由文件中。*/
