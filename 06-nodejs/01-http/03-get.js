/**
 * Created by Mtime on 2017/8/15.
 */
var http = require('http');

http.createServer(function(req, res){
    // 主页
    if(req.url == "/") {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end("Welcome to the homepage!");
    }
    // about页面
    if(req.url == "/about") {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end("Welcome to the about page!");
    }
    // 404错误
    else {
        res.writeHead(404, {"Content-Type": "text/plain"});
        res.end("404 error! File not found.");
    }
}).listen(8080, "localhost");