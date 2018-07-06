// pages/authorInfo/authorInfo.js
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    aboutData: []
  },
  onArticleDetailTap: function (articleid) {
    wx.navigateTo({
      url: '../article_detail/article_detail?articleid=' + articleid.currentTarget.dataset.postid,
    })
  },
  // 关注
  follow: function () {
    var that = this;
    if (that.data.aboutData.is_follow > 0) {
      wx.request({
        url: app.InterfaceUrl + 'post_cel_follow',
        data: {
          userid: app.userData.user_id,
          befollid: that.data.aboutData.userid
        },
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        method: "POST",
        success: function (res) {
          that.setData({
            'aboutData.is_follow': 0
          })
        },
        fail: function (error) {
          console.log(error);
        }
      })
    } else {
      wx.request({
        url: app.InterfaceUrl + 'post_follow',
        data: {
          userid: app.userData.user_id,
          befollid: that.data.aboutData.userid
        },
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        method: "POST",
        success: function (res) {
          that.setData({
            'aboutData.is_follow': 1
          })
        },
        fail: function (error) {
          console.log(error);
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
      url: app.InterfaceUrl + 'get_myinfo?userid=' + options.userid + '&current_userid=' + app.userData.user_id,
      success: function (res) {
        that.setData({ aboutData: res.data.data })
      }
    });
    wx.request({
      url: app.InterfaceUrl + 'get_myarticle?userid=' + options.userid,
      success: function (res) {
        for (var i = res.data.data.length - 1; i >= 0; i--) {
          if (res.data.data[i].article_img_path != '') {
            res.data.data[i].article_img_path = res.data.data[i].article_img_path.split(',');
          }
        }
        var arr = [];
        for (var i = res.data.data.length-1;i>=0;i--){
          if (res.data.data[i].is_check == '1'){
            arr.push(res.data.data[i])
          }
        }
        console.log(res.data.data)
        that.setData({ articleList: arr })
        console.log(that.data.articleList)

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