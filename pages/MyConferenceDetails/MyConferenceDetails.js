// pages/MyConferenceDetails/MyConferenceDetails.js
var RSA = require('../../utils/wx_rsa.js');
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    aboutData: '',
    //乘车信息1
    ccxx1: true,
    //乘车信息2
    ccxx2: false,
    sr: ''
  },
  // 打电话
  onCallTap: function() {
    wx.makePhoneCall({
      phoneNumber: '18611969985' //仅为示例，并非真实的电话号码
    })
  },
  //乘车信息1
  ccxx1: function() {
    var that = this;
    var ccxx1 = that.data.ccxx1;
    that.setData({
      ccxx1: !ccxx1
    })
    console.log(that.data.ccxx1)
  },
  //乘车信息2
  ccxx2: function() {
    var that = this;
    var ccxx2 = that.data.ccxx2;
    that.setData({
      ccxx2: !ccxx2
    })
    console.log(that.data.ccxx2)
  },
  //会议详情
  hyxq: function() {
    var that = this;
    if (that.data.sr == 1) {
      wx.navigateTo({
        url: '../ConferenceDetails/ConferenceDetails?meet_id=' + that.data.meet_id,
      })
    }
  },
  //获取二维码
  Rcode: function() {
    var that = this;
    if (that.data.sr == 1) {
      if (that.data.aboutData.qrCode_token == '') {
        wx.showToast({
          title: '审核还未通过',
          icon: 'none',
          duration: 1500
        })
      } else {
        console.log(that.data.aboutData.qrCode_token);
        app.Rcode = that.data.aboutData.qrCode_token
        wx.navigateTo({
          url: '../Rcode/Rcode',
        })
      }
    }
  },
  //取消报名
  onEnrollTap: function() {
    var that = this;
    if (that.data.is_check == 0) {
      console.log(that.data.aboutData)
      wx.showModal({
        title: that.data.aboutData.meet_title,
        content: '是否确定要取消报名',
        success(res) {
          if (res.confirm) {
            var data = new Object();
            data.attendmeet_id = that.data.aboutData.attendmeet_id;
            data = JSON.stringify(data);
            var data = RSA.sign(data);
            wx.request({
              url: app.InterfaceUrl + 'activitymanage/cancelAttendMeet',
              data: {
                data: data
              },
              method: 'POST',
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success: function(res) {
                console.log(res);
                if (res.data.code == 1) {
                  wx.showToast({
                    title: '取消成功',
                    icon: 'success',
                    duration: 1500,
                    success: function() {
                      wx.navigateBack({
                        delta: 1
                      })
                    },
                  })
                }

              },
              fail: function(error) {
                console.log(error)
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })

    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    var that = this;
    app.Rcode = '';
    var data = new Object();
    data.meet_id = options.meet_id;
    data.userid = options.userid;
    data.identity = app.userData.userPosition;
    data = JSON.stringify(data); // 转JSON字符串
    var data = RSA.sign(data);
    wx.request({
      url: app.InterfaceUrl + 'activitymanage/getAttendMeet',
      data: {
        data: data
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log(res);
        that.setData({
          aboutData: res.data.data,
          meet_id: options.meet_id,
          is_check: options.is_check,
          sr: options.sr
        })
        console.log(that.data.is_check)
      },
      fail: function(error) {
        console.log(error)
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
    // var that = this;
    // var data = new Object();
    // data.meet_id = that.data.meet_id;
    // data.userid = app.userData.userid;
    // data.identity = app.userData.userPosition;
    // data = JSON.stringify(data); // 转JSON字符串
    // var data = RSA.sign(data);
    // wx.request({
    //   url: app.InterfaceUrl+'activitymanage/getAttendMeet',
    //   data: {
    //     data: data
    //   },
    //   method: 'POST',
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded'
    //   },
    //   success: function(res) {
    //     console.log(res);
    //     that.setData({
    //       aboutData: res.data.data
    //     })
    //   },
    //   fail: function(error) {
    //     console.log(error)
    //   }
    // })
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