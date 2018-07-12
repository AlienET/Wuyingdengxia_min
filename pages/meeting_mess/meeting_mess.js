// pages/index//meeting_mess/meeting_mess.js
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
    // 会议资讯 列表
    meetingList:[],
    // 往期回顾
    replayList:[]
  },
  // 搜索页
  onSearchTap: function (e) {
    wx.navigateTo({
      url: '../search/search?userid=' + this.data.userid + '&shui=' + e.currentTarget.dataset.shui
    })
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
  // 往期回顾 详情
  onVideoListTap: function (e) {
    console.log(e.currentTarget.dataset.postid)//replay_id
    wx.navigateTo({
      url: '../pastVideoList/pastVideoList?replay_id=' + e.currentTarget.dataset.postid,
    })
  },
  //  会议咨询详情
  onConferenceDetailsTap: function (e) {
    var that = this;
    wx.navigateTo({
      url: '../ConferenceDetails/ConferenceDetails?meet_id='+e.currentTarget.dataset.postid,
    })

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
    var that = this;
    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
    // 会议资讯列
    wx.request({
      url: app.InterfaceUrl + 'get_allmeeting',
      data:{},
      header: { 'content-type': 'application/json'},
      success:function(res){
        console.log(res.data.data);
        that.setData({ meetingList:res.data.data})
      }
    });
    // 往期回顾列
    wx.request({
      url: app.InterfaceUrl + 'get_allreplay',
      data:{},
      header:{'content-type':'application/json'},
      success:function(res){
        console.log(res.data.data);
        that.setData({replayList:res.data.data})
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