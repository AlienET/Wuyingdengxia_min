// pages/index/article_detail/article_detail.js
//获取应用实例
var RSA = require('../../utils/wx_rsa.js');
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
    //文章点赞/收藏
    articleIcon: '',
    //是否有视频
    is_video: false
  },
  // 评论输入框
  commentInput: function(event) {
    var that = this;
    var data = new Object();
    data.toid = that.data.articleid;
    data.userid = app.userData.userid;
    data.comType = '0';
    data.comment_to_type = '0';
    data.comContent = event.detail.value;
    data = JSON.stringify(data); // 转JSON字符串
    data = RSA.sign(data);
    console.log(event.detail.value);
    wx.request({
      url: app.InterfaceUrl + 'usermanage/commentAndReply',
      data: {
        data: data
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function(res) {
        console.log(res);
        // 获取评论数据
        var comData = new Object();
        comData.toid = that.data.articleid;
        comData.user_id = app.userData.userid;
        comData.comType = "0";
        comData.comment_to_type = '0';
        comData = JSON.stringify(comData); // 转JSON字符串
        comData = RSA.sign(comData);
        wx.request({
          url: app.InterfaceUrl + 'usermanage/getCommentList',
          data: {
            data: comData
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: 'POST',
          success: function(res) {
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
        that.setData({
          inputTxt: ''
        });
      },
      fail: function(error) {
        console.log(error);
      }

    })
  },
  // 个人页
  onauthorTap: function(e) {
    console.log(e.currentTarget.dataset.userid)
    wx.navigateTo({
      url: '../authorInfo/authorInfo?userid=' + e.currentTarget.dataset.userid,
    })
  },
  // 关注
  follow: function() {
    var that = this;
    var obj = new Object();
    obj.userid = app.userData.userid;
    obj.befollid = that.data.aboutData.user_id;
    obj = JSON.stringify(obj); // 转JSON字符串
    var obj = RSA.sign(obj);
    if (that.data.aboutData.is_follow > 0) {
      wx.request({
        url: app.InterfaceUrl + 'usermanage/cancelFollow',
        data: {
          data: obj
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: "POST",
        success: function(res) {
          console.log(res)
          that.setData({
            'aboutData.is_follow': 0
          })
          console.log(that.data.aboutData.is_follow)
        },
        fail: function(error) {
          console.log(error);
        }
      })
    } else {
      wx.request({
        url: app.InterfaceUrl + 'usermanage/addFollow',
        data: {
          data: obj
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: "POST",
        success: function(res) {
          that.setData({
            'aboutData.is_follow': 1
          })
          console.log(res)
        },
        fail: function(error) {
          console.log(error);
        }
      })
    }
  },
  // 评论列点赞
  like: function(index) {
    var that = this;
    var comment_id = that.data.commentData[index.currentTarget.dataset.postid].comment_id;
    var toUserId = that.data.commentData[index.currentTarget.dataset.postid].user_id
    console.log(that.data.commentData[index.currentTarget.dataset.postid].comment_id)
    var data = new Object();
    data.userid = app.userData.userid;
    data.toid = comment_id;
    data.supType = '5';
    data.toUserId = toUserId;
    data = JSON.stringify(data); // 转JSON字符串
    data = RSA.sign(data);
    // 获取点赞数 key_dis_list_id
    var supportNum = 'commentData[' + index.currentTarget.dataset.postid + '].comment_support_num';
    var isSupportM = 'commentData[' + index.currentTarget.dataset.postid + '].is_support';
    var isSupport = that.data.commentData[index.currentTarget.dataset.postid].is_support;
    if (isSupport > 0) {
      wx.request({
        url: app.InterfaceUrl + 'usermanage/cancelSupport',
        data: {
          data: data
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: function(res) {
          console.log(res);
          // 点赞 + 1
          var addNum = parseInt(that.data.commentData[index.currentTarget.dataset.postid].comment_support_num) - 1;
          // 根据 讨论列数组下标修改点赞数
          that.setData({
            [supportNum]: addNum,
            [isSupportM]: 0
          })
        },
        fail: function(error) {
          console.log(error)
        }
      })

    } else {
      wx.request({
        url: app.InterfaceUrl + 'usermanage/addSupport',
        data: {
          data: data
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: function(res) {
          console.log(res);
          // 点赞 + 1
          var addNum = parseInt(that.data.commentData[index.currentTarget.dataset.postid].comment_support_num) + 1;
          // 根据 讨论列数组下标修改点赞数
          that.setData({
            [supportNum]: addNum,
            [isSupportM]: 1
          })
        },
        fail: function(error) {
          console.log(error)
        }
      })

    }

  },
  // 举报切换
  luelue: function(index) {
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
  report: function(item) {
    console.log(item.currentTarget.dataset.postid.jubao);
    var that = this;
    var obj = new Object();
    obj.user_id = app.userData.userid;
    obj.to_id = item.currentTarget.dataset.postid.comment_id;
    obj.type = '0';
    obj.to_type = '0';
    obj.content = item.currentTarget.dataset.postid.comment_content;
    obj.title = that.data.aboutData.article_title;
    obj = JSON.stringify(obj); // 转JSON字符串
    var obj = RSA.sign(obj);
    wx.request({
      url: app.InterfaceUrl + 'usermanage/addReport',
      data: {
        data: obj
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function(res) {
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
          title: res.data.msg,
          duration: 1000,
        })
      },
      fail: function(error) {
        console.log(error);
      }
    })
  },
  // 文章点赞
  wzdz: function() {
    var that = this;
    var data = new Object();
    data.userid = app.userData.userid;
    data.toid = that.data.aboutData.articleid;
    data.supType = '1';
    data.toUserId = that.data.aboutData.user_id;
    data = JSON.stringify(data); // 转JSON字符串
    var data = RSA.sign(data);

    if (that.data.articleIcon.is_support > 0) {
      wx.request({
        url: app.InterfaceUrl + 'usermanage/cancelSupport',
        data: {
          data: data
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: function(res) {
          console.log(res);
          that.setData({
            'articleIcon.is_support': 0
          })
        }
      })
    } else {
      wx.request({
        url: app.InterfaceUrl + 'usermanage/addSupport',
        data: {
          data: data
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: "POST",
        success: function(res) {
          console.log(res);
          that.setData({
            'articleIcon.is_support': 1
          });
        }
      })
    }
  },
  // 文章收藏
  wzsc: function() {
    var that = this;
    var collection = new Object();
    collection.userid = app.userData.userid;
    collection.toid = that.data.aboutData.articleid;
    collection.type = '1';
    collection = JSON.stringify(collection); // 转JSON字符串
    var collection = RSA.sign(collection);
    if (that.data.articleIcon.is_collection > 0) {
      wx.request({
        url: app.InterfaceUrl + 'usermanage/cancelCollection',
        data: {
          data: collection
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: function(res) {
          console.log(res);
          that.setData({
            'articleIcon.is_collection': 0
          })
        }
      })
    } else {
      wx.request({
        url: app.InterfaceUrl + 'usermanage/addCollection',
        data: {
          data: collection
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: function(res) {
          console.log(res);
          that.setData({
            'articleIcon.is_collection': 1
          });
        }
      })
    }
  },
  // 分享
  onShareTop: function() {
    wx.showToast({
      title: '请点击右上方第一个按钮',
      icon: 'none',
      duration: 3000
    })
  },
  // 回复
  replay: function(item) {
    var that = this;
    console.log(item)
    console.log(that.data.aboutData);
    var replayInner = new Object();
    replayInner.comment_id = item.currentTarget.dataset.item.comment_id;
    replayInner.content = item.currentTarget.dataset.item.comment_content;
    replayInner.follow_user_id = item.currentTarget.dataset.item.user_id;
    replayInner.ctime = item.currentTarget.dataset.item.ctime;
    replayInner.headimg = item.currentTarget.dataset.item.headimg;
    replayInner.user_name = item.currentTarget.dataset.item.user_name;
    replayInner.title = that.data.aboutData.article_title;
    replayInner.type = '0';
    app.replayInner = replayInner;
    wx.navigateTo({
      url: '../replay/replay',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    var that = this;

    var data = new Object();
    data.userid = app.userData.userid;
    data.articleid = options.articleid;
    data = JSON.stringify(data); // 转JSON字符串
    data = RSA.sign(data);
    that.setData({
      userid: app.userData.userid,
      articleid: options.articleid,
    });
    wx.request({
      url: app.InterfaceUrl + 'homepagemanage/getArticleById',
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
          article: res.data.data.article_content
        })
        console.log(that.data.article)
        WxParse.wxParse('article', 'html', that.data.article, that, 5);
        var articleTags = res.data.data.article_tags.split(',');
        var articleArr = [];
        for (var i = articleTags.length - 1; i >= 0; i--) {
          if (articleTags[i] != '') {
            articleArr.push(articleTags[i])
          }
        };
        if (res.data.data.video_url != "") {
          that.setData({
            is_video: true
          })
        }
        res.data.data.article_tags = articleArr;
        that.setData({
          aboutData: res.data.data,
          // article: that.data.article
        });
        // article_tags  
        console.log(that.data.aboutData.article_tags)
      }
    });
    // 获取评论数据
    var comData = new Object();
    comData.toid = that.data.articleid,
      comData.user_id = app.userData.userid,
      comData.comType = "0",
      comData.comment_to_type = '0';
    comData = JSON.stringify(comData); // 转JSON字符串
    comData = RSA.sign(comData);
    wx.request({
      url: app.InterfaceUrl + 'usermanage/getCommentList',
      data: {
        data: comData
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function(res) {
        console.log(res);
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
    });
    //对文章点赞/收藏状态
    var articleIcon = new Object();
    articleIcon.type = '0';
    articleIcon.userid = app.userData.userid;
    articleIcon.to_id = options.articleid;
    articleIcon = JSON.stringify(articleIcon); // 转JSON字符串
    articleIcon = RSA.sign(articleIcon);
    wx.request({
      url: app.InterfaceUrl + 'usermanage/getAllDetailsNexusByUser',
      data: {
        data: articleIcon
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function(res) {
        console.log(res)
        that.setData({
          articleIcon: res.data.data
        });
      }
    })
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

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

  },

})