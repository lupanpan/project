var utils = require('../../utils/util.js');
var requests = require('../../requests/request.js');

Page({
  data: {
    weekdayStr: ['日', ' 一', '二', '三', '四', '五', '六'],

    pageData: {}, // 列表数据
    sliderData: {}, // 轮播图数据
    themeData: {}, // 左侧主题菜单数据
    currentDateStr: '',// 当前时间字符串显示
    currentDate: new Date(), // 标记下拉数据获取到的时间，默认当前时间
    refreshAnimation: {}, // 加载更多旋转动画数据
    loadingMore: false, // 是否正在加载

    avatarUrl: '', // 当前用户头像
    nickName: '', // 当前用户名字

    screenHeight: 0, // 屏幕高度

    loading: false,
    loadingMsg: '加载中...',
    pageShow: 'none', // scroll-view的display属性值


    themeId: 0 // 当前选择主题的id
  },

  onLoad: function (options) {
    var _this = this;

    // 获取屏幕宽高信息
    wx.getSystemInfo({
      success: function(res) {
        _this.setData({
          screenHeight: res.windowHeight
        })
      },
    })

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
    this.setData({ currentDateStr: utils.formatNumber(date.month) + '月' + utils.formatNumber(date.day) + '日  ' + '星期' + this.data.weekdayStr[date.weekday]});

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
    null,
    () => {
      // 设置取消等待状态
      this.setData({ loading: false });
    });

    // 获取左侧主题菜单列表
    requests.getTheme((data) => {
      _this.setData({ themeData: data.others });
    });
  },

  /**
   * 列表加载更多数据
   */
  loadingMoreEvent: function (e) {
    var _this = this;

    // 判断如果正在记载则不再执行该事件
    if (this.data.loadingMore) return;

    console.log(this.data.currentDate);

    // 获取前一天的时间
    var date = new Date(Date.parse(this.data.currentDate) - 24*60*60*1000);

    // 设置加载更多状态为true
    this.setData({ loadingMore: true });
    // 旋转上拉加载图标
    this.updateRefreshIcon();

    // 设置要获取日期的参数格式
    var dateStr = date.getFullYear() + utils.formatNumber(date.getMonth() + 1) + utils.formatNumber(date.getDate());
    console.log(dateStr);

    // 获取以往日报
    requests.getBeforeNews(dateStr, 
      (data) => {
        console.log(data);

        // 获取已经存在的pageData
        let pageData = this.data.pageData;
        // 追加日期数据
        pageData.push({ type: '3', title: (utils.formatNumber(date.getMonth() + 1) + '月' + utils.formatNumber(date.getDate()) + '日  ' + '星期' + this.data.weekdayStr[date.getDay()])});
        // 合并获取的前一天日期数据
        pageData = pageData.concat(data.stories);
        // 设置回pageData数据中
        _this.setData({ currentDate: date, pageData: pageData });
      },
      null,
      () => {
        // 设置加载更多状态为false
        _this.setData({ loadingMore: false });
      })



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
  },

  /**
   * 跳转到详情页
   */
  toDetailPage: function (e) {
    // 获取data-id
    var id = e.currentTarget.dataset.id;
    // 跳转到详情页
    wx.navigateTo({
      url: '../detail/detail?id=' + id,
    })
  }
})