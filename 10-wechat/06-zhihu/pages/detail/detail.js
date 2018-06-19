const requests = require('../../requests/request.js');
const utils = require('../../utils/util.js');

Page({
  data: {
    id: "", // 当前日报id
    isTheme: false, // 是否是主题日报
    loading: false, // 是否加载中
    news: [], // 日报详情
    extraInfo: {}, // 日报扩展信息
    pageShow: 'none', // 模块是否显示
    isCollect: false // 是否被收藏
  },

  /**
   * 获取列表传递过来的参数id：日报id，theme： 是否是主题日报内容（因为主题日报的内容有些需要单独解析）
   */
  onLoad: function (options) {
    var id = options.id || "9686971";
    var isTheme = options['theme'] || false;
    var pageData = wx.getStorageSync('pageData') || [];

    // 遍历从本地缓存中获取的pageData数据
    for (let i = 0; i < pageData.length; i++) {
      // 判断本地缓存中的id是否存在当前文章id
      if (pageData[i].id == id) {
        // 设置收藏为true
        this.setData({ isCollect: true });
        break;
      }
    }

    // 设置属性
    this.setData({ id: id, isTheme: isTheme });
  },

  /**
   * 加载日报数据
   */
  onReady: function () {
    this.loadData();
  },

  /**
   * 加载页面相关数据
   */
  loadData: function () {
    const _this = this;

    // 获取日报详情内容
    // 设置等待状态
    this.setData({ loading: true });

    // 获取日报详情
    requests.getNewsDetail(this.data.id,
      (data) => {
        // 解析story对象的body部分
        data.body = utils.parseStory(data.body, this.data.isTheme);
        console.log(data);
        // 设置标题
        wx.setNavigationBarTitle({ title: data.title });
        // 设置数据
        _this.setData({ news: data, pageShow: 'block' });
      },
      null,
      () => {
        // 设置等待状态
        this.setData({ loading: false });
      });

    requests.getStoryExtraInfo(this.data.id, (data) => {
      console.log('extra', data);
      _this.setData({ extraInfo: data });
    })
  }
})