// pages/makeVow/makeVow.js
var RSA = require('../../utils/wx_rsa.js');
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 当前月亮币
    currentMoonY: '',
    // 当前月亮币数额
    moonNum: {
      num: '￥',
      active: false
    },
    // 选择悬赏月亮币 [0,10,20,50,100]
    moonY: [{
        num: 5,
        active: false
      },
      {
        num: 10,
        active: false
      },
      {
        num: 20,
        active: false
      },
      {
        num: 50,
        active: false
      },
      {
        num: 100,
        active: false
      }
    ],
    // 选取月亮币状态
    isMoon: false,
    //文本
    text: ''
  },
  // 提交
  onMakeVowBtnTap: function() {
    var that = this;
    console.log(that.data.moonNum.num)

    if (that.data.moonNum.num != '￥' && that.data.text != '') {
      var data = new Object();
      data.userid = app.userData.userid;
      data.content = that.data.text;
      data.cash = that.data.moonNum.num.toString();
      data = JSON.stringify(data); // 转JSON字符串
      var data = RSA.sign(data);
      wx.request({
        url: app.InterfaceUrl + 'usermanage/wishing',
        data: {
          data: data
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function(res) {
          console.log(res)
          wx.navigateTo({
            url: '../makeVowBtn/makeVowBtn',
          })
        },
        fail: function(error) {
          console.log(error)
        }
      })

    } else {
      wx.showToast({
        title: '请完善信息',
        icon: 'none',
        duration: 1500
      })
    }
  },
  // 文本
  textarea: function(e) {
    var that = this;
    console.log(e.detail.value)
    that.setData({
      text: e.detail.value
    })
  },
  // 切换 选取状态
  moonTap: function() {
    var that = this;
    var isMoon = !that.data.isMoon;
    that.setData({
      isMoon: isMoon
    })
  },
  // 选择月亮币
  chooseMoon: function(item, idx) {
    var that = this;
    if (item.currentTarget.dataset.item.num > that.data.currentMoonY) {
      return;
    } else {
      console.log(item.currentTarget.dataset.item);
      console.log(item.currentTarget.dataset.idx);
      var active = 'moonY[' + item.currentTarget.dataset.idx + '].active';
      var num = that.data.moonY[item.currentTarget.dataset.idx].num;
      for (var i = that.data.moonY.length - 1; i >= 0; i--) {
        var defout = 'moonY[' + i + '].active';
        that.setData({
          [defout]: false
        })
      }
      that.setData({
        [active]: true,
        'moonNum.num': num,
        'moonNum.active': true,
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.setData({
      currentMoonY: app.userData.moon_cash
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