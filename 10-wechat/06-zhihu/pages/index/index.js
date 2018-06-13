var utils = require('../../utils/util.js');
var requests = require('../../requests/request.js');

Page({
  data: {
    weekdayStr: ['日', ' 一', '二', '三', '四', '五', '六'],

    pageData: {}, // 列表数据
    sliderData: {}, // 轮播图数据
    themeData: {}, // 主题菜单数据

    currentDataStr: '',// 当前时间字符串显示


    avatarUrl: '', // 当前用户头像
    nickName: '', // 当前用户名字


    loading: false,
    loadingMsg: '加载中...',
    pageShow: 'none'


  },

  onLoad: function (options) {
    var _this = this;

    var app = getApp();
    // 获取用户名与用户头像
    app.getUserInfo(function (data) {
      _this.setData({ avatarUrl: data.avatarUrl, nickName: data.nickName });
    })
  },

  onShow: function () {
    // 从详细页面返回时会刷新
  },

  onReady: function () {
    var _this = this;

    // 获取当前日期
    const date = utils.getCurrentData();
    this.setData({ currentDataStr: date.year + '.' + date.month + '.' + date.day + '  ' + '星期' + this.data.weekdayStr[date.weekday]});

    // 设置为等待状态
    this.setData({ loading: true });
    
    // 获取日报详情数据
    requests.getNewsLatest((data) => {
      _this.setData({
        sliderData: data.top_stories,
        pageData: data.stories
      })
    });
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