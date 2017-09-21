/**
 * Created by Mtime on 2017/9/20.
 */
var express = require("express");
var http =  require("http");

var app = express();

app.use(function (request, response, next) {
    if(request.url == "/"){
        response.writeHead(200, { "Content-Type": "text/plain" });
        response.end("Welcome to the homepage!\n");
    }else {
        next();
    }
});

app.use(function (request, response, next) {
    if(request.url == "/about"){
        response.writeHead(200, { "Content-Type": "text/plain" });
    }else {
        next();
    }
});

app.use(function (request, response) {
    response.writeHead(404, { "Content-Type": "text/plain" });
    response.end("404 error!\n");
});

http.createServer(app).listen(1337);