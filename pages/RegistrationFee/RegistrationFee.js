// pages/RegistrationFee/RegistrationFee.js
var RSA = require('../../utils/wx_rsa.js');
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //发票信息
    InvoiceInformation: '',
    //地址
    MailingAddress: '',
    //会名
    meet_title: '',
    //费用
    meet_regist_fee: ''
  },
  invoiceTap: function() {
    var that = this;
    wx.navigateTo({
      url: '../invoice/invoice',
    })
  },
  addressTap: function() {
    var that = this;
    wx.navigateTo({
      url: '../addressDZ/addressDZ',
    })
  },
  //报名
  OnSignUpTap: function(res) {
    var that = this;
    if (that.data.InvoiceInformation && that.data.MailingAddress) {

      var data = new Object();
      var meet_regist_fee = that.data.meet_regist_fee * 100;
      data.appid = "wx8dbc9156e40232a7";
      data.spbill_create_ip = "wydx";
      data.order_type = "0";
      data.toId = app.userData.userid;
      data.userid = app.userData.userid;
      data.trade_type = "JSAPI";
      data.js_code = app.wx_code;
      data.openid = app.mini_openid;
      data.total_fee = meet_regist_fee.toString();
      data = JSON.stringify(data); // 转JSON字符串
      var data = RSA.sign(data);
      wx.request({
        url: 'http://39.106.49.2:8081/usermanage/UnifiedOrder',
        data: {
          data: data
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function(res) {
          console.log(res)
          console.log(res.data.data)
          wx.requestPayment({
            'timeStamp': res.data.data.timeStamp,
            'nonceStr': res.data.data.nonceStr,
            'package': res.data.data.package,
            'signType': 'MD5',
            'paySign': res.data.data.sign,
            'success': function(res) {
              console.log(res)
              var reservationInformationData = app.reservationInformationData;
              reservationInformationData.receipt_id = app.InvoiceInformation.receipt_id;
              reservationInformationData.mail_id = app.InvoiceInformation.mail_id;
              var objs = JSON.stringify(reservationInformationData); // 转JSON字符串
              var objss = RSA.sign(objs);
              wx.showLoading({
                title: '提交中',
                success: function(res) {
                  wx.request({
                    // url: app.InterfaceUrl+'activitymanage/AttendMeet',
                    url: 'http://39.106.49.2:8083/activitymanage/AttendMeet',
                    data: {
                      data: objss
                    },
                    header: {
                      'content-type': 'application/x-www-form-urlencoded'
                    },
                    method: 'POST',
                    success: function(res) {
                      console.log(res);
                      if (res.data.code == 1) {
                        wx.navigateTo({
                          url: '../applySubmit/applySubmit?title=' + that.data.meet_title + '&begin_time=' + reservationInformationData.begin_time + '&end_time=' + reservationInformationData.end_time,
                        })
                      } else {
                        wx.hideLoading()
                        wx.showToast({
                          title: '提交失败...',
                          icon: 'none',
                          duration: 2000
                        })
                      }
                    },
                    fail: function(error) {
                      console.log(error)
                    }
                  })
                }
              })
            },
            'fail': function(res) {
              console.log(res)
              wx.showToast({
                title: '报名支付失败',
                icon: 'success',
                duration: 2000
              });
            },
            'complete': function(res) {
              console.log(res)
            }
          })
        }
      })

    } else if (that.data.InvoiceInformation == '' && that.data.MailingAddress == '') {
      var data = new Object();
      var meet_regist_fee = that.data.meet_regist_fee * 100;
      data.appid = "wx8dbc9156e40232a7";
      data.spbill_create_ip = "wydx";
      data.order_type = "0";
      data.toId = app.userData.userid;
      data.userid = app.userData.userid;
      data.trade_type = "JSAPI";
      data.js_code = app.wx_code;
      data.openid = app.mini_openid;
      data.total_fee = meet_regist_fee.toString();
      data = JSON.stringify(data); // 转JSON字符串
      var data = RSA.sign(data);
      wx.request({
        url: 'http://39.106.49.2:8081/usermanage/UnifiedOrder',
        data: {
          data: data
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function(res) {
          console.log(res)
          console.log(res.data.data)
          wx.requestPayment({
            'timeStamp': res.data.data.timeStamp,
            'nonceStr': res.data.data.nonceStr,
            'package': res.data.data.package,
            'signType': 'MD5',
            'paySign': res.data.data.sign,
            'success': function(res) {
              console.log(res)
              var reservationInformationData = app.reservationInformationData;
              var objs = JSON.stringify(reservationInformationData); // 转JSON字符串
              var objss = RSA.sign(objs);
              wx.showLoading({
                title: '提交中',
                success: function(res) {
                  wx.request({
                    // url: app.InterfaceUrl+'activitymanage/AttendMeet',
                    url: 'http://39.106.49.2:8083/activitymanage/AttendMeet',
                    data: {
                      data: objss
                    },
                    header: {
                      'content-type': 'application/x-www-form-urlencoded'
                    },
                    method: 'POST',
                    success: function(res) {
                      console.log(res);
                      if (res.data.code == 1) {
                        wx.navigateTo({
                          url: '../applySubmit/applySubmit?title=' + that.data.meet_title + '&begin_time=' + reservationInformationData.begin_time + '&end_time=' + reservationInformationData.end_time,
                        })
                      } else {
                        wx.hideLoading()
                        wx.showToast({
                          title: '提交失败...',
                          icon: 'none',
                          duration: 2000
                        })
                      }
                    },
                    fail: function(error) {
                      console.log(error)
                    }
                  })
                }
              })
            },
            'fail': function(res) {
              console.log(res)
              wx.showToast({
                title: '报名支付失败',
                icon: 'success',
                duration: 2000
              });
            },
            'complete': function(res) {
              console.log(res)
            }
          })
        }
      })

      console.log('也可报名')
    } else {
      console.log(that.data.MailingAddress)
      console.log(that.data.InvoiceInformation)
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
  onLoad: function(options) {
    console.log(options)
    var that = this;
    that.setData({
      meet_regist_fee: options.meet_regist_fee,
      meet_title: options.meet_title
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
    console.log(app.InvoiceInformation);
    if (app.InvoiceInformation) {
      that.setData({
        InvoiceInformation: app.InvoiceInformation,
        MailingAddress: app.MailingAddress
      })
      console.log(app.MailingAddress);
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
    app.InvoiceInformation = '';
    app.MailingAddress = '';
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