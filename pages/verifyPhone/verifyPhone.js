// pages/verifyPhone/verifyPhone.js
var RSA = require('../../utils/wx_rsa.js');
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    yzm: true,
    phoneNum: null,
    yzmNum: null,
    password: null
  },
  phone: function(e) {
    var that = this;
    if (e.detail.value.length == 11) {
      that.setData({
        phoneNum: e.detail.value
      })
    } else {
      wx.showToast({
        title: '手机号有误',
        icon: 'none',
        duration: 1500
      })
    }
  },
  password: function(e) {
    var that = this;
    that.setData({
      password: e.detail.value
    })
    console.log(that.data.password)
  },
  yzmNum: function(e) {
    var that = this;
    that.setData({
      yzmNum: e.detail.value
    })
  },
  onYzmtap: function() {
    var that = this;
    if (that.data.yzm && that.data.phoneNum != null) {
      // that.setData({yzm:false})
      var obj = new Object();
      obj.userphone = that.data.phoneNum;
      obj = JSON.stringify(obj); // 转JSON字符串
      var data = RSA.sign(obj);
      wx.request({
        url: app.InterfaceUrl + 'usermanage/getVerifyNum',
        data: {
          data: data
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function(res) {
          console.log(res)
          that.setData({
            yzm: false
          })
        },
        fail: function(error) {
          console.log(error)
        }
      })
    }
  },
  imBind: function() {
    var that = this;
    if (that.data.phoneNum && that.data.yzmNum && that.data.password) {

      app.globalData.userInfo.gender == 1 ?
        app.globalData.userInfo.gender = '男' :
        app.globalData.userInfo.gender = '女';
      var obj = new Object();
      obj.userphone = that.data.phoneNum;
      obj.sms_code = that.data.yzmNum;
      obj.nickname = app.globalData.userInfo.nickName;
      obj.headimg = app.globalData.userInfo.avatarUrl;
      obj.sex = app.globalData.userInfo.gender;
      obj.openid = app.mini_openid;
      obj.password = that.data.password;
      obj.from_type = '1';
      obj = JSON.stringify(obj); // 转JSON字符串
      var data = RSA.sign(obj);
      wx.request({
        url: app.InterfaceUrl + 'usermanage/bindUserPhoneNum',
        data: {
          data: data
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function(res) {
          console.log(res)
          if (res.data.code == '1') {
            var data = new Object();
            data.phone_num = that.data.phoneNum;
            data.password = that.data.password;
            data = JSON.stringify(data); // 转JSON字符串
            var data = RSA.sign(data);
            wx.request({
              url: app.InterfaceUrl + 'usermanage/userLoginByPwd',
              data: {
                data: data
              },
              method: 'POST',
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success: function(res) {
                console.log(res)
                app.userData = res.data.data
                console.log(app.userData)
                wx.switchTab({
                  url: '../index/index',
                })
              },
              fail: function(error) {
                console.log(error)
              }
            })
            // wx.request({
            //   url: app.InterfaceUrl+'usermanage/userLoginByPwd',
            //   data: {
            //     mini_openid: app.mini_openid,
            //   },
            //   method: 'GET',
            //   success: function(res) {
            //     console.log(res)
            //     app.userData = res.data.data
            //     console.log(app.userData)
            //     wx.switchTab({
            //       url: '../index/index',
            //     })
            //   },
            // })
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
    } else {
      wx.showToast({
        title: '请完善填写信息内容',
        icon: 'none',
        duration: 1500
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(app.globalData.userInfo)
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