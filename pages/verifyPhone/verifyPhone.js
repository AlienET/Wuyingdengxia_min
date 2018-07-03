// pages/verifyPhone/verifyPhone.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    yzm: true,
    phoneNum: null,
    yzmNum: null,
    password:null
  },
  phone: function (e) {
    var that = this;
    if (e.detail.value.length == 11) {
      that.setData({ phoneNum: e.detail.value })
    } else {
      wx.showToast({
        title: '手机号有误',
        icon: 'none',
        duration: 1500
      })
    }
  },
  password:function(e){
    var that = this;
    that.setData({ password: e.detail.value })
    console.log(that.data.password)
  },
  yzmNum: function (e) {
    var that = this;
    that.setData({ yzmNum: e.detail.value })
  },
  onYzmtap: function () {
    var that = this;
    if (that.data.yzm && that.data.phoneNum != null) {
      // that.setData({yzm:false})
      wx.request({
        url: app.InterfaceUrl + 'get_verifyPhone_wechat',
        data: {
          userphone: that.data.phoneNum
        },
        success: function (res) {
          console.log(res)
          that.setData({ yzm: false })
        }
      })
    }
  },
  imBind:function(){
    var that = this;
    app.globalData.userInfo.gender == 1 ?
      app.globalData.userInfo.gender = '男':
      app.globalData.userInfo.gender = '女';
    wx.request({
      url: app.InterfaceUrl + 'wechat_bind_userinfo',
      data:{
        userphone: that.data.phoneNum,
        sms_code: that.data.yzmNum,
        nickname: app.globalData.userInfo.nickName,
        headimg: app.globalData.userInfo.avatarUrl,
        sex: app.globalData.userInfo.gender,
        wechat_openid: app.wechat_open_id,
        password: that.data.password
      },
      method:'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success:function(res){
        console.log(res)
        wx.switchTab({
          url: '../index/index',
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.userInfo)
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