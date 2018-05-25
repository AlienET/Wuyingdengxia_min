// pages/PersonalCenter/PersonalCenter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 背景图片
    bGmode: 'widthFix'
  },
  // 我的投稿
  onMySubmissionTap:function(){
    wx.navigateTo({
      url: '../MySubmission/MySubmission',
    })
  },
  // 每日签到
  onSignBoardTap: function () {
    wx.navigateTo({
      url: '../SignBoard/SignBoard',
    })
  },
  // 我的兑换记录
  onMyChangeTap: function () {
    wx.navigateTo({
      url: '../myChange/myChange',
    })
  },
  // 我的提问
  OnMyQuestionTap:function(){
    wx.navigateTo({
      url: '../Myquestion/Myquestion',
    })
  },
  // 我的回答
  OnMyAnswerTap:function(){
    wx.navigateTo({
      url: '../Myanswer/Myanswer',
    })
  },
  // 我的关注
  OnMyfollowTap:function(){
    wx.navigateTo({
      url: '../Myfollow/Myfollow',
    })
  },
  // 许愿池
  onWishingWellTap: function () {
    wx.navigateTo({
      url: '../wishingWell/wishingWell',
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