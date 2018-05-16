
const marked = require('marked')
const Post = require('../lib/mongo').Post
const CommentModel = require('./comments')

// 将 post 的 content 从 markdown 转换为html
Post.plugin('contentToHtml', {
  afterFind: function (posts) {
    return posts.map(function (post) {
      post.content = marked(post.content)
      return post
    })
  },
  afterFindOne: function (post) {
    if (post) {
      post.content = marked(post.content)
    }
    return post
  }
})

// 给 post 添加留言数 commentsCount
Post.plugin('addCommentsCount', {
  afterFind: function (posts) {
    return Promise.all(posts.map(function (post) {
      return CommentModel.getCommentsCount(post._id).then(function (commentsCount) {
        post.commentsCount = commentsCount
        return post
      })
    }))
  },
  afterFindOne: function (post) {
    if (post) {
      return CommentModel.getCommentsCount(post._id).then(function (count) {
        post.commentsCount = count
        return post
      })
    }
    return post
  }
})

module.exports = {
  // 创建一篇文章
  create: function create (post) {
    return Post.create(post).exec()
  },

  // 通过文章 id 获取一篇文章
  getPostById: function getPostById (postId) {
    return Post
      .findOne({ _id: postId })
      .populate({ path: 'author', model: 'User' })
      .addCreatedAt()
      .addCommentsCount()
      .contentToHtml()
      .exec()
  },

  // 按创建时间降序获取所有用户文章或者某个特定用户的所有文章
  getPosts: function getPosts (author) {
    const query = {}
    if (author) {
      query.author = author
    }
    return Post
      .find(query)
      .populate({ path: 'author', model: 'User' })
      .sort({ _id: -1 })
      .addCreatedAt()
      .addCommentsCount()
      .contentToHtml()
      .exec()
  },

  // 通过文章 id 给 pv 加 1
  incPv: function incPv (postId) {
    return Post
      .update({ _id: postId }, { $inc: { pv: 1 } })
      .exec()
  },

  // 通过文章 id 获取一篇原生文章（编辑文章）
  getRawPostById: function getRawPostById (postId) {
    return Post
      .findOne({ _id: postId })
      .populate({ path: 'author', model: 'User' })
      .exec()
  },

  // 通过文章 id 更新一篇文章
  updatePostById: function updatePostById (postId, data) {
    return Post.update({ _id: postId }, { $set: data }).exec()
  },

  // 通过文章 id 删除一篇文章
  delPostById: function delPostById (postId, author) {
    return Post.remove({ author: author, _id: postId })
      .exec()
      .then(function (res) {
        // 文章删除后，再删除该文章下的所有留言
        if (res.result.ok && res.result.n > 0) {
          return CommentModel.delCommentById(postId)
        }
      })
  }
}

// 注意：
// 1. 我们使用了 markdown 解析文章的内容，所以在发表文章的时候可使用 markdown 语法（如插入链接、图片等等）
// 2. 我们在 PostModel 上注册了 contentToHtml，而 addCreatedAt 是在 lib/mongo.js 中 mongolass 上注册。也就是说 contentHtml 只针对 PostModel 有效，而 addCreatedAt 对所有 Model 都有效。

// 小提示：
// 虽然目前看起来使用 Mongolass 自定义插件并不能节省代码，反而使代码变多了。Mongolass 插件真正的优势在于：在项目非常庞大时，
// 可以通过自定义的插件随意组合（及顺序）实现不同的输出，如上面 getPostById 需要将取出的 markdown 转换成 html，则使用 .contentToHtml(),
// 否则像 getRawPostById 则不必使用。
