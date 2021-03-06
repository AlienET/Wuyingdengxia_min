// pages/WishDetails/WishDetails.js
var RSA = require('../../utils/wx_rsa.js');
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    aboutData:[]
  },
  // 确认实现
  onConfirmationAchieveTap: function () {
    var that = this;
    wx.showModal({
      title: '确认实现该愿望吗？',
      confirmColor: '#2da3ff',
      success: function (res) {
        if (res.confirm) {
          var data = new Object();
          data.wishid = that.data.aboutData.wishid;
          data = JSON.stringify(data); // 转JSON字符串
          var data = RSA.sign(data);
          wx.request({
            url: app.InterfaceUrl+'usermanage/confirmWishRealization',
            data: {
              data:data
            },
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success:function(res){
              console.log(res)
              wx.navigateBack({
                delta: 1,
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消');
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this;
    that.setData({aboutData:options})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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