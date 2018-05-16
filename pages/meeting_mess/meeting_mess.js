// pages/index//meeting_mess/meeting_mess.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: 0
  },

  // 点击切换
  onBackTap: function () {
    this.setData({
      flag : 1
    })
  },
  onMessTap: function () {
    this.setData({
      flag : 0
    })
  },
  // 往期回顾 详情
  onVideoListTap:function(){
    wx.navigateTo({
      url: '../pastVideoList/pastVideoList',
    })
  },
  //  会议咨询详情
  onConferenceDetailsTap:function(){
    wx.navigateTo({
      url: '../ConferenceDetails/ConferenceDetails',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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