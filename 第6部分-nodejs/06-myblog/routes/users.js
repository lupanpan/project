/**
 * Created by Mtime on 2017/10/9.
 */
var express = require('express');
var router = express.Router();

router.get('/:name', function (req, res) {
    res.send('hello,' + req.params.name);
});

module.exports = router;