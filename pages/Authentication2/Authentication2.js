// pages/Authentication2/Authentication2.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 医院
    user_hospital: '',
    // 科室
    user_office: '',
    // 职务
    user_post: ''
  },
  // 医院
  blurUserHospital: function (e) {
    this.setData({ user_hospital: e.detail.value })
  },
  // 科室
  blurUserOffice: function (e) {
    this.setData({ user_office: e.detail.value })
  },
  // 职务
  blurUserPost: function (e) {
    this.setData({ user_post: e.detail.value })
  },
  // 下一步
  OnNextStepTap: function () {
    var that = this;
    // post_change_myinfo
    if (that.data.user_hospital != '' && that.data.user_office != '' && that.data.user_post != '') {
      wx.navigateTo({
        url: '../Authentication3/Authentication3',
        success: function () {
          wx.request({
            url: app.InterfaceUrl + 'post_change_myinfo',
            data: {
              userid: that.data.userid,
              userhospital: that.data.user_hospital,//医院,
              useroffice: that.data.user_office,//科室
              userpost: that.data.user_post//职务
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            success: function (res) {
              console.log(res);

            },
            fail: function (error) {
              console.log(error)
            }
          })
        }
      })
    } else {
      wx.showToast({
        title: '请完善信息',
        icon: 'none',
        duration: 1500
      })
    }
  },
  // 上一步
  OnlastStepTap:function(){
    wx.navigateBack({
      delta: 1
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