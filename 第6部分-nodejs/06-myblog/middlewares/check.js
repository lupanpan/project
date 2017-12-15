/**
 * Created by Mtime on 2017/10/16.
 */

// 定义中间件，判断用户是否登录
module.exports = {
  checkLogin: function checkLogin (req, res, next) {
    // 判断req.session.user，则跳转到登录页
    if (!req.session.user) {
      req.flash('error', '未登录')
      return res.redirect('/signin')
    }
    next()
  },

  checkNotLogin: function checkNotLogin (req, res, next) {
    if (req.session.user) {
      req.flash('error', '已登录')
      // 返回之前的页面
      return res.redirect('back')
    }
    next()
  }
}
