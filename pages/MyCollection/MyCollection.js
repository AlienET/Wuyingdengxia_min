// pages/MyCollection/MyCollection.js
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
      url: '../article_detail/article_detail?articleid=' + item.currentTarget.dataset.postid.article_id,
    })
  },
  // 收藏问答详情
  onProblemDetailsTap: function (item) {
    console.log(item.currentTarget.dataset.quesid.question_id);
    wx.navigateTo({
      url: '../problemDetails/problemDetails?quesid=' + item.currentTarget.dataset.quesid.question_id,
    })
  },
  // 收藏视频详情
  onPastVideoTap:function(videoid){
    wx.navigateTo({
      url: '../pastVideo/pastVideo?replay_sub_id=' + videoid.currentTarget.dataset.postid,
    })
  },
  // 点击切换
  onBackTap: function (e) {
    var that = this;
    console.log(e.target.dataset.current)
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
    console.log(e.detail.current)
    var that = this;
    that.setData({ flag: e.detail.current });
    if (e.detail.current == 1){
      // 我的收藏(问答)
      var data = new Object();
      data.userid = app.userData.userid;
      data = JSON.stringify(data); // 转JSON字符串
      var data = RSA.sign(data);
      wx.request({
        url: app.InterfaceUrl+'usermanage/myCollectionQuestion',
        data: {
          data: data
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res);
          that.setData({
            // Article: res.data.data,
            Question: res.data.data,
            // Video: res.data.data
          })
        }
      });
    } else if (e.detail.current == 2){
      // 我的收藏(问答)
      var data = new Object();
      data.userid = app.userData.userid;
      data = JSON.stringify(data); // 转JSON字符串
      var data = RSA.sign(data);
      wx.request({
        url: app.InterfaceUrl+'usermanage/myCollectionReplay',
        data: {
          data: data
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res);
          that.setData({
            // Article: res.data.data,
            // Question: res.data.data,
            Video: res.data.data
          })
        }
      });
    }
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
    // 我的收藏(文章)
    var data = new Object();
    data.userid = app.userData.userid;
    data = JSON.stringify(data); // 转JSON字符串
    var data = RSA.sign(data);
    wx.request({
      url: app.InterfaceUrl+'usermanage/myCollectionArticle',
      data: {
        data: data
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        that.setData({
          Article: res.data.data,
          // Question: res.data.data.question,
          // Video: res.data.data.video
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