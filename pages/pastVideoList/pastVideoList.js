// pages/pastVideoList/pastVideoList.js
// 接口URL
const InterfaceUrl = 'http://39.106.2.216/index.php/API/'
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  // 往期视频详情页
  onPastVideoTap:function(){
    wx.navigateTo({
      url: '../pastVideo/pastVideo',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var replay_id = options.replay_id;
    wx.request({
      url: InterfaceUrl + 'get_allsub_replay?replay_id=' + options.replay_id,
      data:{},
      success:function(res){
        console.log(res.data.data)
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