/**
 * Created by Mtime on 2017/9/25.
 */

/*对路径参数的处理*/
/*router对象的param方法用于路径参数的处理*/

router.param('name', function (req, res, next, name) {
    // 对name进行验证或其他处理
    console.log(name);
    req.name = name;
    next();
});

router.get('/hello/:name', function (req, res) {
    res.send('hello ' + req.name + '!');
});

/*上面代码中，get方法为访问路径指定了name参数，param方法则是对name参数进行处理。
注意，param方法必须放在HTTP动词方法之前。*/
