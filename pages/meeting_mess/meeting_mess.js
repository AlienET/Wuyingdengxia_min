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
    replayList:[],
    //高度
    Vheight:''
  },
  // 搜索页
  onSearchTap: function (e) {
    wx.navigateTo({
      url: '../search/search'
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
      url: '../ConferenceDetails/ConferenceDetails?meet_id='+e.currentTarget.dataset.item.meet_id,
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
      url: app.InterfaceUrl+'activitymanage/getAllMeet',
      data:{},
      header: { 'content-type': 'application/x-www-form-urlencoded'},
      method:'POST',
      success:function(res){
        console.log(res.data.data);
        // var meets = []
        // for (var i = res.data.data.length - 1; i >= 0; i--){
        //   meets.push(res.data.data[i])
        // }
        that.setData({ meetingList: res.data.data})
      }
    });
    // 往期回顾列
    wx.request({
      url: app.InterfaceUrl+'activitymanage/getAllHistoryMeet',
      data:{},
      header:{'content-type':'application/json'},
      method:"POST",
      success:function(res){
        console.log(res.data.data);
        that.setData({replayList:res.data.data})
      }
    });
    wx.getSystemInfo({
      success(res) {
        console.log(res.model)
        console.log(res.pixelRatio)
        console.log(res.windowWidth)
        console.log(res.windowHeight)
        console.log(res.language)
        console.log(res.version)
        console.log(res.platform)
        var Vheight = res.windowHeight - 78;
        that.setData({
          Vheight: Vheight
        })
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