// pages/wishingWell/wishingWell.js
var RSA = require('../../utils/wx_rsa.js');
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
    // 正在讨论列
    discusslist: [],
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: '',
    // tab切换的当前key_id
    tabActiveKeyId: [],
    //scroll-view height
    Vheight: '',
    //页数
    Qpage: 1,
    //加载
    Load: 0
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
      var quesLabel = that.data.labellist[e.target.dataset.current].name;
      var questions = new Object();
      questions.label = quesLabel;
      questions.page = '1';
      questions.size = '20';
      questions = JSON.stringify(questions); // 转JSON字符串
      var data = RSA.sign(questions);
      wx.request({
        url: app.InterfaceUrl + 'questionsmanage/queryByLable',
        data: {
          data: data
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        method: 'POST',
        success: function(res) {
          console.log(res)

          var time = '';
          for (var i = res.data.data.length - 1; i >= 0; i--) {
            time = res.data.data[i].ctime.substring(0, 19);

            time = time.replace(/-/g, '/');
            time = new Date(time).getTime();
            res.data.data[i].ctime = app.getDateDiff(time);

          }
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
  bindChange: function(e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current,
      Qpage: 1,
      Load: 0
    });
    // 文章列
    var quesLabel = that.data.labellist[e.detail.current].name;
    var questions = new Object();
    questions.label = quesLabel;
    questions.page = '1';
    questions.size = '20';
    questions = JSON.stringify(questions); // 转JSON字符串
    var data = RSA.sign(questions);
    wx.request({
      url: app.InterfaceUrl + 'questionsmanage/queryByLable',
      data: {
        data: data
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: 'POST',
      success: function(res) {
        console.log(res);
        var time = '';
        for (var i = res.data.data.length - 1; i >= 0; i--) {
          time = res.data.data[i].ctime.substring(0, 19);

          time = time.replace(/-/g, '/');
          time = new Date(time).getTime();
          res.data.data[i].ctime = app.getDateDiff(time);

        }
        that.setData({
          tabActiveKeyId: res.data.data,
        });
      }
    });
  },
  lower: function() {
    var that = this;
    that.setData({
      Load: 1
    });
    setTimeout(function() {
      var Qpage = that.data.Qpage + 1;
      var labelName = new Object();
      labelName.label = that.data.labellist[that.data.currentTab].name;
      labelName.page = Qpage.toString();
      labelName.size = '15';
      labelName = JSON.stringify(labelName); // 转JSON字符串
      var data = RSA.sign(labelName);
      wx.request({
        url: app.InterfaceUrl + 'questionsmanage/queryByLable',
        data: {
          data: data
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        method: 'POST',
        success: function(res) {
          console.log(res);
          that.setData({
            Qpage: Qpage
          });
          if (res.data.data.length == 0) {
            that.setData({
              Load: 2
            });
          } else {
            var data = that.data.tabActiveKeyId;
            var time = '';
            for (var i = res.data.data.length - 1; i >= 0; i--) {
              time = res.data.data[i].ctime.substring(0, 19);
              time = time.replace(/-/g, '/');
              time = new Date(time).getTime();
              res.data.data[i].ctime = app.getDateDiff(time);

            }
            var NewData = data.concat(res.data.data);
            that.setData({
              tabActiveKeyId: NewData,
            });
            console.log(that.data.tabActiveKeyId)
          }
        }
      });
    }, 800)

  },
  // 我的导航编辑
  onNavEditTap: function() {
    wx.navigateTo({
      url: '../myNavEdit/myNavEdit?who=2',
    })
  },
  // 提问
  onQuizTap: function() {
    wx.navigateTo({
      url: '../QAquiz_tit/QAquiz_tit',
    })
  },

  // 问题详情
  onProblemDetailsTap: function(q) {
    console.log(q.currentTarget.dataset.quesid)
    wx.navigateTo({
      url: '../problemDetails/problemDetails?quesid=' + q.currentTarget.dataset.quesid,
    })
  },
  //搜索
  onSearchTap: function() {
    wx.navigateTo({
      url: '../search/search'
    })
  },
  // 我的提问
  onMyQuestionTap: function() {
    wx.navigateTo({
      url: '../Myquestion/Myquestion',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
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
    // 标签列表
    var labels = new Object();
    labels.userid = app.userData.userid;
    labels.type = '2';
    labels = JSON.stringify(labels); // 转JSON字符串
    var data = RSA.sign(labels);
    wx.request({
      url: app.InterfaceUrl + 'homepagemanage/getLabels', //仅为示例，并非真实的接口地址
      data: {
        data: data
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: 'POST',
      success: function(res) {
        that.setData({
          labellist: res.data.data,
          currentTab: 0
        });
        var initActive = that.data.labellist[0].name;
        console.log(initActive)
        // 问题列
        var labelName = new Object();
        labelName.label = initActive;
        labelName.page = '1';
        labelName.size = '20';
        labelName = JSON.stringify(labelName); // 转JSON字符串
        var data = RSA.sign(labelName);
        wx.request({
          url: app.InterfaceUrl + 'questionsmanage/queryByLable',
          data: {
            data: data
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          method: 'POST',
          success: function(res) {
            console.log(res)
            var time = '';
            for (var i = res.data.data.length - 1; i >= 0; i--) {
              time = res.data.data[i].ctime.substring(0, 19);

              time = time.replace(/-/g, '/');
              time = new Date(time).getTime();
              res.data.data[i].ctime = app.getDateDiff(time);

            }

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
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    // 标签列表
    var labels = new Object();
    labels.userid = app.userData.userid;
    labels.type = '2';
    labels = JSON.stringify(labels); // 转JSON字符串
    var data = RSA.sign(labels);
    wx.request({
      url: app.InterfaceUrl + 'homepagemanage/getLabels', //仅为示例，并非真实的接口地址
      data: {
        data: data
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: 'POST',
      success: function(res) {
        console.log(res)
        that.setData({
          labellist: res.data.data,
          currentTab: app.QQcurrentTab
        });
        var initActive = that.data.labellist[app.QQcurrentTab].name;
        console.log(initActive)
        // 文章列
        var labelName = new Object();
        labelName.label = initActive;
        labelName.page = '1';
        labelName.size = '20';
        labelName = JSON.stringify(labelName); // 转JSON字符串
        var data = RSA.sign(labelName);
        wx.request({
          url: app.InterfaceUrl + 'questionsmanage/queryByLable',
          data: {
            data: data
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          method: 'POST',
          success: function(res) {
            var time = '';
            for (var i = res.data.data.length - 1; i >= 0; i--) {
              time = res.data.data[i].ctime.substring(0, 19);

              time = time.replace(/-/g, '/');
              time = new Date(time).getTime();
              res.data.data[i].ctime = app.getDateDiff(time);

            }

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
  onHide: function() {
    app.QQcurrentTab = this.data.currentTab;
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    console.log('xiasd')
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})