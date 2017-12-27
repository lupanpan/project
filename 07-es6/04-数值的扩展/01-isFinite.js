/**
 * Created by Mtime on 2017/12/27.
 */

// ES5 手动实现
(function (global) {
    var global_isFinite = global.isFinite;

    Object.defineProperty(Number, 'isFinite', {
        value: function isFinite(value) {
            return typeof value === 'number' && global_isFinite(value);
        },
        configurable: true,
        enumerable: false,
        writable: true
    })
})(this);


// Number.isFinite 与 isFinite 的区别：
// 传统方法先调用 Number() 将非数值的值转为数值，再进行判断，新方法只对新数值有效，对于非数值一律返回 false
isFinite("1"); // true
Number.isFinite("1"); // false