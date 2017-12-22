/**
 * Created by Mtime on 2017/12/21.
 */
let [foo = true] = []; // foo = true

let[x, y = 'b'] = ['a']; // x='a', y='b'
let[x, y = 'b'] = ['a', undefined]; // x='a', y='b'

let[x = 1] = [undefined]; // x = 1
let[x = 1] = [null]; // x = null


// 默认值为表达式，如果为表达式则为惰性求值，即如果能从解构中取到值，则不执行f
function f() {
    console.log('aaa');
}
let[x = f()] = [1];

// 相当于如下代码
let x;
if([1][0] === 'undefined') {
    x = f1();
} else {
    x = [1][0];
}

// 默认值可以引用解构赋值的其他变量，但该变量必须已经声明
let [x = 1, y = x] = []; // x=1; y=1
let [x = 1, y = x] = [2]; // x=2; y=2
let [x = 1, y = x] = [1, 2]; // x=1; y=2
let [x = y, y = 1] = []; // ReferenceError，因为y还没有声明



let [x = 1, y = x] = [];     // x=1; y=1
let [x = 1, y = x] = [2];    // x=2; y=2
let [x = 1, y = x] = [1, 2]; // x=1; y=2
let [x = y, y = 1] = [];     // ReferenceError