/**
 * Created by Mtime on 2017/8/15.
 */
// 当客户端采用POST方法发送数据时，服务器端可以对data和end两个事件，设立监听函数。
// data事件会在数据接收过程中，每收到一段数据就触发一次，接收到的数据被传入回调函数。end事件则是在所有数据接收完成后触发。
var http = require('http');
http.createServer(function (req, res) {
    var content = "";

    req.on('data', function(chunk) {
        content += chunk;
    });

    req.on('end', function() {
        res.writeHead(200, {"Content-Type": "text/plain"});
        res.write("You've sent: " + content);
        res.end();
    });
}).listen(8080);