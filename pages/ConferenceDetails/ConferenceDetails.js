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
    isIntroduce: false,
    //  专家 展开/收起
    iszjjs: false,
    // 会议是否 正在报名
    isfinish: ''
  },
  // 介绍 展开/收起
  isIntroduce: function() {
    var that = this;
    var is_introduce = !that.data.isIntroduce;
    that.setData({
      isIntroduce: is_introduce
    });
  },
  // 打电话
  onCallTap: function() {
    wx.makePhoneCall({
      phoneNumber: '18611969985' //仅为示例，并非真实的电话号码
    })
  },
  // 日程 展开/收起
  isSchedule: function() {
    var that = this;
    var is_schedule = !that.data.isSchedule;
    that.setData({
      isSchedule: is_schedule
    })
  },
  // 专家 展开/收起
  iszjjs: function() {
    var that = this;
    var is_iszjjs = !that.data.iszjjs;
    that.setData({
      iszjjs: is_iszjjs
    })
  },
  // 报名 预定信息填写
  onEnrollTap: function() {
    var that = this;
    wx.request({
      url: app.InterfaceUrl + 'mini_wechat_login',
      data: {
        mini_openid: app.mini_openid
      },
      method: 'GET',
      success: function(res) {
        app.userData = res.data.data;
        if (that.data.aboutData.is_attend == '0') {
          console.log(1)
          if (that.data.isfinish == '1') {
            console.log(2)
            if (app.userData.isfinishCer == "1") {
              console.log(3)
              wx.navigateTo({
                url: '../reservationInformation/reservationInformation?meet_title=' + that.data.aboutData.meet_title + '&begin_time=' + that.data.aboutData.begin_time + '&end_time=' + that.data.aboutData.end_time + '&meet_id=' + that.data.aboutData.meet_id
              })
            } else {
              wx.navigateTo({
                url: '../Authentication1/Authentication1',
              })
            }
          }
        }
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(2)
    var that = this;
    // 获取会议详情
    wx.request({
      url: app.InterfaceUrl + 'get_meeting_byid?meet_id=' + options.meet_id + '&user_id=' + app.userData.user_id,
      data: {},
      success: function(res) {
        // var meet_class = res.data.data.meet_date.length == 0 ? '' : res.data.data.meet_date[0].meet_class;
        console.log(res.data.data.meet_date)
        if (res.data.data.meet_date.length != 0) {
          for (var i = res.data.data.meet_date.length - 1; i >= 0; i--) {
            console.log(i)
            var date = res.data.data.meet_date[i].date.split(' ');
            console.log(date)
            res.data.data.meet_date[i].date = date[0]
            console.log(res.data.data.meet_date[i].date)
          }
        }
        that.setData({
          aboutData: res.data.data,
          schedule: res.data.data.meet_date,
          isfinish: res.data.data.isfinish
        });
        console.log(res.data.data);
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    if (that.data.aboutData.meet_id != undefined) {
      // 获取会议详情
      wx.request({
        url: app.InterfaceUrl + 'get_meeting_byid?meet_id=' + that.data.aboutData.meet_id + '&user_id=' + app.userData.user_id,
        data: {},
        success: function(res) {
          // var meet_class = res.data.data.meet_date.length == 0 ? '' : res.data.data.meet_date[0].meet_class;
          that.setData({
            aboutData: res.data.data,
            schedule: res.data.data.meet_date,
            isfinish: res.data.data.isfinish
          });
          console.log(res.data.data);
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})