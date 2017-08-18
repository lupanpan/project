/**
 * Created by Mtime on 2017/8/15.
 */

// 一个不进行任何操作、只传递request对象的中间件
function uselessMiddleware(req, res, next) {
    next();
}

// 上面代码的next就是下一个中间件。如果它带有参数，则代表抛出一个错误，参数为错误文本。
function uselessMiddleware(req, res ,next) {
    next('出错了！');
}

// 抛出错误以后，后面的中间件将不再执行，直到发现一个错误处理函数为止。