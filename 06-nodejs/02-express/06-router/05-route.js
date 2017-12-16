/**
 * Created by Mtime on 2017/9/25.
 */

/*假定app是express的实例对象，Express4.0为该对象提供了一个route属性。
app.route实际上是express.Router()的缩写形式，除了直接挂载到根路径。
因此，对同一个路径指定get和post方法的回调函数，可以写成链式形式。*/

app.route('/login')
.get(function(req, res) {
    res.send('this is the login form');
})
.post(function (req, res) {
    console.log('processing');
    res.send('processing the login form!');
});