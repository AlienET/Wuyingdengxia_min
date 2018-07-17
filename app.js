//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that = this;
    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var code = res.code;
        var that = this;
        wx.request({
          url: that.InterfaceUrl + 'H5_login_wx?js_code=' + code,
          data: {},
          method: 'GET',
          header: { 'content-type': 'application/json' },
          success: function (res) {
            console.log(res);
            var openid = res.data.openid;
            var session_key = res.data.session_key;
            var unionid = res.data.unionid;
            console.log(unionid)
            that.wechat_open_id = unionid;
            wx.request({
              url: that.InterfaceUrl + 'wechat_login',
              data: {
                wechat_open_id: unionid
              },
              method: 'GET',
              success: function (res) {
                console.log(res)
                if (that.authSetting && res.data.msg == '请完善信息') {
                  console.log(res.data.msg)
                  wx.redirectTo({
                    url: '/pages/verifyPhone/verifyPhone',
                  })
                }else{
                  that.userData = res.data.data
                  console.log(that.userData)
                }
              }
            })
          },
          fail: function (error) {
            console.log(error)
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        that.authSetting = res.authSetting['scope.userInfo']
        if (res.authSetting['scope.userInfo']) {
          console.log('获取用户信息 - 已授权')
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              console.log(res.userInfo)
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          console.log('获取用户信息 - 未授权')
          wx.redirectTo({
            url: '/pages/login/login',
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  },



  // 时间戳
  getDateDiff: function (dateTimeStamp) {
    var result;
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var halfamonth = day * 15;
    var month = day * 30;
    var now = new Date().getTime();
    var diffValue = now - dateTimeStamp;
    if (diffValue < 0) {
      result = "刚刚";
    }
    var monthC = diffValue / month;
    var weekC = diffValue / (7 * day);
    var dayC = diffValue / day;
    var hourC = diffValue / hour;
    var minC = diffValue / minute;
    if (monthC >= 1) {
      if (monthC <= 12)
        result = "" + parseInt(monthC) + "月前";
      else {
        result = "" + parseInt(monthC / 12) + "年前";
      }
    }
    else if (weekC >= 1) {
      result = "" + parseInt(weekC) + "周前";
    }
    else if (dayC >= 1) {
      result = "" + parseInt(dayC) + "天前";
    }
    else if (hourC >= 1) {
      result = "" + parseInt(hourC) + "小时前";
    }
    else if (minC >= 1) {
      result = "" + parseInt(minC) + "分钟前";
    } else {
      result = "刚刚";
    }

    return result;
  },
  // 接口
  InterfaceUrl: 'https://yszg.org/index.php/API/',
  // 已授权
  authSetting: false,
  // openid
  wechat_open_id: null,
  // 用户信息
  userData:null,
  // 标签存储
  labels:'',
  // 火车票站点
  staName:'终点',
  // 始发
  originating:'始发',
  // 谁
  j:null,
  //banner URl
  bannerUrl:''
})