var utils = require('../../utils/util.js');
var requests = require('../../requests/request.js');

Page({
  data: {
    weekdayStr: ['日', ' 一', '二', '三', '四', '五', '六'],

    pageData: {}, // 列表数据
    themePageData: {}, // 其他导航栏目列表数据
    sliderData: {}, // 轮播图数据
    themeId: 0, // 当前选择主题的id
    themeData: {}, // 左侧主题菜单数据
    currentDateStr: '',// 当前时间字符串显示
    currentDate: new Date(), // 标记下拉数据获取到的时间，默认当前时间
    refreshAnimation: {}, // 加载更多旋转动画数据
    loadingMore: false, // 是否正在加载

    screenWidth: 0, // 屏幕宽度
    screenHeight: 0, // 屏幕高度
    ballBottom: 30, // 小球的位置
    ballRight: 30, // 小球的位置

    loading: false,
    loadingMsg: '加载中...',
    pageShow: 'none', // scroll-view的display属性值

    maskDisplay: 'none', // 遮罩层的显示
    slideAnimation: {} // 侧边栏滑动动画
  },

  onLoad: function (options) {
    var _this = this;

    // 获取屏幕宽高信息
    wx.getSystemInfo({
      success: function(res) {
        _this.setData({
          screenWidth: res.windowWidth,
          screenHeight: res.windowHeight
        })
      },
    })
  },

  onShow: function () {
    // 从详细页面返回时会刷新收藏列表
    if (this.data.themeId == -1) {
      // 获取本地缓存数据
      var pageData = wx.getStorageSync("pageData") || [];
      this.setData({
        pageData: pageData
      })
    }
  },

  onReady: function () {
    var _this = this;

    // 获取当前日期
    const date = utils.getCurrentData();
    this.setData({ currentDateStr: utils.formatNumber(date.month) + '月' + utils.formatNumber(date.day) + '日  ' + '星期' + this.data.weekdayStr[date.weekday]});

    // 获取最新日报
    this.getNewsLatest();

    // 获取左侧主题菜单列表
    requests.getTheme((data) => {
      _this.setData({ themeData: data.others });
    });
  },

  /**
   * 获取最新日报
   */
  getNewsLatest: function () {
    var _this = this;

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
  },

  /**
   * 列表加载更多数据
   */
  loadingMoreEvent: function (e) {
    var _this = this;

    // 判断如果正在加载则不再执行该事件
    if (this.data.loadingMore) return;

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
      url: '../detail/detail?id=' + id
    })
  },

  /**
   * 跳转到收藏页
   */
  toCollectPage: function () {
    var _this = this;
    // 设置导航主题id
    this.setData({ themeId: -1 });
    // 关闭左侧边栏
    this.slideUpDown("down");
    // 获取本地缓存数据
    this.setData({ pageData: wx.getStorageSync("pageData") });
  },
  
  /**
   * 跳转到设置页
   */
  toSettingPage: function () {
    wx.navigateTo({
      url: '../setting/setting'
    })
  },

  /**
   * 首页导航点击事件
   */
  toHomePage: function (e) {
    var _this = this;
    // 设置等待层显示与设置themeId
    this.setData({ themeId: 0 });
    // 关闭左侧边栏
    this.slideUpDown("down");
    // 获取最新日报
    this.getNewsLatest();
  },

  /**
   * 其他导航点击事件
   */
  toThemePage: function (e) {
    var _this = this;

    // 关闭左侧边栏
    this.slideUpDown("down");

    // 设置当前的themeId
    this.setData({ themeId: e.currentTarget.dataset.id });
    // 设置等待状态
    this.setData({ loading: true });

    // 获取对应栏目的数据
    requests.getThemeStories(_this.data.themeId,
      (data) => {
        console.log(data);
        data = utils.correctData(data);
        // 设置数据
        _this.setData({
          themePageData: data
        })
      },
      null,
      () => {
        // 设置等待状态
        this.setData({ loading: false });
      })

  },

  /**
   * 浮动球移动事件
   */
  ballMoveEvent: function (e) {
    // 获取浮动球的位置
    var touchs = e.touches[0];
    var pageX = touchs.pageX;
    var pageY = touchs.pageY;

    // 定义小球的半径
    var floatRadius = 25;

    // 判断移动范围不让小球超出屏幕外部
    if (pageX <= floatRadius || pageY <= floatRadius || (this.data.screenWidth - pageX)  <=25 || (this.data.screenHeight - pageY) <= 25) {
      return;
    }
    
    // 设置小球的位置
    this.setData({
      ballRight: this.data.screenWidth - pageX - floatRadius,
      ballBottom: this.data.screenHeight - pageY - floatRadius
    })
  },

  /**
   * 侧栏展开
   */
  ballClickEvent: function (e) {
    this.slideUpDown("up");
  },

  /**
   * 侧栏关闭
   */
  slideCloseEvent: function (e) {
    this.slideUpDown("down");
  },

  /**
   * 侧边栏动画
   */
  slideUpDown: function (type) {
    // 创建动画
    var animation = wx.createAnimation({
      duration: 300
    });

    if (type == "up") {
      // 展开侧边栏
      // 显示遮罩层
      this.setData({ "maskDisplay": "block" });
      animation.translateX('100%').step();
      this.setData({
        slideAnimation: animation.export()
      })
    }
    else {
      // 关闭侧边栏
      animation.translateX('0').step();
      this.setData({
        slideAnimation: animation.export()
      })
      // 隐藏遮罩层
      this.setData({ "maskDisplay": "none" });
    }
  }
})