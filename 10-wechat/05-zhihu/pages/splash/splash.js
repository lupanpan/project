var requests = require('../../requests/request.js');
var util = require('../../utils/util.js');

Page({
  data: {
    splash: {},
    screenHeight: 0,
    screenWidth: 0
  },
  onLoad: function (options) {
    var _this = this;

    // 获取系统数据中的屏幕宽高
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          screenHeight: res.windowHeight,
          screenWidth: res.windowWidth
        });
      }
    })
  },
  onReady: function () {
    var _this = this;
    // 设置size参数
    var size = this.data.screenWidth + '*' + this.data.screenHeight;
    // 请求封面图，但是现在不可用了
    requests.getSplashCover(size, 
      function(data){
        // 判断data是否有数据，如果无数据，则随机使用本地图片
        if(!data) {
          // 生成1-6随机数
          var randomNum = Math.ceil(Math.random() * 6);
          data = {};
          data.img = "../../images/cover/cover" + randomNum + ".jpg";
        }
        _this.setData({ splash: data });
      }, 
      null, 
      function(){
        _this.toIndexPaga();
      }
    );
  },
  /**
   * 跳转到首页
   */
  toIndexPaga: function() {
    setTimeout(function(){
      wx.redirectTo({
        url: '../index/index'
      })
    },2000)
  }
})