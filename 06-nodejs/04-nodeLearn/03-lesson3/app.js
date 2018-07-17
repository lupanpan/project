var express = require('express');
var superagent = require('superagent');
var cheerio = require('cheerio');

var app = express();

app.get('/', function (req, res, next) {
    superagent.get('https://cnodejs.org/')
        .end(function (err, sers) {
            // 常规的错误处理
            if (err) {
                return next(err);
            }

            // sres.text 里边存储网页的 html 内容，将它传给 cheerio.load 后，
            // 就可以得到一个实现了 jquery 接口的变量，习惯命名为 $
            // 剩下的就都是 jquery 的内容了
            var $ = cheerio.load(sers.text);
            var items = [];

            $("#topic_list .cell").each(function (index, element) {
                var $element = $(element);
                items.push({
                    title: $element.find(".topic_title").attr('title'),
                    href: $element.find(".topic_title").attr('href'),
                    author: $element.find(".user_avatar > img").attr("title")
                })
            });

            res.send(items);
        })
});

app.listen(3000, function (req, res) {
    console.log('app is running at port 3000');
});