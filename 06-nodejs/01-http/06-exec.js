/**
 * Created by Mtime on 2017/8/15.
 */

var exec = require("child_process").exec;

exec('ls -lah', function(error, stdout, sterr) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write(stdout);
    response.end();
})