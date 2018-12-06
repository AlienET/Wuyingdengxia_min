// pages/MyActivity/MyActivity.js
var RSA = require('../../utils/wx_rsa.js');
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /** 
     * 页面配置 
     */
    winWidth: 0,
    winHeight: 0,
    // tab切换
    flag: 0,
    // 未开始
    NotBeginning: [],
    // 已结束
    Finished: []
  },
  // 点击切换
  onBackTap: function(e) {
    var that = this;

    if (this.data.flag === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        flag: e.target.dataset.current
      })
    }
  },
  /** 
   * 滑动切换tab 
   */
  bindChange: function(e) {

    var that = this;
    that.setData({
      flag: e.detail.current
    });

  },
  onweikaishi: function(e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../MyConferenceDetails/MyConferenceDetails?meet_id=' + e.currentTarget.dataset.id.meet_id + '&is_check=' + e.currentTarget.dataset.id.is_check + '&sr=1&userid=' + app.userData.userid,
    })
  },
  //会议详情
  hyxq: function(e) {
    var that = this;
    wx.navigateTo({
      url: '../ConferenceDetails/ConferenceDetails?meet_id=' + e.currentTarget.dataset.id.meet_id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // var that = this;
    // var data = new Object();
    // data.userid = app.userData.userid;
    // data = JSON.stringify(data); // 转JSON字符串
    // var data = RSA.sign(data);
    // wx.request({
    //   url: app.InterfaceUrl+'usermanage/myMeet',
    //   data: {
    //     data: data
    //   },
    //   method: 'POST',
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded'
    //   },
    //   success: function(res) {
    //     console.log(res);
    //     if (res.data.msg != '无会议信息') {
    //       for (var i = res.data.data.length - 1; i >= 0; i--) {
    //         if (res.data.data[i].isfinish == '1') {
    //           that.data.Finished.unshift(res.data.data[i]);
    //         } else {
    //           that.data.NotBeginning.unshift(res.data.data[i])
    //         }
    //       }
    //     }
    //     that.setData({
    //       NotBeginning: that.data.NotBeginning,
    //       Finished: that.data.Finished
    //     })
    //     console.log(that.data.NotBeginning)
    //     console.log(that.data.Finished)
    //   }
    // })
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
    data = JSON.stringify(data); // 转JSON字符串
    var data = RSA.sign(data);
    wx.request({
      url: app.InterfaceUrl+'usermanage/myMeet',
      data: {
        data: data
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log(res);
        if (res.data.msg != '无会议信息') {
          that.setData({
            NotBeginning: [],
            Finished: []
          });
          for (var i = res.data.data.length - 1; i >= 0; i--) {
            if (res.data.data[i].isfinish == '1') {
              that.data.Finished.unshift(res.data.data[i]);
            } else {
              that.data.NotBeginning.unshift(res.data.data[i])
            }
          }
        }
        that.setData({
          NotBeginning: that.data.NotBeginning,
          Finished: that.data.Finished
        })
        console.log(that.data.NotBeginning)
        console.log(that.data.Finished)
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