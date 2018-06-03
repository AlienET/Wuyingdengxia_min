// pages/MyCollection/MyCollection.js
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
    // 收藏文章 列表
    Article: [],
    // 收藏问题 列表
    Question: [],
    // 收藏视频 列表
    Video: []
  },
  // 收藏文章详情
  onArticleDetailTap: function (item) {
    console.log(item.currentTarget.dataset.postid.article_id)
    wx.navigateTo({
      url: '../article_detail/article_detail?userid=10003&articleid=' + item.currentTarget.dataset.postid.article_id,
    })
  },
  // 收藏问答详情
  onProblemDetailsTap: function (item) {
    console.log(item.currentTarget.dataset.quesid.question_id);
    wx.navigateTo({
      url: '../problemDetails/problemDetails?userid=10003&quesid=' + item.currentTarget.dataset.quesid.question_id,
    })
  },
  // 收藏视频详情
  onPastVideoTap:function(videoid){
    wx.navigateTo({
      url: '../pastVideo/pastVideo?userid=10003&replay_sub_id=' + videoid.currentTarget.dataset.postid,
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
      url: '../ConferenceDetails/ConferenceDetails?meet_id=' + e.currentTarget.dataset.postid,
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
    // 我的收藏
    wx.request({
      url: app.InterfaceUrl + 'get_mycollection?userid=10003',
      data: {},
      header: { 'content-type': 'application/json' },
      success: function (res) {
        console.log(res.data.data);
        that.setData({
          Article: res.data.data.article,
          Question: res.data.data.question,
          Video: res.data.data.video
        })
      }
    });
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