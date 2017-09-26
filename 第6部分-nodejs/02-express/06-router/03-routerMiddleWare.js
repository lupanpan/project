/**
 * Created by Mtime on 2017/9/25.
 */

/*use方法为router对象指定中间件，即在数据正式发给用户之前，对数据进行处理。
下面就是一个中间件的例子。*/

router.use(function (req, res, next) {
    console.log(req.method, req.url);
    next();
});
