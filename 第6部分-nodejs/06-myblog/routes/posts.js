/**
 * Created by Mtime on 2017/10/18.
 */
var express = require('express')
var router = express.Router()

var checkLogin = require('../middlewares/check').checkLogin

// GET /posts 所有用户或者特定用户的文章页
// eg: GET /posts?author=xxx
router.get('/', function (req, res, next) {
  res.send(req.flash())
})

// POST /posts 发表一篇文章
router.post('/', checkLogin, function (req, res, next) {
  res.send(req.flash())
})

// GET /posts/create 发表文章页
router.get('/create', checkLogin, function (req, res, next) {
  res.send(req.flash())
})

// GET /posts/:postId 单独一篇的文章页
router.get('')
