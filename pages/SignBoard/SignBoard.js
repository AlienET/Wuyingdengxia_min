// pages/SignBoard/SignBoard.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 背景图片
    bGmode: 'widthFix',
    // 兑换礼物列
    goods:[]
  },
  // 兑换礼物详情
  ongiftDetailsTap:function(){
    wx.navigateTo({
      url: '../giftDetails/giftDetails',
    })
  },
  // 签到领币
  onSignTap:function(){
    wx.request({
      url: app.InterfaceUrl + 'post_sign',
      data:{
        userid:'10003',
        type:1,
        toid:0
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success:function(res){
        console.log(res);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 兑换礼物列表
    wx.request({
      url: app.InterfaceUrl + 'get_allgoods',
      data:{},
      success:function(res){
        console.log(res.data.data)
        that.setData({goods:res.data.data})
      }
    })
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