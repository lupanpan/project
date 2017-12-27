/**
 * Created by Mtime on 2017/12/27.
 */

// ES5 可以通过下面的代码，部署Number.isInteger()。
(function (global) {
    var floor = Math.floor,
        isFinite = global.isFinite;

    Object.defineProperty(Number, 'isInteger', {
        value: function isInteger(value) {
            return typeof value === 'number' &&
                    isFinite(value) &&
                    floor(value) === value;
        },
        configurable: true,
        enumerable: false,
        writable: true
    })
})(this);



// 判断一个值是否为整数。注意：在 JavaScript 内部，整数和浮点数是同样的存储方法，所以 3 和 3.0 被视为同一个值。
Number.isInteger(25) // true
Number.isInteger(25.0) // true
Number.isInteger(25.1) // false
Number.isInteger("15") // false
Number.isInteger(true) // false