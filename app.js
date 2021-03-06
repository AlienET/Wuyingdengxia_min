//app.js
var RSA = require('utils/wx_rsa.js');
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that = this;

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
              console.log(res)
              this.globalData.userInfo = res.userInfo;
              // 登录
              wx.login({
                success: res => {
                  console.log(res.code)
                  // 发送 res.code 到后台换取 openId, sessionKey, unionId
                  that.wx_code = res.code;
                  var code = res.code;
                  // var that = this;
                  var obj = new Object();
                  obj.js_code = code;
                  obj = JSON.stringify(obj); // 转JSON字符串
                  var data = RSA.sign(obj);
                  wx.request({
                    url: that.InterfaceUrl+'usermanage/smallAppsWxLogin',
                    // url:'http://39.106.49.2:8081/usermanage/smallAppsWxLogin',
                    data: {
                      data: data
                    },
                    method: 'POST',
                    header: {
                      'content-type': 'application/x-www-form-urlencoded'
                    },
                    success: function(res) {
                      console.log(res);
                      that.mini_openid = res.data.data.we_chat_id;
                      if (res.data.msg == '请完善信息') {
                        console.log(res.data.msg);
                        // that.mini_openid = res.data.data.mini_openid;
                        wx.redirectTo({
                          url: '/pages/verifyPhone/verifyPhone',
                        })
                      } else {
                        that.userData = res.data.data
                        console.log(that.userData)
                      }
                    },
                    fail: function(error) {
                      console.log(error)
                    }
                  })
                }
              })

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
    // 更新
    const updateManager = wx.getUpdateManager()

    updateManager.onCheckForUpdate(function(res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)
    })

    updateManager.onUpdateReady(function() {
      // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
      updateManager.applyUpdate()

    })
    updateManager.onUpdateFailed(function() {
      // 新的版本下载失败
      console.log('失败')
    })
  },
  globalData: {
    userInfo: null
  },



  // 时间戳
  getDateDiff: function(dateTimeStamp) {
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
    } else if (weekC >= 1) {
      result = "" + parseInt(weekC) + "周前";
    } else if (dayC >= 1) {
      result = "" + parseInt(dayC) + "天前";
    } else if (hourC >= 1) {
      result = "" + parseInt(hourC) + "小时前";
    } else if (minC >= 1) {
      result = "" + parseInt(minC) + "分钟前";
    } else {
      result = "刚刚";
    }

    return result;
  },
  // 接口
  InterfaceUrl: 'https://www.wydx.top/',
  // 已授权
  authSetting: false,
  // openid
  mini_openid: null,
  // 用户信息
  userData: null,
  // 标签存储
  labels: '',
  // 火车票站点
  staName: '终点',
  // 始发
  originating: '始发',
  // 火车票站点
  f_staName: '终点',
  // 始发
  f_originating: '始发',
  // 谁
  j: null,
  //banner URl
  bannerUrl: '',
  // 快速问答 得 currentTab 
  QQcurrentTab: 0,
  // Index 的 currentTab
  ADcurrentTab: 0,
  // 认证信息
  rzxx: {
    // 真实姓名
    realName: '',
    // 联系电话
    useridcard: '',
    // 身份证号
    useridcard: '',
    // 专委会
    user_identity: '',
    // 您的身份
    special_committee: '',
    // 医院
    userhospital: '',
    // 科室
    useroffice: '',
    // 职务
    userpost: '',
    //商品详情
    goods:'',
    //回复详情
    replayInner:'',
    //二维码token
    Rcode:'',
    //登陆code
    wx_code:'',
    //报名时选中发票信息
    InvoiceInformation:'',
    //报名时选中的邮寄地址
    MailingAddress:'',
    //报名填写信息
    reservationInformationData:''
  }
})