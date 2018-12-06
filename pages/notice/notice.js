// pages/notice/notice.js
var RSA = require('../../utils/wx_rsa.js');
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /** 
     * 页面配置 
     */
    winWidth: 0,
    winHeight: 0,
    // tab切换
    flag: 0,
    // 通知 列表
    TZ: [],
    // 收藏问题 列表
    XT: [],
  },
  // 点击切换
  onBackTap: function(e) {
    var that = this;
    console.log(e.target.dataset.current)
    if (this.data.flag === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        flag: e.target.dataset.current
      })
    }
  },
  /** 
   * 滑动切换tab 
   */
  bindChange: function(e) {
    console.log(e.detail.current)
    var that = this;
    that.setData({
      flag: e.detail.current
    });
    if (e.detail.current == 1) {
      //获取 系统
      var data = new Object();
      data.userid = app.userData.userid;
      data.type = '1';
      data = JSON.stringify(data); // 转JSON字符串
      var data = RSA.sign(data);
      wx.request({
        url: app.InterfaceUrl + 'usermanage/getUserMessage',
        data: {
          data: data
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function(res) {
          console.log(res)
          var time = '';
          for (var i = res.data.data.length - 1; i >= 0; i--) {
            time = res.data.data[i].ctime.substring(0, 19);
            time = time.replace(/-/g, '/');
            time = new Date(time).getTime();
            res.data.data[i].ctime = app.getDateDiff(time);
          }
          that.setData({
            XT: res.data.data
          });
        }
      })
    }
  },
  //问卷调查、投票
  OnH5Tap: function(e) {
    console.log(e.currentTarget.dataset.item)
    if (e.currentTarget.dataset.item.url) {
      app.bannerUrl = e.currentTarget.dataset.item.url;
      wx.navigateTo({
        url: '../bannerTo/bannerTo',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
    //获取 通知
    var data = new Object();
    data.userid = app.userData.userid;
    data.type = '0';
    data = JSON.stringify(data); // 转JSON字符串
    var data = RSA.sign(data);
    wx.request({
      url: app.InterfaceUrl + 'usermanage/getUserMessage',
      data: {
        data: data
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log(res)
        var time = '';
        for (var i = res.data.data.length - 1; i >= 0; i--) {
          time = res.data.data[i].ctime.substring(0, 19);
          time = time.replace(/-/g, '/');
          time = new Date(time).getTime();
          res.data.data[i].ctime = app.getDateDiff(time);
        }
        that.setData({
          TZ: res.data.data
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})