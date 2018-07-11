// pages/ConferenceDetails/ConferenceDetails.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 详情数据
    aboutData: [],
    // 会议日程
    schedule: [],
    // 日程 展开收起
    isSchedule: false,
    // 介绍 展开/收起
    isIntroduce: false
  },
  // 介绍 展开/收起
  isIntroduce: function () {
    var that = this;
    var is_introduce = !that.data.isIntroduce;
    that.setData({ isIntroduce: is_introduce });
  },
  // 日程 展开/收起
  isSchedule: function () {
    var that = this;
    var is_schedule = !that.data.isSchedule;
    that.setData({ isSchedule: is_schedule })
  },
  // 报名 预定信息填写
  onEnrollTap: function () {
    var that = this;
    if (app.userData.isfinishCer == '1'){
      wx.navigateTo({
        url: '../reservationInformation/reservationInformation?meet_title=' + that.data.aboutData.meet_title + '&begin_time=' + that.data.aboutData.begin_time + '&end_time=' + that.data.aboutData.end_time
      })
    }else{
      wx.navigateTo({
        url: '../Authentication1/Authentication1',
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options.meet_id)
    // 获取会议详情
    wx.request({
      url: app.InterfaceUrl + 'get_meeting_byid?meet_id=' + options.meet_id,
      data: {},
      success: function (res) {
        that.setData({
          aboutData: res.data.data,
          schedule: res.data.data.meet_date[0].meet_class
        });
        console.log(res.data.data);
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