/**
 * Created by Mtime on 2017/8/15.
 */

// 第一种方式：最简单的方式
/*var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));
app.listen(8080);*/


// 第二种方式：也可以在index.js之中，生成动态网页
// 启动脚本index.js的app.get方法，用于指定不同的访问路径所对应的回调函数，这叫做“路由”（routing）。上面代码只指定了根目录的回调函数，因此只有一个路由记录。
/*var express = require('express');
var app = express();
app.get('/', function (req, res) {
    res.send('Hello world!');
});
app.listen(3000);*/


// 第三种方式：多个路由记录
/*var express = require('express');
var app = express();
app.get('/', function (req, res) {
    res.send('Hello world!');
});
app.get('/customer', function (req, res) {
    res.send('customer page');
});
app.get('/admin', function (req, res) {
    res.send('admin page');
});
app.listen(3000);*/


// 第四种方式：这时，最好就把路由放到一个单独的文件中，比如新建一个routes子目录
var express = require('express');
var app = express();
var routes = require('./routes')(app);
app.listen(3000);