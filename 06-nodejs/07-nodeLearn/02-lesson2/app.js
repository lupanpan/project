var express = require('express');
var utility = require('utility');

// 建立 express 实例
var app = express();

app.get('/', function (req, res) {
    // 从 req.query 中取出我们的 q 参数。
    // 如果 post 传来的 body 数据，则是在 req.body 里边，不过 express 默认不处理 body 中的信息，需要引入 https://github.com/expressjs/body-parser 这个中间件才会处理，后边有讲到。
    // 分不清 query 与 body 的话，需要补一下 http 知识。
    var q = req.query.q;

    // 调用 utility.md5 方法，得到 md5 之后的值
    var md5Value = utility.md5(q);

    res.send(md5Value);
});

app.listen(3000, function () {
    console.log('app is running at port 3000');
});