var postsData = require('../../../data/posts-data.js')
Page({
  data: {
    isPlayingMusic: false
  },
  onLoad: function (option) {
    var postId = option.id;
    var postData = postsData.postList[postId];
    this.setData({
      currentPostId: postId,
      postData: postData
    })
  }
})