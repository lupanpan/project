/**
 * Created by Mtime on 2017/8/15.
 */

// 对上面代码稍加修改，就可以做出文件上传的功能。

"use strict";

var http = require('http');
var fs = require('fs');
var destinationFile, fileSize, uploadedBytes;

http.createServer(function (request, response) {
    response.writeHead(200);
    destinationFile = fs.createWriteStream("file/destination.md");
    request.pipe(destinationFile);
    fileSize = request.headers['content-length'];
    uploadedBytes = 0;

    request.on('data', function(d) {
        uploadedBytes += d.length;
        var p = (uploadedBytes / fileSize) * 100;
        response.write("Uploading " + parseInt(p, 0) + " %\n");
    });

    request.on('end', function () {
        response.end("File Upload Complete");
    });
}).listen(3030, function () {
    console.log("server started");
})