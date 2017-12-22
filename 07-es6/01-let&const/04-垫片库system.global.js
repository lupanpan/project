/**
 * Created by Mtime on 2017/12/20.
 */

// 下面代码可以保证各种环境里边，global对象都是存在的
// CommonJS 的写法
require('system.global/shim')();
// ES6 模块的写法
import shim from 'system.global/shim'; shim();




// 下面代码将顶层对象放入变量global
// CommonJS 的写法
var global = require('system.global')();
// ES6 模块的写法
import getGlobal from 'system.global';
const global = getGlobal();