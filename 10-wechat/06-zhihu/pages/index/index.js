var utils = require('../../utils/util.js');
var requests = require('../../requests/request.js');

Page({
  data: {
    weekdayStr: ['日', ' 一', '二', '三', '四', '五', '六'],

    pageData: {}, // 列表数据
    sliderData: {}, // 轮播图数据
    themeData: {}, // 左侧主题菜单数据
    currentDataStr: '',// 当前时间字符串显示
    currentData: new Date(),
    refreshAnimation: {}, // 加载更多旋转动画数据
    loadingMore: true, // 是否正在加载

    avatarUrl: '', // 当前用户头像
    nickName: '', // 当前用户名字


    loading: false,
    loadingMsg: '加载中...',
    pageShow: 'none',


    themeId: 0 // 当前选择主题的id
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
    this.setData({ currentDataStr: utils.formatNumber(date.month) + '月' + utils.formatNumber(date.day) + '日  ' + '星期' + this.data.weekdayStr[date.weekday]});

    // 设置为等待状态
    this.setData({ loading: true });
    
    // 获取最新日报
    requests.getNewsLatest((data) => {
      // 设置返回数据
      _this.setData({
        sliderData: data.top_stories,
        pageData: data.stories
      });

      // 设置pageShow
      _this.setData({ pageShow: 'block' });
    },
    null
    ,() => {
      // 设置取消等待状态
      this.setData({ loading: false });
    });

    // 获取左侧主题菜单列表
    requests.getTheme((data) => {
      _this.setData({ themeData: data.others });
    })

    this.updateRefreshIcon();
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
  
  },

  /**
   * 旋转上拉加载图标
   */
  updateRefreshIcon: function () {
    var deg = 360;
    var _this = this;

    var animation = wx.createAnimation({
      duration: 1000
    });

    var timer = setInterval(function () {
      if (!_this.data.loadingMore) {
        clearInterval(timer);
      }

      animation.rotateZ(deg).step();
      deg += 360;

      _this.setData({
        refreshAnimation: animation.export()
      })

    }, 1000);
  }
})