// mongodb 2.x 的写法
/*var mongodb = require('mongodb');
mongodb.MongoClient.connect("mongodb://localhost/mongoTest", function (err, db) {
    if (!err) {
        db.collection("col").insert({"username": "jim"}, function (err, result) {
            if (!err) {
                console.log(result);
            }
        })
    }
})*/



// mongodb 3.x 的写法
var mongodb = require('mongodb');
mongodb.MongoClient.connect("mongodb://localhost/mongoTest", function (err, client) {
    // client 参数就是连接成功之后的 mongoclient（个人理解为数据库客户端）
    if (!err) {
        client.db("mongoTest").collection("user").insertOne({"username": "jim"}, function (err, result) {
            if (!err) {
                console.log(result);
                // db.close();
            }
        })
    }
})