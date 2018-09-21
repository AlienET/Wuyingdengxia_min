// pages/juhe/juhe.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cs:[],
    w:''
  },
  oncstap:function(e){
    var that =this;
    app.staName = e.currentTarget.dataset.name;
    app.j = that.data.w
    console.log(app.staName)
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this;
    that.setData({w:options.w})
    var dz = ''
    if (options.w == '0' || options.w == '1' || options.w == '4' || options.w == '5'){
      dz = 'https://apis.juhe.cn/train/station.list.php?key=ba31b08d5a33f101ba2193f2daaf3492'
    } else if (options.w == '2' || options.w == '3' || options.w == '6' || options.w == '7'){
      dz = 'https://apis.juhe.cn/train/s2swithprice?start=' + options.start + '&end=' + options.end + '&date=' + options.date +'&key=ba31b08d5a33f101ba2193f2daaf3492'
    }
    wx.request({
      url: dz,
      success:function(res){
        console.log(res)
        that.setData({cs:res.data.result})
        console.log(that.data.cs)
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