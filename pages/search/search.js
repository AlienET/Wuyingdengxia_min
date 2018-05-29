// pages/index/search/search.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 当前用户
    userid: '',
    // 热门搜索 关键词
    hotWords: [],
    // 搜索历史
    searchHistory: []
  },
  onBackTap: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  // 历史搜索-删除某条
  deleteSome: function (item) {
    var that = this;
    console.log(item.currentTarget.dataset.postid.search_id);
    var delId = item.currentTarget.dataset.postid.search_id

    wx.request({
      url: app.InterfaceUrl + 'clean_searchHistory',
      data: {
        userId: that.data.userid,
        type: 2,
        del_id: item.currentTarget.dataset.postid.search_id
      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: 'POST',
      success: function (res) {
        console.log(res);
      }
    })
  },
  // 清空历史搜索
  deleteall:function(){
    var that =this;
    wx.request({
      url: app.InterfaceUrl + 'clean_searchHistory',
      data:{
        userId: that.data.userid,
        type:1,
        del_id:0
      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method:'POST',
      success:function(res){
        console.log(res);
      }      
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var that = this;
    that.setData({
      userid: options.userid
    }),
      // 热搜关键词
      wx.request({
        url: app.InterfaceUrl + 'get_hotWords',
        data: {},
        header: { 'content-type': 'application/json' },
        success: function (res) {
          console.log(res.data.data);
          that.setData({
            hotWords: res.data.data
          })
        }
      });
    // 获取历史搜索
    wx.request({
      url: app.InterfaceUrl + 'get_searchHistory?userId=' + that.data.userid + '&type=1',
      data: {},
      header: { 'content-type': 'application/json' },
      success: function (res) {
        console.log(res.data.data)
        that.setData({
          searchHistory: res.data.data
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