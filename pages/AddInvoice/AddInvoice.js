// pages/AddInvoice/AddInvoice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //类型
    lx:'GR',
    //姓名
    gr:'',
    //企业抬头
    tt:'',
    //税号
    sh:'',
  },
  //发票类型
  radioChange:function(e){
    console.log(e.detail.value)
    var that = this;
    that.setData({
      lx:e.detail.value
    })
  },
  //个人
  bindGRInput:function(e){
    console.log(e.detail.value)
    var that = this;
    that.setData({
      gr: e.detail.value
    })
  },
  //公司抬头
  bindTTInput:function(e){
    console.log(e.detail.value)
    var that = this;
    that.setData({
      tt: e.detail.value
    })
  },
  //税号
  bindSHInput:function(e){
    console.log(e.detail.value)
    var that = this;
    that.setData({
      sh: e.detail.value
    })
  },
  //保存
  PreservationTap:function(){
    var that = this;
    wx.navigateBack({
      delta: 1
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