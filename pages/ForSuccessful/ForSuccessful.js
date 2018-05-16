// pages/ForSuccessful/ForSuccessful.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 背景图片
    bGmode: 'widthFix',
  },
  // 返回
  onBackTap:function(){
    wx.redirectTo({
      url:'../giftDetails/giftDetails'
      // giftDetails
    })
  },
  // 兑换记录
  onMyChangeTap:function(){
    wx.redirectTo({
      url: '../myChange/myChange'
      // giftDetails
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