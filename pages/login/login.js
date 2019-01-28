// pages/login/login.js
var RSA = require('../../utils/wx_rsa.js');
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // getUserInfo: function (e) {
  //   console.log(e.detail.errMsg)
  //   console.log(e.detail.userInfo)
  //   console.log(e.detail.rawData)
  // },
  getUserInfo: function(e) {
    var that = this;
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    console.log(app.globalData.userInfo)
    // wx.authorize({
    //   scope: 'scope.userInfo',
    //   success() {
        wx.getUserInfo({
          success: function(res) {
            console.log(res);
            // 登陆
            wx.login({
              success: res => {
                console.log(res.code)
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                var code = res.code;
                var that = this;
                var obj = new Object();
                obj.js_code = code;
                obj = JSON.stringify(obj); // 转JSON字符串
                var data = RSA.sign(obj);
                wx.showLoading({
                  title: '',
                  success: function(res) {
                    wx.request({
                      // url: app.InterfaceUrl + 'usermanage/smallAppsWxLogin',
                      url: 'http://39.106.49.2:8081/usermanage/smallAppsWxLogin',
                      data: {
                        data: data
                      },
                      method: 'POST',
                      header: {
                        'content-type': 'application/x-www-form-urlencoded'
                      },
                      success: function(res) {
                        console.log(res)
                        if (res.data.msg == '请完善信息') {
                          app.mini_openid = res.data.data.mini_openid;
                          wx.redirectTo({
                            url: '/pages/verifyPhone/verifyPhone',
                          })
                        } else {
                          app.userData = res.data.data;
                          console.log(app.userData)
                          wx.switchTab({
                            url: '/pages/index/index',
                          })
                        }
                      },
                      fail: function(error) {
                        console.log(error)
                      }
                    })
                  }
                })

              }
            });
          }
        })
      // }
    // })
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