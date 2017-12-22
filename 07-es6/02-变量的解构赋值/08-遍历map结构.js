/**
 * Created by Mtime on 2017/12/22.
 */

// 任何部署了 Iterator 接口的对象，都可以用 for...of 循环遍历。Map 结构原生支持 Iterator 接口，配合变量的解构赋值，获取键名和键值就非常方便。

const map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for(let [key, value] of map) {
    console.log(key + " is " + value);
}

// first is hello
// second is world

// 如果只想获取键名，或者只想获取键值，可以写成下面这样。

// 获取键名
for(let [key] of map) {
    // ...
}
// 获取键值
for(let [,value] of map) {
    // ...
}