/**
 * Created by Mtime on 2017/12/22.
 */

// 指定参数的默认值，就避免了在函数体内部在写 var foo = config.foo || 'default foo'; 这样的语句
jQuery.ajax = function(url, {
    async = true,
    beforeSend = function () {},
    cache = true,
    complete = function() {},
    crossDomain = false,
    global = true,
    // ... more config
}) {
    // ... do stuff
}