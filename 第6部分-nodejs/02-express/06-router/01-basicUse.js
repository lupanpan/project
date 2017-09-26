/**
 * Created by Mtime on 2017/9/25.
 */

/*从Express 4.0 开始，路由器功能成了一个单独的组件 Express.Router。
它好像小型的express应用程序一样，有自己的use、get、param和route方法。*/

/*首先，Express.Router 是一个构造函数，调用后返回一个路由器实例。
然后，使用该实例的HTTP动词方法，为不同的访问路径，指定回调函数；最后，挂载到某个路径。*/

var router = express.Router();

router.get('/', function(req, res) {
    res.send('首页');
});

router.get('/about', function (req, res) {
    res.send('关于');
});

app.use('/', router);

/*上面代码先定义了两个访问路径，然后将它们挂载到根目录。
如果最后一行改为app.use('/app', router),则相当于为/app和/app/about 这两个路径，指定了回调函数。*/

/*这种路由器可以自由挂载的做法，为程序带来了更大的灵活性，
既可以定义多个路由器实例，也可以为将同一个路由器实例挂载到多个路径。*/
