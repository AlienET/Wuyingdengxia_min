// pages/makeVowRecord/makeVowRecord.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    aboutData: []
  },
  // 许愿详情
  onItemTap: function (e) {
    var that = this;
    console.log(e.currentTarget.dataset.postid)
    wx.navigateTo({
      url: '../WishDetails/WishDetails?wishid=' + e.currentTarget.dataset.postid.wish_id + '&wish_content=' + e.currentTarget.dataset.postid.wish_content + '&ctime=' + e.currentTarget.dataset.postid.ctime + '&moon_cash=' + e.currentTarget.dataset.postid. moon_cash,
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
    var that = this;
    wx.request({
      url: app.InterfaceUrl + 'get_myalldesire?user_id=' + app.userData.user_id,
      success: function (res) {
        console.log(res)
        that.setData({ aboutData: res.data.data })
      }
    })
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