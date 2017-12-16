/**
 * Created by Mtime on 2017/9/22.
 */

/*
渲染是指将数据代入模板的过程。
实际运用中，数据都是保存在数据库之中的，这里为了简化问题，假定数据保存在一个脚本文件中。

在项目目录中，新建一个文件blog.js，用于存放数据。
blog.js的写法符合CommonJS规范，使得它可以被require语句加载。*/

var entries = [
    {"id":1, "title":"第一篇", "body":"正文", "published":"6/2/2013"},
    {"id":2, "title":"第二篇", "body":"正文", "published":"6/3/2013"},
    {"id":3, "title":"第三篇", "body":"正文", "published":"6/4/2013"},
    {"id":4, "title":"第四篇", "body":"正文", "published":"6/5/2013"},
    {"id":5, "title":"第五篇", "body":"正文", "published":"6/6/2013"},
    {"id":6, "title":"第六篇", "body":"正文", "published":"6/7/2013"}
];

exports.getBlogEntries = function () {
    return entries;
}

exports.getBlogEntry = function (id) {
    for(var i = 0; i < entries.length; i++){
        if(entries[i].id == id) return entries[i];
    }
}