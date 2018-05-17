// pages/discuss_details/discuss_details.js
// 接口URL
const InterfaceUrl = 'http://39.106.2.216/index.php/API/';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //讨论详情 接口数据
    aboutData: [], //建一个空数组，用来保存调用接口获取的数据
    // 讨论列 接口数据
    DiscussListsData: []
  },
  // 点赞
  like:function(index){
    var that = this;
    console.log(index.currentTarget.dataset.postid)
    var supportNum = 'DiscussListsData['+index.currentTarget.dataset.postid+'].support_num';
    var addNum = parseInt(that.data.DiscussListsData[index.currentTarget.dataset.postid].support_num)+1;
    that.setData({
      [supportNum]: [addNum]
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options.key_dis_id);
    // get_hot_labelList_detail
    wx.request({
      url: InterfaceUrl + 'get_hot_labelList_detail?key_dis_id=' + options.key_dis_id,
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data.data);
        that.setData({
          aboutData: res.data.data,
          DiscussListsData: res.data.data.user_dis
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (options) {
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