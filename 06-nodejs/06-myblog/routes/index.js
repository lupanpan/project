/**
 * Created by Mtime on 2017/10/16.
 */
module.exports = function (app) {
  // 根目录，跳转查看文章
  app.get('/', function (req, res) {
    res.redirect('/posts')
  })
  // 注册
  app.use('/signup', require('./signup'))
  // 登录
  app.use('/signin', require('./signin'))
  // 登出
  app.use('/signout', require('./signout'))
  // 查看文章
  app.use('/posts', require('./posts'))
  // 留言
  app.use('/comments', require('./comments'))
}
