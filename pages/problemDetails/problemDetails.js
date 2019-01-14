// pages/problemDetails/problemDetails.js
//获取应用实例
var RSA = require('../../utils/wx_rsa.js');
const app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 当前用户
    userid: '',
    // 问题详情
    aboutData: [],
    // 评论列 数据
    commentData: [],
    // 评论输入框
    inputTxt: '',
    // 问题id
    quesid: '',
    article: '',
    //是否收藏
    isSC: '',
    //采纳状态
    isTake: true
  },
  // 回复
  replay: function(item) {
    var that = this;
    console.log(item)
    console.log(that.data.aboutData);
    var replayInner = new Object();
    replayInner.comment_id = item.currentTarget.dataset.item.answer_id;
    replayInner.content = item.currentTarget.dataset.item.answer_content;
    replayInner.follow_user_id = item.currentTarget.dataset.item.user_id;
    replayInner.ctime = item.currentTarget.dataset.item.ctime;
    replayInner.headimg = item.currentTarget.dataset.item.headimg;
    replayInner.user_name = item.currentTarget.dataset.item.user_name;
    replayInner.title = that.data.aboutData.question_title;
    replayInner.type = '7';
    app.replayInner = replayInner;
    wx.navigateTo({
      url: '../replay/replay',
    })
  },
  // 个人页
  onauthorTap: function(e) {
    console.log(e.currentTarget.dataset.userid)
    wx.navigateTo({
      url: '../authorInfo/authorInfo?userid=' + e.currentTarget.dataset.userid,
    })
  },
  // 评论输入框
  commentInput: function(event) {
    var that = this;
    var data = new Object();
    data.userid = app.userData.userid;
    data.quesid = that.data.quesid;
    data.anwContent = event.detail.value;
    data = JSON.stringify(data); // 转JSON字符串
    var data = RSA.sign(data);
    console.log(event.detail.value);
    wx.request({
      url: app.InterfaceUrl + 'questionsmanage/answerQuestion',
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
        // 回复
        var obj = new Object();
        obj.quesid = that.data.quesid;
        obj.userid = app.userData.userid;
        obj = JSON.stringify(obj); // 转JSON字符串
        var data = RSA.sign(obj);
        wx.request({
          url: app.InterfaceUrl + 'questionsmanage/getAnswerList',
          data: {
            data: data
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
              if (res.data.data[i].user_id == app.userData.userid) {
                if (res.data.data[i].answer_content == event.detail.value) {
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
                  that.setData({
                    commentData: arrReverse
                  });
                  return;
                }
              }
            }


          }
        });
        that.setData({
          inputTxt: ''
        });
      },
      fail: function(error) {
        console.log(errpr);
      }

    })
  },
  // 问题收藏
  wzsc: function() {
    var that = this;
    var data = new Object();
    data.userid = app.userData.userid;
    data.toid = that.data.quesid;
    data.type = '4';
    data = JSON.stringify(data); // 转JSON字符串
    var data = RSA.sign(data);
    if (that.data.isSC.is_collection > 0) {
      wx.request({
        url: app.InterfaceUrl + 'usermanage/cancelCollection',
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
            'isSC.is_collection': 0,
          })
        }
      })
    } else {
      wx.request({
        url: app.InterfaceUrl + 'usermanage/addCollection',
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
            'isSC.is_collection': 1
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
  // 评论列点赞
  like: function(index) {
    var that = this;
    var answer_id = that.data.commentData[index.currentTarget.dataset.postid].answer_id;
    var toUserId = that.data.commentData[index.currentTarget.dataset.postid].user_id;
    var data = new Object();
    data.userid = app.userData.userid;
    data.toid = answer_id;
    data.supType = '6';
    data.toUserId = toUserId;
    data = JSON.stringify(data); // 转JSON字符串
    var data = RSA.sign(data);
    // 获取点赞数 key_dis_list_id
    var supportNum = 'commentData[' + index.currentTarget.dataset.postid + '].support_num';
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
          var addNum = parseInt(that.data.commentData[index.currentTarget.dataset.postid].support_num) - 1;
          // 根据 讨论列数组下标修改点赞数
          that.setData({
            [supportNum]: [addNum],
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
          var addNum = parseInt(that.data.commentData[index.currentTarget.dataset.postid].support_num) + 1;
          // 根据 讨论列数组下标修改点赞数
          that.setData({
            [supportNum]: [addNum],
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
    if (item.currentTarget.dataset.postid.is_take < 1) {
      var toid = item.currentTarget.dataset.postid.answer_id;
      var data = new Object();
      data.user_id = app.userData.userid;
      data.to_id = toid;
      data.type = '0';
      data.to_type = '7';
      data.content = item.currentTarget.dataset.postid.answer_content;
      data.title = that.data.aboutData.question_title;
      data = JSON.stringify(data); // 转JSON字符串
      var data = RSA.sign(data);
      wx.request({
        url: app.InterfaceUrl + 'usermanage/addReport',
        data: {
          data: data
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
            duration: 1500,
          })
        },
        fail: function(error) {
          console.log(error);
        }
      })
    } else {
      wx.showToast({
        title: '已采纳回答不可举报',
        icon: 'none',
        duration: 2000,
      })
    }
  },
  //采纳
  cainai: function(index) {
    var that = this;
    console.log(that.data.commentData[index.currentTarget.dataset.postid])
    var item = that.data.commentData[index.currentTarget.dataset.postid];
    var data = new Object();
    data.questionid = that.data.quesid;
    data.answerid = item.answer_id;
    data.moonCash = that.data.aboutData.moon_cash;
    data.questionUserid = that.data.aboutData.user_id;
    data.answerUserid = item.user_id;
    data = JSON.stringify(data); // 转JSON字符串
    var data = RSA.sign(data);
    wx.request({
      url: app.InterfaceUrl + 'questionsmanage/acceptAnswer',
      data: {
        data: data
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function(res) {
        console.log(res);
        var is_take = 'commentData[' + index.currentTarget.dataset.postid + '].is_take';
        that.setData({
          [is_take]: '1',
          isTake: false
        })
      },
      fail: function(error) {
        console.log(error);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.quesid);
    var that = this;
    that.setData({
      quesid: options.quesid,
      userId: app.userData.userid
    })
    // 问题内容
    var questionData = new Object();
    questionData.quesid = options.quesid;
    questionData.userid = app.userData.userid;
    questionData = JSON.stringify(questionData); // 转JSON字符串
    var data = RSA.sign(questionData);
    wx.request({
      url: app.InterfaceUrl + 'questionsmanage/getQuestionByQuesId',
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
          article: res.data.data.question_content
        });
        console.log(that.data.article)
        WxParse.wxParse('article', 'html', that.data.article, that, 5);
        if (res.data.data.question_image) {
          res.data.data.question_image = res.data.data.question_image.split(',');
        }
        that.setData({
          aboutData: res.data.data,
          // article: temp
        })
        console.log(that.data.aboutData);
      }
    });
    // 回复
    var answerList = new Object();
    answerList.quesid = options.quesid;
    answerList.userid = app.userData.userid;
    answerList = JSON.stringify(answerList); // 转JSON字符串
    var data = RSA.sign(answerList);
    wx.request({
      url: app.InterfaceUrl + 'questionsmanage/getAnswerList',
      data: {
        data: data
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function(res) {
        console.log(res);
        var arrReverse = [];
        var time = '';
        var isTake = true;
        for (var i = res.data.data.length - 1; i >= 0; i--) {
          time = res.data.data[i].ctime.substring(0, 19);

          time = time.replace(/-/g, '/');
          time = new Date(time).getTime();
          res.data.data[i].jubao = false;
          res.data.data[i].ctime = app.getDateDiff(time);
          if (res.data.data[i].is_take == '1') {
            isTake = false;
          }
        }
        that.setData({
          commentData: res.data.data,
          isTake: isTake
        });
      }
    });
    //收藏状态
    var sc = new Object();
    sc.type = '1';
    sc.userid = app.userData.userid;
    sc.to_id = options.quesid;
    sc = JSON.stringify(sc); // 转JSON字符串
    var data = RSA.sign(sc);
    wx.request({
      url: app.InterfaceUrl + 'usermanage/getAllDetailsNexusByUser',
      data: {
        data: data
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log(res)
        that.setData({
          isSC: res.data.data
        });
      },
      fail: function(error) {
        console.log(error)
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