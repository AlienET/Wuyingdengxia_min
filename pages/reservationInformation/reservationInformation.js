// pages/reservationInformation/reservationInformation.js
//获取应用实例
const app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    begin_time: '',
    end_time: '',
    meet_title: '',
    // 终点
    terminus: '',
    // 始发
    originating: '',
    // 日期
    date: '',
    // 车次
    train_no: '选择车次',
    // 备选车次
    trainAll: '',
    // 车次备注
    inputTxt: '',
    // 住房备注
    inputTxtR: '',
    // 入住
    rzdate: '',
    // 离开
    lkdate: '',
    ji: '3'
  },
  // 车次查询
  cccx: function (e) {
    var that = this;
    if (e.currentTarget.dataset.w == '2' || e.currentTarget.dataset.w == '3') {
      if (that.data.originating != '始发' && that.data.terminus != '终点') {
        wx.navigateTo({
          url: '../juhe/juhe?w=' + e.currentTarget.dataset.w + '&start=' + that.data.originating + '&end=' + that.data.terminus + '&date=' + that.data.date,
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
      } else {
        wx.showToast({
          title: '请选择城市',
          icon: 'none',
          duration: 2000
        })
      }
    } else if (e.currentTarget.dataset.w == '0' || e.currentTarget.dataset.w == '1') {
      wx.navigateTo({
        url: '../juhe/juhe?w=' + e.currentTarget.dataset.w,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  },
  // 报名提交页面 跳转
  onBmtjTap: function (e) {
    var that = this;
    if (that.data.terminus != '终点' && that.data.originating != '始发' && that.data.train_no != '选择车次') {

      wx.request({
        url: app.InterfaceUrl + 'post_attend',
        data: {
          user_id: app.userData.user_id,
          meet_id: that.data.meet_id,
          take_type: '火车',
          car_num1: that.data.train_no,
          from1: that.data.originating,
          to1: that.data.terminus,
          car_num1b: that.data.trainAll,
          from1b: '',
          to1b: '',
          car_num2: '',
          from2: '',
          to2: '',
          car_num2b: '',
          from2b: '',
          to2b: '',
          special1: that.data.inputTxt,
          special2: '',
          begin_time: that.data.rzdate,
          end_time: that.data.lkdate,
          remark: that.data.inputTxtR
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: function (res) {
          console.log(res);
          if(res.data.code ==1){
          wx.navigateTo({
            url: '../applySubmit/applySubmit',
          })
          }else{
            wx.showToast({
              title: '提交失败...',
              icon: 'none',
              duration: 2000
            })
          }
        },
        fail: function (error) {
          console.log(error)
        }
      })
    } else {
      wx.showToast({
        title: '请完善信息',
        icon: 'none',
        duration: 2000
      })
    }
  },
  // 日期
  bindDateChange: function (e) {
    var that = this;
    this.setData({
      date: e.detail.value
    })
  },
  bindruzhuChange: function (e) {
    var that = this;
    this.setData({
      rzdate: e.detail.value
    })
    console.log(that.data.rzdate)
  },
  bindlikaiChange: function (e) {
    var that = this;
    this.setData({
      lkdate: e.detail.value
    })
    console.log(that.data.lkdate)
  },
  onhuanTap: function () {
    var that = this;
    var terminus = that.data.terminus;
    var originating = that.data.originating;
    if (terminus == '终点' || originating == '始发') {
      wx.showToast({
        title: '请选择城市',
        icon: 'none',
        duration: 2000
      })
    } else {
      that.setData({
        terminus: originating,
        originating: terminus
      })
    }
  },
  // 备注
  bzxx: function (event) {
    var that = this;
    console.log(event.detail.value)
    that.setData({ inputTxt: event.detail.value })
  },
  bzxxR: function (event) {
    var that = this;
    console.log(event.detail.value)
    that.setData({ inputTxtR: event.detail.value })
  },
  //几晚
  onjiTap: function () {
    console.log('1')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var date = util.formatTime(new Date);
    that.setData({
      date: date,
      rzdate: date,
      lkdate: date,
      meet_id: options.meet_id
    })
    that.setData({
      begin_time: options.begin_time,
      end_time: options.end_time,
      meet_title: options.meet_title,
      aboutData: app.userData,
      originating: app.originating,
      terminus: app.staName
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
    console.log(app.staName)
    if (app.j == '0') {
      that.setData({ originating: app.staName })
    } else if (app.j == '1') {
      that.setData({ terminus: app.staName })
    } else if (app.j == '2') {
      that.setData({ train_no: app.staName })
    } else if (app.j == '3') {
      that.setData({ trainAll: app.staName })
    }
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