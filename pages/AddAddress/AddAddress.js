// pages/AddAddress/AddAddress.js
var RSA = require('../../utils/wx_rsa.js');
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 城市
    region: ['北京市', '北京市', '东城区'],
    // customItem: '全部',
    //收件人
    name: '',
    //手机号
    phone: '',
    //详细信息
    information: '',
    //修改/添加
    or: false,
    //地址id
    rId: ''
  },
  //收件人
  bindNameInput: function(e) {
    var that = this;
    console.log(e.detail.value)
    that.setData({
      name: e.detail.value
    })
  },
  // 城市
  bindRegionChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  // 手机
  bindPhoneInput: function(e) {
    var that = this;
    console.log(e.detail.value)
    that.setData({
      phone: e.detail.value
    })
  },
  // 详细信息
  bindInformationInput: function(e) {
    var that = this;
    console.log(e.detail.value)
    that.setData({
      information: e.detail.value
    })
  },
  //保存信息
  PreservationTap: function() {
    var that = this;
    if (that.data.name != '' && that.data.phone != '' && that.data.information != '') {
      if (that.data.or) {
        var data = new Object();
        data.mail_id = that.data.rId;
        data.mail_address = that.data.region + '-' + that.data.information;
        data.mail_phone = that.data.phone;
        data.mail_name = that.data.name;
        data = JSON.stringify(data);
        var data = RSA.sign(data);
        wx.request({
          url: 'http://39.106.49.2:8081/usermanage/editUserMailInfo',
          data: {
            data: data
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            console.log(res);
            wx.showToast({
              title: '操作成功',
              icon: 'success',
              duration: 1500,
              success: function () {
                wx.navigateBack({
                  delta: 1
                })
              }
            })
          }
        });
      } else {
        var data = new Object();
        data.user_id = app.userData.userid;
        data.mail_address = that.data.region + '-' + that.data.information;
        data.mail_phone = that.data.phone;
        data.mail_name = that.data.name;
        data = JSON.stringify(data); // 转JSON字符串
        var data = RSA.sign(data);
        wx.request({
          url: 'http://39.106.49.2:8081/usermanage/addUserMailInfo',
          data: {
            data: data
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function(res) {
            console.log(res);
            wx.showToast({
              title: '操作成功',
              icon: 'success',
              duration: 1500,
              success: function() {
                wx.navigateBack({
                  delta: 1
                })
              }
            })
          }
        });
      }
    } else {
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
    console.log(options);
    var that = this;
    var arrays = options.mail_address.split('-');
    that.setData({
      name: options.mail_name,
      phone: options.mail_phone,
      region: arrays[0],
      information: arrays[1],
      rId: options.mail_id,
      or: true
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