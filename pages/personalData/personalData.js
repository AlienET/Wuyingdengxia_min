// pages/personalData/personalData.js
var RSA = require('../../utils/wx_rsa.js');
//获取应用实例
const app = getApp()
// 
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 当前用户id
    userid: '',
    // 出生年月
    date: '',
    // 性别
    sex: ['男', '女'],
    index: 0,
    // 城市
    region: ['北京市', '北京市', '东城区'],
    customItem: '全部',
    // 头像 ＵＲＬ
    tempFilePaths: '',
    // 昵称
    username: '李鲫鱼',
    aboutData: []
  },
  // 医护认证 
  AuthenticationTap: function() {
    wx.navigateTo({
      url: '../Authentication1/Authentication1',
    })
  },
  // 用户昵称
  blurNC: function(e) {
    var that = this;
    that.setData({
      username: e.detail.value
    })
  },
  // 出生年月
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  // 性别
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  // 城市
  bindRegionChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  // 更换头像
  BindImage: function() {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        console.log(res.tempFilePaths)
        var data = res.tempFilePaths[0];
        var suffix = data.lastIndexOf(".");
        suffix = data.substring(suffix + 1, data.length); //后缀名
        console.log(suffix)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        wx.uploadFile({
          url: app.InterfaceUrl + 'usermanage/uploadFile?suffix=' + suffix + '&type=0', //仅为示例，非真实的接口地址
          filePath: res.tempFilePaths[0],
          name: 'file',
          header: {
            'content-type': 'multipart/form-data'
          },
          formData: {
            'data': res.tempFilePaths[0]
          },
          success: function(res) {
            console.log(res);
            var imgUrl = JSON.parse(res.data).data.complete_url
            console.log(imgUrl)
            var obj = new Object();
            obj.userid = app.userData.userid;
            obj.head_img = imgUrl;
            obj.user_name = '';
            obj.usersex = '';
            obj.user_birthday = '';
            obj.usercity = '';
            obj.realName = '';
            obj.userhospital = '';
            obj.useroffice = '';
            obj.userpost = '';
            obj.userposition = '';
            obj.useridcard = '';
            obj.special_committee = '';
            obj.user_identity = '';
            obj = JSON.stringify(obj); // 转JSON字符串
            var data = RSA.sign(obj);
            wx.request({
              url: app.InterfaceUrl + 'usermanage/editUserInfo',
              data: {
                data: data
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              method: 'POST',
              success: function(res) {
                console.log(res);
                app.userData.headimg = imgUrl;
              },
              fail: function(error) {
                console.log(error)
              }
            })

            that.setData({
              'aboutData.headimg': imgUrl
            })
          }
        })

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;

    if (app.userData.user_identity == 1) {
      app.userData.userPosition = '主任委员'
    } else if (app.userData.user_identity == 2) {
      app.userData.userPosition = '副主任委员'
    } else if (app.userData.user_identity == 3) {
      app.userData.userPosition = '常务副主任委员'
    } else if (app.userData.user_identity == 4) {
      app.userData.userPosition = '秘书'
    } else if (app.userData.user_identity == 5) {
      app.userData.userPosition = '青年委员'
    } else if (app.userData.user_identity == 6) {
      app.userData.userPosition = '委员'
    } else if (app.userData.user_identity == 7) {
      app.userData.userPosition = '普通'
    } else {
      app.userData.userPosition = '行业专家'
    }
    if (app.userData.usersex == '男') {
      that.setData({
        aboutData: app.userData,
        index: 0
      })
    } else {
      that.setData({
        aboutData: app.userData,
        index: 1,
      })
    }
    that.setData({
      username: app.userData.username
    })
    console.log(that.data.aboutData)
    // 当前日期
    var date = util.formatTime(new Date);
    that.setData({
      date: date
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    var that = this;
    var data = new Object();
    data.userid = app.userData.userid;
    data.head_img = '';
    data.user_name = that.data.username;
    data.usersex = that.data.sex[that.data.index];
    data.user_birthday = that.data.date;
    data.usercity = that.data.region[1];
    data.realName = '';
    data.userhospital = '';
    data.useroffice = '';
    data.userpost = '';
    data.userposition = '';
    data.useridcard = '';
    data.special_committee = '';
    data.user_identity = '';
    data = JSON.stringify(data); // 转JSON字符串
    var data = RSA.sign(data);
    // post_change_myinfo
    wx.request({
      url: app.InterfaceUrl + 'usermanage/editUserInfo',
      data: {
        data: data
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function(res) {
        console.log(res);
      },
      fail: function(error) {
        console.log(error)
      }
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    var that = this;
    var data = new Object();
    data.userid = app.userData.userid;
    data.head_img = '';
    data.user_name = that.data.username;
    data.usersex = that.data.sex[that.data.index];
    data.user_birthday = that.data.date;
    data.usercity = that.data.region[1];
    data.realName = '';
    data.userhospital = '';
    data.useroffice = '';
    data.userpost = '';
    data.userposition = '';
    data.useridcard = '';
    data.special_committee = '';
    data.user_identity = '';
    data = JSON.stringify(data); // 转JSON字符串
    var data = RSA.sign(data);
    // post_change_myinfo
    wx.request({
      url: app.InterfaceUrl + 'usermanage/editUserInfo',
      data: {
        data: data
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function(res) {
        console.log(res);
      },
      fail: function(error) {
        console.log(error)
      }
    })
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