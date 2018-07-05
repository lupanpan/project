const request = require('../../requests/request.js');
const utils = require('../../utils/util.js');

Page({
  data: {
    storyId: null,
  },

  /**
   * 获取传递过来的日报 id 和 评论数目
   */
  onLoad: function (options) {
    var storyId = options['id'];
    var longCommentCount = parseInt(options['lcount']);
    var shortCommentCount = parseInt(options['scount']);


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})