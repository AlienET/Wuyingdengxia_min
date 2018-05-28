// pages/QAquiz/QAquiz.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 标题
    titTxt: '',
    // '下一步'状态
    isNext: false
  },
  // 标题内容
  titTxt: function (event) {
    var that = this;
    console.log(event.detail.value)
    event.detail.value == '' ? that.data.isNext = false : that.data.isNext = true;
    that.setData({
      titTxt: event.detail.value,
      isNext: that.data.isNext
    })
  },
  // 跳转内容
  onInnerTap: function () {
    var that = this;
    if (that.data.isNext) {
      wx.navigateTo({
        url: '../QAquiz_inner/QAquiz_inner?quesTitle=' + this.data.titTxt
      })
    } else {
      wx.showToast({
        title: '请填写问题标题',
        icon: 'none',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data.isNext)
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