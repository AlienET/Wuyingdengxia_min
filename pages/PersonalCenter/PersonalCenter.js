// pages/PersonalCenter/PersonalCenter.js
var RSA = require('../../utils/wx_rsa.js');
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 背景图片
    bGmode: 'widthFix',
    aboutData: []
  },
  // 我的收藏
  onMyCollectionTap: function() {
    wx.navigateTo({
      url: '../MyCollection/MyCollection',
    })
  },
  //我的收藏发票/地址信息
  onMyAddressInvoiceTap:function(){
    wx.navigateTo({
      url: '../AddressInvoice/AddressInvoice',
    })
  },
  //我的活动
  onMyActivityTap: function() {
    wx.navigateTo({
      url: '../MyActivity/MyActivity',
    })
  },
  // 科室书架
  onKeshishujiaTap: function() {
    wx.navigateTo({
      url: '../officBookcase/officBookcase',
    })
  },
  // 我的投稿
  onMySubmissionTap: function() {
    wx.navigateTo({
      url: '../MySubmission/MySubmission',
    })
  },
  // 每日签到
  onSignBoardTap: function() {
    wx.navigateTo({
      url: '../SignBoard/SignBoard',
    })
  },
  // 我的兑换记录
  onMyChangeTap: function() {
    wx.navigateTo({
      url: '../myChange/myChange',
    })
  },
  // 我的提问
  OnMyQuestionTap: function() {
    wx.navigateTo({
      url: '../Myquestion/Myquestion',
    })
  },
  // 我的回答
  OnMyAnswerTap: function() {
    wx.navigateTo({
      url: '../Myanswer/Myanswer',
    })
  },
  // 我的关注
  OnMyfollowTap: function() {
    wx.navigateTo({
      url: '../Myfollow/Myfollow',
    })
  },
  // 许愿池
  onWishingWellTap: function() {
    wx.navigateTo({
      url: '../wishingWell/wishingWell',
    })
  },
  // 用户认证信息 - 个人资料
  OnUserTap: function() {
    wx.navigateTo({
      url: '../personalData/personalData',
    })
  },
  //通知
  OnNoticeTap:function(){
    wx.navigateTo({
      url: '../notice/notice',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    
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
    var data = new Object();
    data.userid = app.userData.userid;
    data.current_userid = app.userData.userid;
    data = JSON.stringify(data); // 转JSON字符串
    var data = RSA.sign(data);
    wx.request({
      url: app.InterfaceUrl+'usermanage/getUserInfo',
      data: {
        data: data
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        app.userData = res.data.data;
        that.setData({
          aboutData: app.userData
        })
      },
      fail: function (error) {
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