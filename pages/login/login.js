// pages/login/login.js
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
  getUserInfo: function (e) {
    var that = this;
    // console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    console.log(app.globalData.userInfo)
    wx.authorize({
      scope: 'scope.userInfo',
      success() {
        wx.getUserInfo({
          success: function (res) {
            console.log(res);
            // 登陆
            wx.login({
              success: res => {
                console.log(res.code)
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                var code = res.code;
                wx.request({
                  url: app.InterfaceUrl + 'H5_login_wx?js_code=' + code,
                  data: {},
                  method: 'GET',
                  header: { 'content-type': 'application/json' },
                  success: function (res) {
                    console.log(res);
                    var openid = res.data.openid;
                    var session_key = res.data.session_key;
                    var unionid = res.data.unionid;
                    wx.request({
                      url: app.InterfaceUrl + 'wechat_login',
                      data: {
                        wechat_open_id: unionid
                      },
                      method: 'GET',
                      success: function (res) {
                        console.log(res);
                        if (res.data.msg == '请完善信息') {
                          wx.redirectTo({
                            url: '../verifyPhone/verifyPhone',
                          })
                        } else {
                          wx.switchTab({
                            url: '/pages/index/index',
                          })
                        }
                      }
                    })
                  },
                  fail: function (error) {
                    console.log(error)
                  }
                })
              }
            });
          }
        })
      }
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