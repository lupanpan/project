/**
 * Created by Mtime on 2017/9/20.
 */
// use是express注册中间件的方法，它返回一个函数。下面是一个连续调用两个中间件的例子。

var express = require("express");
var http = require("http");

var app = express();

app.use(function(request, response, next){
    console.log("In comes a " + request.method + " to " + request.url);
    next();
});

app.use(function (request, response) {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Hello world!\n");
});

http.createServer(app).listen(1337); 