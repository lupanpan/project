var async = require('async');

// 并发连接数的计数器
var concurrentcyCount = 0;

var fetchUrl = function (url, callback) {
    // delay 的值再 2000 以内，是个随机的整数
    var delay = parseInt((Math.random() * 10000000) % 2000, 10);

    // 连接数+1
    concurrentcyCount++;

    // 输出数据
    console.log('现在的并发数是:', concurrentcyCount, '正在抓取的url是:', url, '耗时', delay, '毫秒');

    // 设置计时函数
    setTimeout(function () {
        // 连接数-1
        concurrentcyCount--;
        callback(null, url + ' html content');
    }, delay);
};

// 伪造一组数据
var urls = [];
for(var i = 0; i < 30; i++) {
    urls.push('http://datasource_' + i);
}

// 并发抓取数据
async.mapLimit(urls, 5, function (url, callback) {
    fetchUrl(url, callback);
}, function (err, result) {
    console.log('final:');
    console.log(result);
})