// pages/othersCenter/othersCenter.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 基本信息
    information: [],
    // 文章列
    articleList: []
  },
  // 关注
  onfollowTap: function () {
    var that = this;
    if (that.data.information.is_follow > 0) {
      console.log('取消关注')
      wx.request({
        url: app.InterfaceUrl + 'post_cel_follow',
        data: {
          userid: 10003,
          befollid: 10003
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: function (res) {
          console.log(res);
          that.setData({ 'information.is_follow': 0 })
        }
      })
    } else {
      console.log('关注')
      wx.request({
        url: app.InterfaceUrl + 'post_follow',
        data: {
          userid: 10003,
          befollid: 10003
        },
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        method: "POST",
        success: function (res) {
          console.log(res)
          that.setData({ 'information.is_follow':1})
        },
        fail: function (error) {
          console.log(error);
        }
      })
    }
  },
  // 点击文章
  onArticleDetailTap: function (e) {
    console.log(e.currentTarget.dataset.articleid)
    wx.navigateTo({
      url: '../article_detail/article_detail?articleid=' + e.currentTarget.dataset.articleid,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //获取基本信息
    wx.request({
      url: app.InterfaceUrl + 'get_myinfo?userid=10003&current_userid=10003',
      success: function (res) {
        console.log(res);
        that.setData({ information: res.data.data })
      }
    })
    // 文章列
    wx.request({
      url: app.InterfaceUrl + 'get_articleinfo_byuserid?userid=10003',
      success: function (res) {
        console.log(res);
        console.log(res.data.data)
        for (var i = res.data.data.length - 1; i >= 0; i--) {
          that.data.articleList.push(res.data.data[i])
        }
        that.setData({ articleList: that.data.articleList })
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