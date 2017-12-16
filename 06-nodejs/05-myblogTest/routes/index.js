/**
 * Created by Mtime on 2017/10/9.
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.send('hello, express');
});

module.exports = router;