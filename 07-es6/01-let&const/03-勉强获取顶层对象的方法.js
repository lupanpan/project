/**
 * Created by Mtime on 2017/12/20.
 */
// 方法一
(typeof window !== 'undefined'
    ? window
    : (typeof process === 'object' &&
       typeof require === 'function' &&
       typeof global === 'object')
    ? global
    : this);


// 方法二
var getGlobal = function () {
    if (typeof self !== 'undefined') { return self; }
    if (typeof window !== 'undefined') { return window; }
    if(typeof global !== 'undefined') { return global; }
    throw new Error('unable to locate global object');
}