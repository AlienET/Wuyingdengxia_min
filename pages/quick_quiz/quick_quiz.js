// pages/wishingWell/wishingWell.js
// 接口URL
const InterfaceUrl = 'http://39.106.2.216/index.php/API/'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 所有swiper内容告诉
    swiperInnerHeight: [],
    // 首页标签列
    labellist: [],
    // 当前用户id
    userid: '10003',
    // 正在讨论列
    discusslist: [],
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: '',
    // tab切换的当前key_id
    tabActiveKeyId: []
  },
  /** 
 * 点击tab切换 
 */
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      });
      // 文章列
      wx.request({
        url: InterfaceUrl + 'get_question_bylabel?label=' + that.data.labellist[e.target.dataset.current].key_name,
        data: {},
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          that.setData({
            tabActiveKeyId: res.data.data,
          });
        }
      });
      console.log(this.data.labellist[e.target.dataset.current].key_name);
    }
  },
  /** 
     * 滑动切换tab 
     */
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });
    // 文章列
    wx.request({
      url: InterfaceUrl + 'get_question_bylabel?label=' + that.data.labellist[e.detail.current].key_name ,
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(e);
        that.setData({
          tabActiveKeyId: res.data.data,
        });
      }
    });
  },
  // 我的导航编辑
  onNavEditTap: function () {
    wx.navigateTo({
      url: '../myNavEdit/myNavEdit',
    })
  },
  // 提问
  onQuizTap: function () {
    wx.navigateTo({
      url: '../QAquiz_tit/QAquiz_tit',
    })
  },

  // 问题详情
  onProblemDetailsTap: function () {
    wx.navigateTo({
      url: '../problemDetails/problemDetails',
    })
  },
  //搜索
  onSearchTap: function () {
    wx.navigateTo({
      url: '../search/search',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this;
    // 标签列表
    wx.request({
      url: InterfaceUrl + 'get_labelList?user_id' + this.data.userid + '&type=1', //仅为示例，并非真实的接口地址
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          labellist: res.data.data,
          currentTab: 0
        });
        var initActive = that.data.labellist[0].key_name;
        console.log(initActive)
        // 文章列
        wx.request({
          url: InterfaceUrl + 'get_question_bylabel?label=' + initActive,
          data: {},
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            that.setData({
              tabActiveKeyId: res.data.data,
            });
            console.log(that.data.tabActiveKeyId)
          }
        });
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