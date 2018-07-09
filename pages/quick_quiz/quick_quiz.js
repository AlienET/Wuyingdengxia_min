// pages/wishingWell/wishingWell.js
//获取应用实例
const app = getApp()
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
        url: app.InterfaceUrl + 'get_question_bylabel?label=' + that.data.labellist[e.target.dataset.current].name,
        data: {},
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res.data.data)
          that.setData({
            tabActiveKeyId: res.data.data,
          });
        }
      });
      console.log(this.data.labellist[e.target.dataset.current].name);
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
      url: app.InterfaceUrl + 'get_question_bylabel?label=' + that.data.labellist[e.detail.current].name,
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
      url: '../myNavEdit/myNavEdit?who=3',
    })
  },
  // 提问
  onQuizTap: function () {
    wx.navigateTo({
      url: '../QAquiz_tit/QAquiz_tit',
    })
  },

  // 问题详情
  onProblemDetailsTap: function (q) {
    console.log(q.currentTarget.dataset.quesid)
    wx.navigateTo({
      url: '../problemDetails/problemDetails?quesid=' + q.currentTarget.dataset.quesid + '&userid=' + app.userData.user_id,
    })
  },
  //搜索
  onSearchTap: function () {
    wx.navigateTo({
      url: '../search/search?userid=' + app.userData.user_id
    })
  },
  // 我的提问
  onMyQuestionTap: function () {
    wx.navigateTo({
      url: '../Myquestion/Myquestion',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 标签列表
    wx.request({
      url: app.InterfaceUrl + 'get_labels?userid' + app.userData.user_id + '&type=3', //仅为示例，并非真实的接口地址
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          labellist: res.data.data,
          currentTab: 0
        });
        var initActive = that.data.labellist[0].name;
        console.log(initActive)
        // 文章列
        wx.request({
          url: app.InterfaceUrl + 'get_question_bylabel?label=' + initActive,
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
    var that = this;
    // 标签列表
    wx.request({
      url: app.InterfaceUrl + 'get_labels?userid=' + app.userData.user_id + '&type=3', //仅为示例，并非真实的接口地址
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        that.setData({
          labellist: res.data.data,
          currentTab: 0
        });
        var initActive = that.data.labellist[0].name;
        console.log(initActive)
        // 文章列
        wx.request({
          url: app.InterfaceUrl + 'get_question_bylabel?label=' + initActive,
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