// pages/addressDZ/addressDZ.js
var RSA = require('../../utils/wx_rsa.js');
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //发票列表
    fpLis: ''
  },
  //添加发票
  OnaddfpTap: function(e) {
    var that = this;
    wx.navigateTo({
      url: '../AddAddress/AddAddress',
    })
  },
  //选择发票
  radioChangelis: function(e) {
    var that = this;
    app.MailingAddress = that.data.fpLis[e.detail.value];
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    var that = this;
    var obj = new Object();
    obj.user_id = app.userData.userid;
    obj = JSON.stringify(obj); // 转JSON字符串
    var data = RSA.sign(obj);
    wx.request({
      url: 'http://39.106.49.2:8081/usermanage/queryUserMailInfo',
      data: {
        data: data
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log(res)
        for (var i = res.data.data - 1; i >= 0; i--) {
          res.data.data[i].checked = 'no';
        }
        if(res.data.data.length>0){
          res.data.data[0].checked = 'checked';
          app.MailingAddress = res.data.data[0];
        }
        that.setData({
          fpLis: res.data.data
        })
        console.log(that.data.fpLis)
      },
      fail: function(error) {
        console.log(error)
      }
    })
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