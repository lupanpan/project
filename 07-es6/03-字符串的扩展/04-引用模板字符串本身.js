/**
 * Created by Mtime on 2017/12/27.
 */

// 如果需要引用模板字符串本身，在需要时执行，可以像下面这样写。

// 写法1
let str = 'return ' + '`Hello ${name}!`';
let func = new Function('name', str);
func('Jack'); // "Hello Jack!"

// 写法2
let str = '(name) => `Hello ${name}!`';
let func = eval.call(null, str);
func('Jack'); // "Hello Jack!"