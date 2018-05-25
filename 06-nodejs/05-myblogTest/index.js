/**
 * Created by Mtime on 2017/10/9.
 */
var path = require('path');
var express = require('express');
var app = express();
var indexRouter = require('./routes/index');
var userRouter = require('./routes/users');

app.set('views', path.join(__dirname, 'views')); // 设置存放模板文件的目录
app.set('view engine', 'ejs'); // 设置模板引擎为 ejs

app.use('/', indexRouter);
app.use('/users', userRouter);

app.listen(3000);

/*
路由的代码注释：
将 / 和 /users/:name 的路由分别放到了 routes/tableSlider.js 和 routes/users.js 中，
每个路由文件通过生成一个 express.Router 实例 router 并导出，通过 app.use 挂载到不同的路径。
这两种代码实现了相同的功能，但在实际开发中推荐使用 express.Router 将不同的路由分离到不同的路由文件中。*/
