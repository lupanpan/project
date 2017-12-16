/**
 * Created by Mtime on 2017/9/21.
 */

// 首先加载express模块，赋值给变量express
// 然后生成Express实例，赋值给变量app
var path = require('path');
var express = require('express');
var app = express();

/*以下代码中的set方法用于设定内部变量，use方法用于调用express的中间件*/
// 设定port变量，意为访问端口
app.set('port', process.env.PORT || 3000);

// 设定views变量，意为视图存放的目录
app.set('views', path.join(__dirname, 'views'));

// 设定view engine变量，意为网页模板引擎
app.set('view engine', 'jade');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

// 设定静态文件目录，比如本地文件
// 目录为demo/public/images，访问网址则显示为http://localhost:3000/images
app.use(express.static(path.join(__dirname, 'public')));

// 配置路由
// 所谓“路由”，就是指为不同的访问路径，指定不同的处理方法。
/*
app.get('/', function(req, res) {
    var body = 'Hello World';
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Type', body.length);
    res.end(body);
});
*/

// 指定特定路径
// 假定用户访问/api路径，希望返回一个JSON字符串
/*app.get('/api', function(req, res) {
    response.send({name: "张三", age: 40});
});*/

// 可以把app.get的回调函数，封装成模块。现在routes目录下面建立一个api.js文件。
/*
var api = require('./routes/api');
app.get('/api', api.index);
*/

// 静态网页模板
app.get('/', function (req, res) {
    res.sendfile('./views/index.html');
});

app.get('/about', function (req, res) {
    res.sendfile('./views/about.html');
});

app.get('/article', function (req, res) {
    res.sendfile('./views/article.html');
});

app.listen(3000);

// 调用实例方法listen，让其监听事先设定的端口(3000)
app.listen(app.get("port"));