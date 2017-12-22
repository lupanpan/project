/**
 * Created by Mtime on 2017/12/21.
 */

// 解构赋值对提取 JSON 对象中的数据，尤其有用。
let jsonData = {
    id: 42,
    status: "OK",
    data: [867, 5309]
};
let {id, status, data: number} = jsonData;
console.log(id, status, number);
// 42, "OK", [[867, 5309]