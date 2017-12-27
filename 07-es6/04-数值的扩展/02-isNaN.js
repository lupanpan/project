/**
 * Created by Mtime on 2017/12/27.
 */
/*(function (global) {
    var global_isNaN = global.isNaN;

    Object.defineProperty(Number, 'isNaN', {
        value: function isNaN(value) {
            return typeof value === 'number' && global_isNaN(value);
        },
        configurable: true,
        enumerable: false,
        writable: true
    });
})(this);*/

// Number.isNaN 与 isNaN 的区别：
// 传统方法先调用 Number() 将非数值的值转为数值，再进行判断，新方法只对新数值有效，对于非 NaN 一律返回 false
isNaN("NaN"); // true
Number.isNaN("NaN"); // false