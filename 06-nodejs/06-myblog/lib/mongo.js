const config = require('config-lite')(__dirname)
const Mongolass = require('mongolass')
const moment = require('moment')
const objectIdToTimestamp = require('objectid-to-timestamp')
const mongolass = new Mongolass()

mongolass.connect(config.mongodb)

// 只存储用户的名称、密码（加密后的）、头像、性别和个人简介这几个字段
exports.User = mongolass.model('User', {
  name: { type: 'string', required: true },
  password: { type: 'string', required: true },
  avatar: { type: 'string', required: true },
  gender: { type: 'string', enum: ['m', 'f', 'x'], default: 'x' },
  bio: { type: 'string', required: true }
})
// 根据用户名找到用户，用户名全局唯一
exports.User.index({ name: 1 }, { unique: true }).exec()

exports.Post = mongolass.model('Post', {
  author: { type: Mongolass.Types.ObjectId, reqiured: true },
  title: { type: 'string', required: true },
  content: { type: 'string', required: true },
  pv: { type: 'number', default: 0 }
})
// 按创建时间降序查看用户的文章列表
exports.Post.index({ author: 1, _id: -1 }).exec()

// 因为使用了 addCreatedAt 自定义插件（通过 _id 生成时间戳），所以修改 lib/mongod.js，添加如下代码：
// 根据 id 生成创建时间 create_at
mongolass.plugin('addCreatedAt', {
  afterFind: function (results) {
    results.forEach(function (item) {
      item.created_at = moment(objectIdToTimestamp(item._id).format('YYYY-MM-DD HH:mm'))
    })
    return results
  },
  afterFindOne: function (result) {
    if (result) {
      result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm')
    }
    return result
  }
})

// 小提示：24 位长的 ObjectId 前 4 个字节是精确到秒的时间戳，所以我们没有额外的存创建时间（如：createAt）的字段。
