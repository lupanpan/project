/**
 * Created by Mtime on 2017/8/15.
 */

var http = require('http');
http.createServer(function(request, response){
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write("Hello World");
    response.end();
}).listen(8080, '127.0.0.1');
console.log('Server running on port 8080.');