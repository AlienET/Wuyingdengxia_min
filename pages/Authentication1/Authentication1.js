// pages/Authentication1/Authentication1.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 当前用户id
    userid: '',
    // 真实姓名
    user_name: '',
    // 联系电话
    user_phone: '13456789',
    // 身份证号
    user_id: '',
    // 您的身份
    index: 0,
    identity: ['普通', '行业专家', '主委', '委员', '核心组']
  },
  // 真实姓名
  blurUserName: function (e) {
    this.setData({ user_name: e.detail.value })
  },
  // 联系电话
  blurIDnumber: function (e) {
    this.setData({ user_id: e.detail.value })
  },
  // 职务
  bindPickerChange: function (e) {
    // event.detail = {value: value}
    this.setData({ index: e.detail.value })
  },
  // 下一步
  OnNextStepTap: function () {
    var that = this;
    // post_change_myinfo
    if (that.data.user_name != '' && that.data.user_id != '') {
      wx.navigateTo({
        url: '../Authentication2/Authentication2',
        success: function () {
          wx.request({
            url: app.InterfaceUrl + 'post_change_myinfo',
            data: {
              userid: that.data.userid,
              realName: that.data.user_name,//真实姓名,
              useridcard: that.data.user_id,//身份证号
              userposition: that.data.identity[that.data.index]//您的身份
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