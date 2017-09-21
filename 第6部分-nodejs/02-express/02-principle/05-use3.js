/**
 * Created by Mtime on 2017/9/21.
 */

/*例子2中的代码，也可以路径写到第一个参数中*/
/*除了在回调函数内部判断请求的网址，use方法也允许将请求网址写在第一个参数。这代表，只有请求路径匹配这个参数，后面的中间件才会生效。无疑，这样写更加清晰和方便。*/
var express = require("express");
var http = require("http");

var app = express();

app.use("/home", function(request, response, next) {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Welcome to the homepage!\n");
});

app.use("/about", function(request, response, next) {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Welcome to the about page!\n");
});

app.use(function(request, response) {
    response.writeHead(404, { "Content-Type": "text/plain" });
    response.end("404 error!\n");
});

http.createServer(app).listen(1337);