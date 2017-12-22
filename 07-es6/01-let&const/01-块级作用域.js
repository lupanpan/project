/**
 * Created by Mtime on 2017/12/19.
 */
// 块级作用域的出现，实际上使得活的广泛应用的立即执行函数表达式(IIFE)不再必要了。

// IIFE 的写法
(function () {
    var temp = '...'
}())

// 块级作用域的写法
{
    let tmp = "..."
}

/*
es6语法报错了
学到的位置：块级作用域与函数声明
*/
