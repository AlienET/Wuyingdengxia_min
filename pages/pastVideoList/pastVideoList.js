// pages/pastVideoList/pastVideoList.js
var RSA = require('../../utils/wx_rsa.js');
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 数据列
    subReplay: [],
    //展位图
    imgUrl:''
  },
  // 往期视频详情页
  onPastVideoTap: function(e) {
    console.log(e.currentTarget.dataset.postid)
    wx.navigateTo({
      url: '../pastVideo/pastVideo?replay_sub_id=' + e.currentTarget.dataset.postid,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    var that = this;
    var data = new Object();
    data.replay_id = options.replay_id;
    data = JSON.stringify(data); // 转JSON字符串
    var data = RSA.sign(data);
    wx.request({
      url: app.InterfaceUrl + 'activitymanage/getHistoryMeetReplay',
      data: {
        data: data,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log(res.data.data);
        that.setData({
          subReplay: res.data.data,
          imgUrl: options.imgUrl
        })
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