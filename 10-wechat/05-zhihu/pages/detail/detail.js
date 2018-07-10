const requests = require('../../requests/request.js');
const utils = require('../../utils/util.js');

Page({
  data: {
    id: "", // 当前日报id
    isTheme: false, // 是否是主题日报
    loading: false, // 是否加载中
    news: [], // 日报详情
    modalHidden: true, // 分享模态框是否显示
    extraInfo: {}, // 日报扩展信息
    modalMsgHidden: true,
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
   * 收藏与取消收藏
   */
  collectOrNot: function ()  {
    var pageData = wx.getStorageSync('pageData') || [];

    // 判断当前的收藏状态
    if (this.data.isCollect) {
      // 遍历本地存储缓存中收藏的文章
      for (let i = 0; i < pageData.length; i++) {
        // 根据id获取该文章
        if (pageData[i].id == this.data.id) {
          // 根据index从缓存中移除该文章
          pageData.splice(i, 1);
          // 设置收藏状态
          this.setData({ isCollect: false })
        }
      }
    }
    else {
      var images = new Array(this.data.news.image);
      var item = { id: this.data.id, title: this.data.news.title, images: images };
      // 追加到数组开头
      pageData.unshift(item);
      this.setData({ isCollect: true })
    }

    // 设置缓存
    try{
      wx.setStorageSync("pageData", pageData);
    } catch (e) { }
    console.log(pageData);
  },

  /**
   * 跳转到评论页面
   */
  toCommentPage: function (e) {
    // 获取评论按钮元素上边的 data-id 属性值
    var storyId = e.currentTarget.dataset.id;
    // 长评数目
    var longCommentCount = this.data.extraInfo ? this.data.extraInfo.long_comments : 0;
    // 短评数目
    var shortCommentCount = this.data.extraInfo ? this.data.extraInfo.short_comments : 0;

    // 跳转到评论页面，并传递评论数目信息
    wx.navigateTo({
      url: '../comment/comment?lcount=' + longCommentCount + '&scount=' + shortCommentCount + '&id=' + storyId
    });
  },

  /**
   * 图片预览
   */
  previewImgEvent: function (e) {
    var src = e.currentTarget.dataset.src;
    if (src && src.length > 0) {
      wx.previewImage({
        urls: [src]
      })
    }
  },

  /**
   * 重新加载数据
   */
  reloadEvent: function () {
    this.loadData();
  },

  /**
   * 显示分享模态框
   */
  showModalEvent: function () {
    this.setData({ modalHidden: false });
  },

  /**
   * 隐藏分享模态框
   */
  hideModalEvent: function () {
    this.setData({ modalHidden: true });
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
        console.log(data);
        // 解析story对象的body部分
        data.body = utils.parseStory(data.body, _this.data.isTheme);
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
      // 设置点赞数量大于999显示999+
      data.dispose_popularity = (data.popularity > 999) ? "999+" : data.popularity;
      _this.setData({ extraInfo: data });
    })
  }
})