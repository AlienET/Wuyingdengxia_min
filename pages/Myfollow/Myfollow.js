// pages/Myfollow/Myfollow.js
// 接口URL
const InterfaceUrl = 'http://39.106.2.216/index.php/API/'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 当前用户id
    userid: '10003',
    // 列表 数据
    aboutData: [],
    // 关注切换
    // state:true
  },
  // 关注
  state: function (e) {
    var that = this;
    console.log(e.currentTarget.dataset.item);
    console.log(e.currentTarget.dataset.idx)
    if (e.currentTarget.dataset.item.state) {
      // 取消关注
      wx.request({
        url: InterfaceUrl + 'post_cel_follow',
        data: {
          userid: that.data.userid,
          befollid: e.currentTarget.dataset.item.followid
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: function (res) {
          console.log(res);
          var state_idx = 'aboutData[' + e.currentTarget.dataset.idx + '].state';
          that.setData({ [state_idx]: false })
        }
      })
    } else {
      wx.request({
        url: InterfaceUrl + 'post_follow',
        data: {
          userid: that.data.userid,
          befollid: e.currentTarget.dataset.item.followid
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: function (res) {
          console.log(res);
          var state_idx = 'aboutData[' + e.currentTarget.dataset.idx + '].state';
          that.setData({ [state_idx]: true })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: InterfaceUrl + 'get_myfollow?userid=' + that.data.userid,
      data: {},
      success: function (res) {
        console.log(res.data.data);
        that.setData({ aboutData: res.data.data });
        for (var i = that.data.aboutData.length - 1; i >= 0; i--) {
          var aboutData_state = 'aboutData[' + i + '].state'
          that.setData({
            [aboutData_state]: true
          });
        }
        console.log(that.data.aboutData)
      }
    })
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