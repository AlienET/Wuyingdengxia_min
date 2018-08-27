// pages/SignBoard/SignBoard.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 背景图片
    bGmode: 'widthFix',
    // 兑换礼物列
    goods: [],
    // 是不签到
    isSign: ''
  },
  // 兑换礼物详情
  ongiftDetailsTap: function (e) {
    console.log(e.currentTarget.dataset.postid)
    wx.navigateTo({
      url: '../giftDetails/giftDetails?goods_id=' + e.currentTarget.dataset.postid,
    })
  },
  // 签到领币
  onSignTap: function () {
    var that = this;
    if (that.data.isSign == 0) {
      wx.request({
        url: app.InterfaceUrl + 'post_sign',
        data: {
          userid: app.userData.user_id,
          type: 1,
          toid: 0
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: function (res) {
          console.log(res);
          var moon_cash = parseInt(that.data.aboutData.moon_cash) + 5;
          app.userData.moon_cash = parseInt(app.userData.moon_cash) +5;
          that.setData({ 'aboutData.moon_cash': moon_cash })
          wx.showToast({
            title: '签到成功',
            icon: 'success',
            duration: 1500,
            success:function(res){
              that.setData({isSign:1})
            }
          })
        }
      })
    } else {
      wx.showToast({
        title: '今天已签到',
        icon: 'none',
        duration: 1500
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({ aboutData: app.userData })
    // 兑换礼物列表
    wx.request({
      url: app.InterfaceUrl + 'get_allgoods',
      data: {},
      success: function (res) {
        console.log(res.data.data)
        that.setData({ goods: res.data.data })
      }
    });
    // 今天是否签到
    wx.request({
      url: app.InterfaceUrl + 'get_singdata?userid='+app.userData.user_id,
      data: {},
      success: function (res) {
        console.log(res.data.data)
        that.setData({ isSign: res.data.data.isSign })
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
    var that = this;
    that.setData({ aboutData: app.userData })
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