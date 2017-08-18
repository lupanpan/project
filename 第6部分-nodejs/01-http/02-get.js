/**
 * Created by Mtime on 2017/8/15.
 */
/*也可以事前写好网页，存在文件中，然后利用fs模块读取网页文件，将其返回。*/

var http = require('http');
var fs = require('fs');

http.createServer(function(requese, response){
    // 读取数据，并且写出来
    /*fs.readFile('file/index.html', function readData(err, data) {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end(data);
    })*/

    // 或者
    fs.createReadStream(`${__dirname}/file/index.html`).pipe(response);
}).listen(8080, '127.0.0.1');

console.log('Server running on port 8080.');