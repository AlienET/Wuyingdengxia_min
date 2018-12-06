// pages/giftDetails/giftDetails.js
var RSA = require('../../utils/wx_rsa.js');
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // banner图片
    bGmode: 'widthFix',
    val: 1,
    // 兑换礼物详情
    goods: []
  },
  // 数量 减
  SubtractValue: function(e) {
    const that = this;
    this.setData({
      val: that.data.val == 1 ? that.data.val : that.data.val - 1
    })
  },
  // 数量 加
  AddValue: function() {
    const that = this;
    this.setData({
      val: that.data.val + 1
    })
  },
  // 确认兑换
  onShowModalTap: function() {
    var that = this;
    if (parseInt(that.data.goods.moon_cash) > parseInt(app.userData.moon_cash)) {
      wx.showToast({
        title: '您的月亮币不足',
        icon: 'none',
        duration: 1500
      })
    } else {
      wx.showModal({
        title: '确定使用' + this.data.goods.moon_cash + '月亮币兑换？',
        cancelColor: '#979797',
        confirmColor: '#1397FF',
        success: function(res) {
          if (res.confirm) {
            var data = new Object();
            data.user_id = app.userData.userid;
            data.goods_id = that.data.goods.goods_id;
            data.moon_cash = that.data.goods.moon_cash;
            data = JSON.stringify(data); // 转JSON字符串
            var data = RSA.sign(data);
            wx.request({
              url: app.InterfaceUrl + 'usermanage/exchangeGoods',
              data: {
                data: data
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              method: 'POST',
              success: function(res) {
                console.log(res)
                console.log(res.data.data)
                if (res.data.code == 0) {
                  wx.showToast({
                    title: res.data.msg,
                    icon: 'none',
                    duration: 1500
                  })
                } else {
                  app.userData.moon_cash = app.userData.moon_cash - that.data.goods.moon_cash;
                  wx.navigateTo({
                    url: '../ForSuccessful/ForSuccessful',
                  })
                }
              },
              fail: function(error) {
                console.log(error);
              }
            })

          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.setData({
      goods: app.goods
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