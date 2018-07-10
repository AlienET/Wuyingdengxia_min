// pages/index/article_detail/article_detail.js
//获取应用实例
const app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //当前用户id
    userid: '',
    // 文章id
    articleid: '',
    // 文章内容
    aboutData: [],
    // 评论 数据列
    commentData: [],
    // 评论输入框
    inputTxt: '',
    article: '',
  },
  // 评论输入框
  commentInput: function (event) {
    var that = this;
    console.log(event.detail.value);
    wx.request({
      url: app.InterfaceUrl + 'post_comment',
      data: {
        userid: that.data.userid,
        toid: that.data.aboutData.article_id,
        comType: 0,
        comContent: event.detail.value,
        comment_to_type: 0
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        console.log(res);
        console.log(that.data.key_dis_id);

        // 获取评论数据
        wx.request({
          url: app.InterfaceUrl + 'get_allcomment_byid?toid=' + that.data.articleid + '&comType=0&comment_to_type=0',
          data: {},
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log(res.data.data);
            var arrReverse = [];
            var time = '';
            for (var i = res.data.data.length - 1; i >= 0; i--) {
              if (res.data.data[i].user_id == that.data.userid) {
                if (res.data.data[i].comment_content == event.detail.value) {
                  console.log(res.data.data[i])
                  res.data.data[i].jubao = false;
                  res.data.data[i].ctime = '刚刚';

                  var refresh = [];
                  refresh = res.data.data.splice(i, 1);
                  // this.DiscussListsData.unshift(refresh[0]);

                  that.data.commentData.unshift(refresh[0]);
                  arrReverse = that.data.commentData;
                  console.log(arrReverse)
                  that.setData({
                    commentData: arrReverse
                  });
                  return;
                }
              }
            }
            // console.log(that.data.commentData)
          }
        })
        that.setData({ inputTxt: '' });
      },
      fail: function (error) {
        console.log(error);
      }

    })
  },
  // 个人页
  onauthorTap:function(e){
    console.log(e.currentTarget.dataset.userid)
    wx.navigateTo({
      url: '../authorInfo/authorInfo?userid=' + e.currentTarget.dataset.userid,
    })
  },
  // 关注
  follow: function () {
    var that = this;
    if (that.data.aboutData.is_follow > 0) {
      wx.request({
        url: app.InterfaceUrl + 'post_cel_follow',
        data: {
          userid: that.data.userid,
          befollid: that.data.aboutData.user_id
        },
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        method: "POST",
        success: function (res) {
          console.log(res)
          that.setData({
            'aboutData.is_follow': 0
          })
          console.log(that.data.aboutData.is_follow)
        },
        fail: function (error) {
          console.log(error);
        }
      })
    } else {
      wx.request({
        url: app.InterfaceUrl + 'post_follow',
        data: {
          userid: that.data.userid,
          befollid: that.data.aboutData.user_id
        },
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        method: "POST",
        success: function (res) {
          that.setData({
            'aboutData.is_follow': 1
          })
          console.log(res)
        },
        fail: function (error) {
          console.log(error);
        }
      })
    }
  },
  // 评论列点赞
  like: function (index) {
    var that = this;
    console.log(that.data.commentData[index.currentTarget.dataset.postid].user_id)
    // 获取点赞数 key_dis_list_id
    var supportNum = 'commentData[' + index.currentTarget.dataset.postid + '].comment_support_num';
    var isSupportM = 'commentData[' + index.currentTarget.dataset.postid + '].is_support';
    var isSupport = that.data.commentData[index.currentTarget.dataset.postid].is_support;
    var comment_id = that.data.commentData[index.currentTarget.dataset.postid].comment_id;
    if (isSupport>0) {
      wx.request({
        url: app.InterfaceUrl + 'post_cel_support',
        data: {
          userid: that.data.userid,
          toid: comment_id,
          supType: 5
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: function (res) {
          console.log(res);
          // 点赞 + 1
          var addNum = parseInt(that.data.commentData[index.currentTarget.dataset.postid].comment_support_num) - 1;
          // 根据 讨论列数组下标修改点赞数
          that.setData({
            [supportNum]: addNum,
            [isSupportM]: 0
          })
        },
        fail: function (error) {
          console.log(error)
        }
      })

    } else {
      wx.request({
        url: app.InterfaceUrl + 'get_support',
        data: {
          userid: that.data.userid,
          toid: that.data.commentData[index.currentTarget.dataset.postid].comment_id,
          supType: 5
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'GET',
        success: function (res) {
          console.log(res.data);
          // 点赞 + 1
          var addNum = parseInt(that.data.commentData[index.currentTarget.dataset.postid].comment_support_num) + 1;
          // 根据 讨论列数组下标修改点赞数
          that.setData({
            [supportNum]: addNum,
            [isSupportM]: 1
          })
        },
        fail: function (error) {
          console.log(error)
        }
      })

    }

  },
  // 举报切换
  luelue: function (index) {
    var that = this;
    // console.log(index.currentTarget.dataset.postid);
    var jubao = 'commentData[' + index.currentTarget.dataset.postid + '].jubao';
    var Fjubao = that.data.commentData[index.currentTarget.dataset.postid].jubao;
    if (Fjubao) {
      that.setData({
        [jubao]: false
      })
    } else {
      that.setData({
        [jubao]: true
      })
    }
  },
  // 举报
  report: function (item) {
    console.log(item.currentTarget.dataset.postid.jubao);
    var that = this;
    wx.request({
      url: app.InterfaceUrl + 'post_report',
      data: {
        user_id: that.data.userid,
        to_id: item.currentTarget.dataset.postid.user_id,
        type: 1,
        content: item.currentTarget.dataset.postid.comment_content
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        console.log(res);
        // 隐藏 ‘举报’
        for (var i = that.data.commentData.length - 1; i >= 0; i--) {
          var commentData_jubao = 'commentData[' + i + '].jubao'
          that.setData({
            [commentData_jubao]: false
          })
        }
        // 提示框
        wx.showToast({
          title: '举报成功',
          duration: 1000,
        })
      },
      fail: function (error) {
        console.log(error);
      }
    })
  },
  // 文章点赞
  wzdz: function () {
    var that = this;
    if (that.data.aboutData.is_support > 0) {
      wx.request({
        url: app.InterfaceUrl + 'post_cel_support',
        data: {
          userid: that.data.userid,
          toid: that.data.aboutData.article_id,
          supType: 1
        },
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        method: 'POST',
        success: function (res) {
          console.log(res);
          that.setData({
            'aboutData.is_support': 0
          })
        }
      })
    } else {
      wx.request({
        url: app.InterfaceUrl + 'get_support?userid=' + that.data.userid + '&toid=' + that.data.aboutData.article_id + '&supType=1',
        data: {},
        header: { 'content-type': 'application/json' },
        success: function (res) {
          console.log(res);
          that.setData({
            'aboutData.is_support': 1
          });
        }
      })
    }
  },
  // 文章收藏
  wzsc: function () {
    var that = this;
    if (that.data.aboutData.is_collection > 0) {
      wx.request({
        url: app.InterfaceUrl + 'post_cel_collect',
        data: {
          userid: that.data.userid,
          toid: that.data.aboutData.article_id,
          type: 1
        },
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        method: 'POST',
        success: function (res) {
          console.log(res);
          that.setData({
            'aboutData.is_collection': 0
          })
        }
      })
    } else {
      wx.request({
        url: app.InterfaceUrl + 'post_collection',
        data: {
          userid: that.data.userid,
          type: 1,
          toid: that.data.aboutData.article_id
        },
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        method: 'POST',
        success: function (res) {
          console.log(res);
          that.setData({
            'aboutData.is_collection': 1
          });
        }
      })
    }
  },
  // 分享
  onShareTop: function () {
    wx.showToast({
      title: '请点击右上方第一个按钮',
      icon: 'none',
      duration: 3000
    })
  },
  // 回复
  replay:function(item){
    console.log(item.currentTarget.dataset.item.comment_id)
    wx.navigateTo({
      url: '../replay/replay?comment_id=' + item.currentTarget.dataset.item.comment_id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var that = this;
    that.setData({
      userid: app.userData.user_id,
      articleid: options.articleid,
    });
    wx.request({
      url: app.InterfaceUrl + 'get_articleinfo_byid?articleid=' + options.articleid + '&userid='+that.data.userid,
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        // console.log(res.data.data.article_content);
        that.setData({ article: res.data.data.article_content})
        console.log(that.data.article)
        var temp = WxParse.wxParse('article', 'html', that.data.article, that, 5);
        res.data.data.article_tags = res.data.data.article_tags.split(',');
        that.setData({
          aboutData: res.data.data,
          article:temp
        });
        // article_tags  
        console.log(that.data.aboutData.article_tags)
      }
    });
    // 获取评论数据
    wx.request({
      url: app.InterfaceUrl + 'get_allcomment_byid?toid=' + that.data.articleid + '&comType=0&comment_to_type=0&user_id='+that.data.userid,
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data.data);
        var arrReverse = [];
        var time = '';
        for (var i = res.data.data.length - 1; i >= 0; i--) {
          time = res.data.data[i].ctime.substring(0, 19);
          time = time.replace(/-/g, '/');
          time = new Date(time).getTime();
          res.data.data[i].jubao = false;
          res.data.data[i].ctime = app.getDateDiff(time);
        }
        arrReverse = res.data.data
        that.setData({
          commentData: arrReverse
        });
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

  },

})