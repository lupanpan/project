/**
 * Created by Mtime on 2017/12/21.
 */

// 函数只能返回一个值，如果要返回多个值，只能将它们放在数组或对象里返回。有了解构赋值，取出这些值就非常方便。

// 返回一个数组
function example() {
    return [1, 2, 3];
}
let[a, b, c] = example();



// 返回一个对象
function example() {
    return {
        foo: 1,
        bar: 2
    }
}
let {foo, bar} = example();