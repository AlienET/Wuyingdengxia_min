// pages/ConferenceDetails/ConferenceDetails.js
// 接口URL
const InterfaceUrl = 'http://39.106.2.216/index.php/API/';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 详情数据
    aboutData:[]
  },
  // 报名 预定信息填写
  onEnrollTap:function(){
    wx.navigateTo({
      url:'../reservationInformation/reservationInformation'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options.meet_id)
    // 获取会议详情
    wx.request({
      url: InterfaceUrl + 'get_meeting_byid?meet_id=' + options.meet_id,
      data:{},
      success:function(res){
        console.log(res.data.data);
        that.setData({aboutData:res.data.data});
        console.log(that.data.aboutData);
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