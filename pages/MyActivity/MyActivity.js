// pages/MyActivity/MyActivity.js
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
    NotBeginning:[],
    // 已结束
    Finished:[]
  },
  // 点击切换
  onBackTap: function (e) {
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
  bindChange: function (e) {

    var that = this;
    that.setData({ flag: e.detail.current });

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this;
    wx.request({
      url: app.InterfaceUrl + 'get_mymetting?userid=10003',
      data: {},
      header: { 'content-type': 'application/json' },
      success: function (res) {
        console.log(res.data.data);
        for(var i = res.data.data.length-1;i>=0;i--){
          if (res.data.data[i].isfinish == '1'){
            that.data.Finished.unshift(res.data.data[i]);
            that.setData({ Finished: that.data.Finished})
          }else{
            that.data.NotBeginning.unshift(res.data.data[i])
            that.setData({ NotBeginning: that.data.NotBeginning })
          }
        }
        console.log(that.data.NotBeginning)
        console.log(that.data.Finished)
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