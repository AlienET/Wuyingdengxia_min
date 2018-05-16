//index.js
//获取应用实例
const app = getApp()
// 接口URL
const InterfaceUrl = 'http://39.106.2.216/index.php/API/'
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // ------------------------------------------------------------------------------------
    // 所有swiper内容告诉
    swiperInnerHeight:[],
    // 首页轮播banner图
    bannerList: [],
    // 首页标签列
    labellist: [],
    // 当前用户id
    userid: '1',
    // 正在讨论列
    discusslist: [],
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: '',
    // tab切换的当前key_id
    tabActiveKeyId: []

  },
  //事件处理函数

  // 搜索页
  onSearchTap: function () {
    wx.navigateTo({
      url: '../search/search'
    })
  },

  // 文章详情页
  onArticleDetailTap: function (item) {
    wx.navigateTo({
      url: '../article_detail/article_detail?articleid=' + item.currentTarget.dataset.postid.article_id
    });
    console.log(item.currentTarget.dataset.postid.article_id)
  },
  // 讨论详情
  onDiscussDetailsTap: function (event) {
    console.log(event.currentTarget.dataset.postid.key_dis_id);
    wx.navigateTo({
      url: '../discuss_details/discuss_details?key_dis_id=' + event.currentTarget.dataset.postid.key_dis_id,
    })

  },
  // 文章投稿
  onContributeTap: function () {
    wx.navigateTo({
      url: '../article_contribute/article_contribute',
    })
  },
  // 我的导航编辑
  onNavEditTap: function () {
    wx.navigateTo({
      url: '../myNavEdit/myNavEdit',
    })
  },
  // 活动页
  // onActionTap:function(){
  //   wx.navigateTo({
  //     url:'../meeting_mess/meeting_mess'
  //   })
  // },
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // 点击banner
  onBannerImgTap: function (event) {
    console.log(event.currentTarget.dataset.postid)
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
        url: InterfaceUrl + 'get_article_bylabel?label=' + that.data.labellist[e.target.dataset.current].key_name + '&sortby=1',
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
      url: InterfaceUrl + 'get_article_bylabel?label=' + that.data.labellist[e.detail.current].key_name + '&sortby=1',
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

  onLoad: function () {
    var that = this;
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
    // banner图
    wx.request({
      url: InterfaceUrl + 'get_allbanner', //仅为示例，并非真实的接口地址
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          bannerList: res.data.data,
        });
        console.log('banner图');
        console.log(that.data.bannerList);
      }
    });
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
          url: InterfaceUrl + 'get_article_bylabel?label=' + initActive + '&sortby=1',
          data: {},
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            that.setData({
              tabActiveKeyId: res.data.data,
            });
            console.log('文章列');
            console.log(that.data.tabActiveKeyId);
          }
        });
        console.log('标签列');
        console.log(that.data.labellist);
      }
    });
    // 正在讨论列
    wx.request({
      url: InterfaceUrl + 'get_hot_labelList?key_id=6', //仅为示例，并非真实的接口地址
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          discusslist: res.data.data,
        });
        console.log('正在讨论列');
        console.log(that.data.discusslist);
      }
    });
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

    // // 文章列\
    // wx.request({
    //   url: InterfaceUrl + 'get_article_bylabel?label=' + this.data.labellist[0].key_name + '&sortby=1',
    //   data: {},
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success: function (res) {
    //     console.log(that.data.labellist[0].key_name)
    //     that.setData({
    //       tabActiveKeyId: res.data.data,
    //     });
    //     console.log('文章列');
    //     console.log(that.data.tabActiveKeyId);
    //   }
    // })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  // getUserInfo: function(e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // }
})
