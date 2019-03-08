//index.js
//获取应用实例
const app = getApp();
var RSA = require('../../utils/wx_rsa.js');
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // ------------------------------------------------------------------------------------
    // 所有swiper内容告诉
    swiperInnerHeight: [],
    // 首页轮播banner图
    bannerList: [],
    // 首页标签列
    labellist: [],
    // 当前用户id
    userid: '',
    // 正在讨论列
    discusslist: [],
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: '',
    // tab切换的当前key_id
    tabActiveKeyId: [],
    //标签
    LabelName: '热门',
    //标签下文章的页数
    ArticlePage: 1,
    //Load 文章加载
    Load: false,
    BottomLoad: true,
    // -------------------------------
    //新版本
    //切换
    flag: 0,
    //热点内容
    tabActivePopular: '',
    //热点 页数
    ArticlePagePopular: 1
  },
  //事件处理函数

  // 搜索页
  onSearchTap: function() {
    wx.navigateTo({
      url: '../search/search'
    })
  },
  // 文章详情页
  onArticleDetailTap: function(item) {
    wx.navigateTo({
      url: '../article_detail/article_detail?articleid=' + item.currentTarget.dataset.postid.article_id
    });
    // console.log(item.currentTarget.dataset.postid.article_id);
  },
  // 讨论详情
  onDiscussDetailsTap: function(event) {
    wx.navigateTo({
      url: '../discuss_details/discuss_details?key_dis_id=' + event.currentTarget.dataset.postid.key_dis_id + '&type=' + event.currentTarget.dataset.postid.type,
    })

  },
  // 文章投稿
  onContributeTap: function() {
    wx.navigateTo({
      url: '../article_contribute/article_contribute',
    })
  },
  // 我的导航编辑
  onNavEditTap: function() {
    wx.navigateTo({
      url: '../myNavEdit/myNavEdit?&who=1',
    })
  },
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // 点击banner
  onBannerImgTap: function(event) {
    console.log(event.currentTarget.dataset.postid.banner_link)
    var arra = event.currentTarget.dataset.postid.banner_link.split('?');
    if (arra[0] == 'https://www.wydx.top/html5/app/meetingDetails.html') {
      var canshu = arra[1].split('&');
      var canshuname = '';
      var canshuzhi = '';
      for (var i = canshu.length - 1; i >= 0; i--) {
        var canshuArr = canshu[i].split('=');
        if (canshuArr[0] == 'meet_id') {
          console.log(canshuArr)
          wx.navigateTo({
            url: '../ConferenceDetails/ConferenceDetails?meet_id=' + canshuArr[1],
          })
        }
      }
    } else {
      app.bannerUrl = event.currentTarget.dataset.postid.banner_link;
      wx.navigateTo({
        url: '../bannerTo/bannerTo?userid=' + app.userData.userid,
      })
    }
  },
  // 扫一扫
  onRCtap: function() {
    // wx.showToast({
    //   title: '功能开发中敬请期待！',
    //   icon: 'none',
    //   duration: 1500
    // })

    //允许从相机和相册扫码
    wx.scanCode({
      success: (res) => {
        console.log(res)
        console.log(res.result);
        var arr = res.result.split('&');
        console.log(arr)
        var data = new Object();
        data.meet_id = arr[2];
        data.userid = arr[1];
        data.identity = app.userData.userPosition;
        data = JSON.stringify(data); // 转JSON字符串
        var data = RSA.sign(data);
        wx.request({
          url: app.InterfaceUrl + 'activitymanage/getAttendMeet',
          data: {
            data: data
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function(res) {
            console.log(res)
            if (res.data.code == 0) {
              wx.showToast({
                title: res.data.msg,
                icon: 'success',
                duration: 2000
              })
            } else {
              console.log('success');
              //MyConferenceDetails
              wx.showLoading({
                title: '加载中',
                success: function() {
                  wx.navigateTo({
                    url: '../MyConferenceDetails/MyConferenceDetails?meet_id=' + arr[2] + '&is_check=1&sr=0&userid=' + arr[1]
                  })
                }
              })

            }
          },
          fail: function(error) {
            console.log(error)
          }
        })
        // wx.request({
        //   url: 'https://yszg.org/index.php/test/index?user_id=' + app.userData.user_id + '&user_token=' + app.userData.user_token + '&login_token=' + login_token,
        //   success: function (res) {
        //     console.log(res.data.msg)
        //     wx.showToast({
        //       title: res.data.msg,
        //       icon: 'success',
        //       duration: 2000
        //     })
        //   }
        // })
      }
    })
  },
  /** 
   * 点击tab切换
   */
  swichNav: function(e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      });
      // 文章列
      var articleList = new Object();
      articleList.label = that.data.labellist[e.target.dataset.current].name;
      articleList.sortby = '1';
      articleList.page = '1';
      articleList.size = '15';
      Adata = JSON.stringify(articleList); // 转JSON字符串
      var Adata = RSA.sign(Adata);
      wx.request({
        url: app.InterfaceUrl + 'homepagemanage/getArticleByLabel',
        data: {
          data: Adata
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        method: 'POST',
        success: function(res) {
          console.log(res.data.data)
          if (res.data.data.length < 30) {
            for (var i = res.data.data.length - 1; i >= 0; i--) {
              // console.log(res.data.data[i].article_img_path)//split(',');
              if (res.data.data[i].article_img_path == '') {
                res.data.data[i].article_img_path = res.data.data[i].article_img_path
              } else {
                res.data.data[i].article_img_path = res.data.data[i].article_img_path.split(',');
              }
            };
            that.setData({
              tabActiveKeyId: res.data.data,
            });
          } else {
            var arr = [];
            for (var i = 30; i >= 0; i--) {
              // console.log(res.data.data[i].article_img_path)//split(',');
              if (res.data.data[i].article_img_path == '') {
                res.data.data[i].article_img_path = res.data.data[i].article_img_path;
                arr.unshift(res.data.data[i])
              } else {
                res.data.data[i].article_img_path = res.data.data[i].article_img_path.split(',');
                arr.unshift(res.data.data[i])
              }
            };
            that.setData({
              tabActiveKeyId: arr,
            });
          }
          // console.log(res.data.data)

          console.log(that.data.tabActiveKeyId)
        }
      });
      // console.log(this.data.labellist[e.target.dataset.current].key_name);
    }
  },
  /** 
   * 滑动切换tab 
   */
  bindChange: function(e) {
    var that = this;
    console.log(that.data.LabelName)
    that.setData({
      currentTab: e.detail.current
    });
    that.setData({
      LabelName: that.data.labellist[e.detail.current].name,
      ArticlePage: 1
    });
    // 文章列
    var articleList = new Object();
    articleList.label = that.data.labellist[e.detail.current].name;
    articleList.sortby = '1';
    articleList.page = '1';
    articleList.size = '15';
    Adata = JSON.stringify(articleList); // 转JSON字符串
    var Adata = RSA.sign(Adata);
    wx.request({
      url: app.InterfaceUrl + 'homepagemanage/getArticleByLabel',
      data: {
        data: Adata
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: 'POST',
      success: function(res) {
        if (res.data.data.length < 30) {
          for (var i = res.data.data.length - 1; i >= 0; i--) {
            // console.log(res.data.data[i].article_img_path)//split(',');
            if (res.data.data[i].article_img_path == '') {
              res.data.data[i].article_img_path = res.data.data[i].article_img_path
            } else {
              res.data.data[i].article_img_path = res.data.data[i].article_img_path.split(',');
            }
          };
          that.setData({
            tabActiveKeyId: res.data.data,
          });
        } else {
          var arr = [];
          for (var i = 30; i >= 0; i--) {
            // console.log(res.data.data[i].article_img_path)//split(',');
            if (res.data.data[i].article_img_path == '') {
              res.data.data[i].article_img_path = res.data.data[i].article_img_path;
              arr.unshift(res.data.data[i])
            } else {
              res.data.data[i].article_img_path = res.data.data[i].article_img_path.split(',');
              arr.unshift(res.data.data[i])
            }
          };
          that.setData({
            tabActiveKeyId: arr,
          });
        }
      }
    });
  },
  //热点内容下拉加载列表
  loadMoreDataBottom: function() {
    var that = this;
    that.setData({
      Load: true
    });
    if (that.data.Load && that.data.BottomLoad) {
      that.setData({
        BottomLoad: false
      })
      // 文章列
      var page = parseInt(that.data.ArticlePagePopular) + 1;
      var articleList = new Object();
      articleList.label = '热门';
      articleList.sortby = '1';
      articleList.page = page.toString();
      articleList.size = '15';
      Adata = JSON.stringify(articleList); // 转JSON字符串
      var Adata = RSA.sign(Adata);
      wx.request({
        // url: app.InterfaceUrl + 'homepagemanage/getArticleByLabel',
        url: 'http://39.106.49.2:8082/homepagemanage/getArticleByLabel',
        data: {
          data: Adata
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        method: 'POST',
        success: function(res) {
          console.log(res)
          if (res.data.data.length == 0) {
            wx.showToast({
              title: '已没有更多文章...',
              icon: 'none',
              duration: 1500
            })
          } else {
            var data = that.data.tabActivePopular;
            for (var i = res.data.data.length - 1; i >= 0; i--) {
              if (res.data.data[i].article_img_path == '') {
                res.data.data[i].article_img_path = res.data.data[i].article_img_path;
                data.push(res.data.data[i])
              } else {
                res.data.data[i].article_img_path = res.data.data[i].article_img_path.split(',');
                data.push(res.data.data[i])
              }
            };
            var NewData = data.concat(res.data.data);
            that.setData({
              tabActivePopular: NewData,
              Load: false,
              BottomLoad: true,
              ArticlePagePopular: page
            });
            console.log(that.data.ArticlePagePopular)
          }
        }
      });
    }
  },
  //热点专栏文章上拉到底刷新
  loadMoreData: function() {
    console.log('111')
    var that = this;
    that.setData({
      Load: true
    });
    if (that.data.Load && that.data.BottomLoad) {
      that.setData({
        BottomLoad: false
      })
      // 文章列
      var page = parseInt(that.data.ArticlePage) + 1;
      var articleList = new Object();
      articleList.label = that.data.labellist[that.data.currentTab].name;
      articleList.sortby = '1';
      articleList.page = page.toString();
      articleList.size = '15';
      Adata = JSON.stringify(articleList); // 转JSON字符串
      var Adata = RSA.sign(Adata);
      wx.request({
        url: 'http://39.106.49.2:8082/homepagemanage/getArticleByLabel',
        // url: app.InterfaceUrl + 'homepagemanage/getArticleByLabel',
        data: {
          data: Adata
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        method: 'POST',
        success: function(res) {
          console.log(res)
          if (res.data.data.length == 0) {
            wx.showToast({
              title: '已没有更多文章...',
              icon: 'none',
              duration: 1500
            })
          } else {
            var data = that.data.tabActiveKeyId;
            for (var i = res.data.data.length - 1; i >= 0; i--) {
              if (res.data.data[i].article_img_path == '') {
                res.data.data[i].article_img_path = res.data.data[i].article_img_path;
                data.push(res.data.data[i])
              } else {
                res.data.data[i].article_img_path = res.data.data[i].article_img_path.split(',');
                data.push(res.data.data[i])
              }
            };
            var NewData = data.concat(res.data.data);
            that.setData({
              tabActiveKeyId: NewData,
              Load: false,
              BottomLoad: true,
              ArticlePage: page
            });
          }
        }
      });
    }
  },
  //新版本
  // 点击切换
  onTopTabTap: function(e) {
    var that = this;

    if (this.data.flag === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        flag: e.target.dataset.current
      })
    }
  },
  onLoad: function() {
    var that = this;
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        // userid: app.userData.userid
      })
      console.log(app.userData)
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        })
        console.log(app.userData)
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
          })
          console.log(app.userData)
        }
      })
    }
    // banner图
    wx.request({
      url: app.InterfaceUrl + 'homepagemanage/getLooppicture', //仅为示例，并非真实的接口地址
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function(res) {
        console.log(res)
        that.setData({
          bannerList: res.data.data,
        });
        console.log('banner图');
        console.log(that.data.bannerList);
      }
    });
    // 热门话题
    // wx.request({
    //   url: app.InterfaceUrl + 'homepagemanage/getHotTop', //仅为示例，并非真实的接口地址
    //   data: {},
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded' // 默认值
    //   },
    //   method: 'POST',
    //   success: function(res) {
    //     that.setData({
    //       discusslist: res.data.data,
    //     });
    //   }
    // });
    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({
      success: function(res) {
        var winHeight = res.windowHeight - 36;
        console.log(winHeight)
        that.setData({
          winWidth: res.windowWidth,
          winHeight: winHeight
        });
      }

    });
    //热点内容
    var articleList = new Object();
    articleList.label = '热门';
    articleList.sortby = '1';
    articleList.page = '1';
    articleList.size = '15';
    Adata = JSON.stringify(articleList); // 转JSON字符串
    var Adata = RSA.sign(Adata);
    wx.request({
      // url: app.InterfaceUrl + 'homepagemanage/getArticleByLabel',
      url: 'http://39.106.49.2:8082/homepagemanage/getArticleByLabel',
      data: {
        data: Adata
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: 'POST',
      success: function(res) {
        console.log(res.data.data)
        for (var i = res.data.data.length - 1; i >= 0; i--) {
          // console.log(res.data.data[i].article_img_path)//split(',');
          if (res.data.data[i].article_img_path == '') {
            res.data.data[i].article_img_path = res.data.data[i].article_img_path
          } else {
            res.data.data[i].article_img_path = res.data.data[i].article_img_path.split(',');
          }
        };
        that.setData({
          tabActivePopular: res.data.data,
        });

      }
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    // 标签列表
    var labels = new Object();
    labels.userid = app.userData ? app.userData.userid : '';
    labels.type = '1';
    data = JSON.stringify(labels); // 转JSON字符串
    var data = RSA.sign(data);
    wx.request({
      // url: app.InterfaceUrl + 'homepagemanage/getLabels', //仅为示例，并非真实的接口地址
      url: 'http://39.106.49.2:8082/homepagemanage/getLabels',
      data: {
        data: data
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: 'POST',
      success: function(res) {
        console.log(res)
        var arrays = res.data.data.slice(0, 10);
        that.setData({
          labellist: arrays,
          currentTab: app.ADcurrentTab
        });
        var initActive = arrays[app.ADcurrentTab].name;
        console.log(initActive)
        // 文章列
        var articleList = new Object();
        articleList.label = initActive;
        articleList.sortby = '1';
        articleList.page = '1';
        articleList.size = '15';
        Adata = JSON.stringify(articleList); // 转JSON字符串
        var Adata = RSA.sign(Adata);
        wx.request({
          // url: app.InterfaceUrl + 'homepagemanage/getArticleByLabel',
          url: 'http://39.106.49.2:8082/homepagemanage/getArticleByLabel',
          data: {
            data: Adata
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          method: 'POST',
          success: function(res) {
            console.log(res.data.data)
            if (res.data.data.length < 30) {
              for (var i = res.data.data.length - 1; i >= 0; i--) {
                // console.log(res.data.data[i].article_img_path)//split(',');
                if (res.data.data[i].article_img_path == '') {
                  res.data.data[i].article_img_path = res.data.data[i].article_img_path
                } else {
                  res.data.data[i].article_img_path = res.data.data[i].article_img_path.split(',');
                }
              };
              that.setData({
                tabActiveKeyId: res.data.data,
              });
            } else {
              var arr = [];
              for (var i = 30; i >= 0; i--) {
                // console.log(res.data.data[i].article_img_path)//split(',');
                if (res.data.data[i].article_img_path == '') {
                  res.data.data[i].article_img_path = res.data.data[i].article_img_path;
                  arr.unshift(res.data.data[i])
                } else {
                  res.data.data[i].article_img_path = res.data.data[i].article_img_path.split(',');
                  arr.unshift(res.data.data[i])
                }
              };
              that.setData({
                tabActiveKeyId: arr,
              });
            }
          }
        });
      }
    });
  },
  /**
   * 生命周期函数--监听页面隐藏a
   */
  onHide: function() {
    app.ADcurrentTab = this.data.currentTab;
    wx.hideLoading();
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  // onReachBottom: function() {
  //   console.log('到底')
  //   var that = this;
  //   var loads = true;
  //   if (that.data.tabActiveKeyId.length >= 90) {
  //     loads = false;
  //   }
  //   that.setData({
  //     Load: loads
  //   });
  //   if (that.data.Load && that.data.BottomLoad) {
  //     that.setData({
  //       BottomLoad: false
  //     })
  //     // 文章列
  //     var page = parseInt(that.data.ArticlePage) + 1;
  //     var articleList = new Object();
  //     articleList.label = that.data.labellist[that.data.currentTab].name;
  //     articleList.sortby = '1';
  //     articleList.page = page.toString();
  //     articleList.size = '15';
  //     Adata = JSON.stringify(articleList); // 转JSON字符串
  //     var Adata = RSA.sign(Adata);
  //     wx.request({
  //       url: 'http://39.106.49.2:8082/homepagemanage/getArticleByLabel',
  //       // url: app.InterfaceUrl + 'homepagemanage/getArticleByLabel',
  //       data: {
  //         data: Adata
  //       },
  //       header: {
  //         'content-type': 'application/x-www-form-urlencoded' // 默认值
  //       },
  //       method: 'POST',
  //       success: function(res) {
  //         console.log(res)
  //         if (res.data.data.length == 0) {
  //           that.setData({
  //             Load: false
  //           });
  //           wx.showToast({
  //             title: '已没有更多文章...',
  //             icon: 'none',
  //             duration: 1500
  //           })
  //         } else {
  //           var data = that.data.tabActiveKeyId;
  //           for (var i = res.data.data.length - 1; i >= 0; i--) {
  //             if (res.data.data[i].article_img_path == '') {
  //               res.data.data[i].article_img_path = res.data.data[i].article_img_path;
  //               data.push(res.data.data[i])
  //             } else {
  //               res.data.data[i].article_img_path = res.data.data[i].article_img_path.split(',');
  //               data.push(res.data.data[i])
  //             }
  //           };
  //           var NewData = data.concat(res.data.data);
  //           console.log(NewData)
  //           var BottomLoads = true;
  //           if (NewData.length > 90) {
  //             var BottomLoads = false;
  //             NewData = that.data.tabActiveKeyId;
  //           }
  //           that.setData({
  //             tabActiveKeyId: NewData,
  //             Load: false,
  //             BottomLoad: BottomLoads,
  //             ArticlePage: page
  //           });
  //           console.log(that.data.tabActiveKeyId)
  //         }
  //       }
  //     });
  //   }
  // },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})