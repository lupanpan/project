/**
 * Created by Mtime on 2017/12/25.
 */

// repeat 将原来的字符串循环n次，返回一个新的字符串
'x'.repeat(3) // "xxx"
'hello'.repeat(2) // "hellohello"
'na'.repeat(0) // ""

// 如果是小数则被取整
'na'.repeat(2.9) // "nana"

// 如果是负数，或者 Infinity，会报错
'na'.repeat(Infinity) // RangeError
'na'.repeat(-1) // RangeError

// 如果为 0 到 -1 之间的小数，会转换为0，因为会先进行取整运算，取整后为 -0，repeat 视为 0
'na'.repeat(-0.1) // ""

// 如果为 NaN 则视为 0
'na'.repeat(NaN) // ""

// 如果为字符串，则转换为数字
'na'.repeat('na') // ""
'na'.repeat('3') // "nanana"