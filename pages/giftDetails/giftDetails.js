// pages/giftDetails/giftDetails.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // banner图片
    bGmode: 'widthFix',
    val: 1
  },
  // 数量 减
  SubtractValue: function (e) {
    const that = this;
    this.setData({
      val: that.data.val == 1 ? that.data.val : that.data.val - 1
    })
  },
  // 数量 加
  AddValue: function () {
    const that = this;
    this.setData({
      val: that.data.val + 1
    })
  },
  // 确认兑换
  onShowModalTap: function () {
    wx.showModal({
      title: '确定使用40月亮币兑换？',
      cancelColor: '#979797',
      confirmColor: '#1397FF',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.navigateTo({
            url: '../ForSuccessful/ForSuccessful',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
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