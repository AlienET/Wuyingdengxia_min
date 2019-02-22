// pages/RegistrationFee/RegistrationFee.js
var RSA = require('../../utils/wx_rsa.js');
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //发票信息
    InvoiceInformation: '',
    //地址
    MailingAddress:'',
    //会名
    meet_title:'',
    //费用
    meet_regist_fee:''
  },
  invoiceTap: function() {
    var that = this;
    wx.navigateTo({
      url: '../invoice/invoice',
    })
  },
  addressTap:function(){
    var that = this;
    wx.navigateTo({
      url: '../addressDZ/addressDZ',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    var that = this;
    that.setData({
      meet_regist_fee: options.meet_regist_fee,
      meet_title: options.meet_title
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
    var that = this;
    console.log(app.InvoiceInformation);
    if (app.InvoiceInformation) {
      that.setData({
        InvoiceInformation: app.InvoiceInformation,
        MailingAddress: app.MailingAddress
      })
    }
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
    app.InvoiceInformation = '';
    app.MailingAddress = '';
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