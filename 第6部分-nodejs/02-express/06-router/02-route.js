/**
 * Created by Mtime on 2017/9/25.
 */

/*router实例对象的route方法，可以接受访问路径作为参数。*/

var router = express.Router();

router.route('/api')
    .post(function (req, res) {
        // ...
    })
    .get(function (req, res) {
        Bear.find(function (err, bears) {
            if(err) res.send(err);
            res.json(bears);
        })
    });

app.use('/', router);