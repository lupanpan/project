/**
 * Created by Mtime on 2017/12/25.
 */

// 如果省略第二个参数，则使用空格补全
'x'.padStart(3) // "  x"
'x'.padEnd(3) // "x  "

// 常见用途是为数值补全指定位数
'3'.padStart(10, '0') // 0000000003

// 另一个用途是提示字符串格式
'10'.padStart(10, 'YYYY-MM-DD') // "YYYY-MM-10"
'09-12'.padStart(10, 'YYYY-MM-DD') // YYYY-09-12