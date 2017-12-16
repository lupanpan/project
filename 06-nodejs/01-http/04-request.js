/**
 * Created by Mtime on 2017/8/15.
 */

/*获取请求的路径名*/
var url = require('url');
var pathname = url.parse(request.url).pathnames;

// 设置请求的编码
request.setEncoding("utf8");