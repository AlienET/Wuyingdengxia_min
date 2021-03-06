// pages/recharge/recharge.js
var RSA = require('../../utils/wx_rsa.js');
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    yb: '',
    cz: 0,
    moon_cash: '',
    phoneNum: '',
    username: ''
  },
  //选择
  radioChange: function(item) {
    var that = this;
    console.log(item.currentTarget.dataset.item);
    var active = 'yb[' + item.currentTarget.dataset.idx + '].ave';
    for (var i = that.data.yb.length - 1; i >= 0; i--) {
      var defout = 'yb[' + i + '].ave';
      that.setData({
        [defout]: false
      })
    }
    that.setData({
      [active]: true,
      cz: item.currentTarget.dataset.item.xj
    })
    console.log(that.data.cz)
  },
  qtTap: function() {
    wx.navigateTo({
      url: '../qtje/qtje',
    })
  },
  //充值
  chongzhi: function() {
    var that = this;
    if (that.data.cz > 0) {
      that.data.cz = that.data.cz * 100;
      var data = new Object();
      data.appid = "wx8dbc9156e40232a7";
      data.spbill_create_ip = "wydx";
      data.order_type = "1";
      data.toId = app.userData.userid;
      data.userid = app.userData.userid;
      data.trade_type = "JSAPI";
      data.js_code = app.wx_code;
      data.openid = app.mini_openid;
      data.total_fee = that.data.cz.toString();
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
              wx.showToast({
                title: '充值成功',
                icon: 'success',
                duration: 2000
              });
              var moon_cash = parseInt(that.data.moon_cash) + that.data.cz / 10;
              that.setData({
                moon_cash: moon_cash
              })
            },
            'fail': function(res) {
              console.log(res)
            },
            'complete': function(res) {
              console.log(res)
            }
          })
        }
      })
    } else {
      wx.showToast({
        title: '请选择充值数量',
        icon: 'none',
        duration: 1500
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    var data = new Object();
    data.userid = app.userData.userid;
    data.current_userid = app.userData.userid;
    data = JSON.stringify(data); // 转JSON字符串
    var data = RSA.sign(data);
    wx.request({
      // url: app.InterfaceUrl + 'usermanage/getUserInfo',
      url: 'http://39.106.49.2:8081/usermanage/getUserInfo',
      data: {
        data: data
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log(res)
        app.userData = res.data.data;
        that.setData({
          moon_cash: res.data.data.moon_cash,
          phoneNum: res.data.data.phoneNum,
          username: res.data.data.username
        })
      }
    })
    wx.request({
      url: 'http://39.106.49.2:8081/usermanage/queryMoonCashRechargeInfo',
      data: {},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log(res.data.data);
        var obj = [];
        for (var i = res.data.data.RechargeInfoList.length - 1; i >= 0; i--) {
          var objs = {
            yb: res.data.data.RechargeInfoList[i],
            xj: res.data.data.RechargeInfoList[i] / res.data.data.MoonCashAndRMBProportion,
            ave: false
          }
          obj.unshift(objs);
        }
        console.log(obj)
        that.setData({
          yb: obj
        })
      }
    })
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