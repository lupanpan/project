/**
 * Created by Mtime on 2017/9/22.
 */

var express = require('express');
var app = express();

// 加载hbs模块
var hbs = require('hbs');
// 加载数据模块
var blogEngine = require('./blog');

// 指定模板文件的后缀名为html
app.set('view engine', 'html');

// 运行hbs模块
app.engine('html', hbs.__express);

app.use(express.bodyParser());

// 需要指定存放静态文件的目录
app.use(express.static('public'));

app.get('/', function(req, res){
    res.render('index',{title:"最新文章", entries:blogEngine.getBlogEntries()});
});

app.get('/about', function(req, res) {
    res.render('about', {title: "自我介绍"});
});

app.get('/article/:id', function (req, res) {
    var entry = blogEngine.getBlogEntry(req.params.id);
    res.render('article',{title:entry.title, blog:entry});
});

app.listen(3000);

/*
上面代码改用render方法，对网页模板进行渲染。render方法的参数就是模板的文件名，
默认放在子目录views之中，后缀名已经在前面指定html，这里可以省略。
所以，res.render('index')就是指，把子目录views下面的index.html文件，交给模板引擎hbs渲染。
*/
