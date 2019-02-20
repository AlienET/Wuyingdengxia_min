// pages/invoice/invoice.js
var RSA = require('../../utils/wx_rsa.js');
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //要不要发票
    is_invoice: 'zzfp',
    //发票列表
    fpLis:''
  },
  //选择是否需要发票
  radioChange: function(e) {
    var that = this;
    that.setData({
      is_invoice: e.detail.value
    })
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  //添加发票
  OnaddfpTap: function(e) {
    var that = this;
    wx.navigateTo({
      url: '../AddInvoice/AddInvoice',
    })
  },
  //选择发票
  radioChangelis: function(e) {
    console.log(e.detail.value)
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
      url: 'http://39.106.49.2:8081/usermanage/queryUserReceiptInfo',
      data: {
        data: data
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log(res.data.data)
        that.setData({
          fpLis:res.data.data
        })
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