/**
 * Created by Mtime on 2017/8/15.
 */
// Express框架建立在node.js内置的http模块上；http模块生成服务器的原始代码如下。

var http = require("http");
var app = http.createServer(function (request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("Hello world!");
});

// 上面代码的关键是http模块的createServer方法，表示生成一个HTTP服务器实例。该方法接受一个回调函数，该回调函数的参数，分别为代表HTTP请求和HTTP回应的request对象和response对象。
// Express框架的核心是对http模块的再包装。上面的代码用Express改写如下。

var express = require('express');
var app = express();
app.get('/', function (req, res) {
    res.send('Hello world!');
});
app.listen(3000);

// 比较两段代码，可以看到它们非常接近。原来是用http.createServer方法新建一个app实例，现在则是用Express的构造方法，生成一个Epress实例。
// 两者的回调函数都是相同的。Express框架等于在http模块之上，加了一个中间层。