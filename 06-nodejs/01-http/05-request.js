/**
 * Created by Mtime on 2017/8/15.
 */

var querystring = require('querystring');
var postData = '';

request.addListener('data', function(postDataChunk) {
    postData += postDataChunk;
})

request.addListener('end', function() {
    response.writeHead(200, {'Content-type': 'text/plain'});
    response.write("You've sent the text: " + querystring.parse(postData).text);
    response.end();
})