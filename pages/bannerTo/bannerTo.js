// pages/bannerTo/bannerTo.js
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    console.log(options)
    var url = '';
    var yszg = app.bannerUrl.substr(0, 20);
    console.log(yszg)
    if (yszg == 'https://www.wydx.top') {
      url = app.bannerUrl + '&userid=' + options.userid;
    } else {
      url = app.bannerUrl;
    }
    console.log(url)
    that.setData({
      url: url,
    })
  },
  //H5 监听
  bindGetMsg: function(e) {
    console.log(e)
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