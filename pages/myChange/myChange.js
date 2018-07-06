// pages/myChange/myChange.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 图片自适应
    bGmode: 'widthFix',
    // 兑换商品列
    goodsList: []
  },
  // 我的兑换详情
  onMyCashDetailTap: function (e) {
    console.log(e.currentTarget.dataset.id)
    wx.setStorage({
      key: "goods",
      data: e.currentTarget.dataset.id,
      success: function (res) {
        wx.navigateTo({
          url: '../myCashDetail/myCashDetail',
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.InterfaceUrl + 'get_goods_by_userid?user_id='+app.userData.user_id,
      data: {},
      success: function (res) {
        console.log(res.data.data);
        for (var i = res.data.data.length - 1; i >= 0; i--) {
          that.data.goodsList.push(res.data.data[i]);
        }
        that.setData({ goodsList: that.data.goodsList });
        console.log(that.data.goodsList)
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