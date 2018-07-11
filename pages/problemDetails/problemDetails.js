// pages/problemDetails/problemDetails.js
//获取应用实例
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
  },
  // 回复
  replay: function (item) {
    console.log(item.currentTarget.dataset.item.answer_id)
    wx.navigateTo({
      url: '../replay/replay?comment_id=' + item.currentTarget.dataset.item.answer_id,
    })
  },
  // 个人页
  onauthorTap: function (e) {
    console.log(e.currentTarget.dataset.userid)
    wx.navigateTo({
      url: '../authorInfo/authorInfo?userid=' + e.currentTarget.dataset.userid,
    })
  },
  // 评论输入框
  commentInput: function (event) {
    var that = this;
    console.log(event.detail.value);
    wx.request({
      url: app.InterfaceUrl + 'post_anwser',
      data: {
        userid: app.userData.user_id,
        quesid: that.data.quesid,
        anwContent: event.detail.value
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        console.log(res);
        // 获取评论数据
        // 回复
        wx.request({
          url: app.InterfaceUrl + 'get_answer_list?quesid=' + that.data.quesid + '&userid=' + app.userData.user_id,
          data: {},
          header: { 'content-type': 'application/json' },
          success: function (res) {
            console.log(res.data.data);
            var arrReverse = [];
            var time = '';
            for (var i = res.data.data.length - 1; i >= 0; i--) {
              if (res.data.data[i].user_id == app.userData.user_id) {
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
        that.setData({ inputTxt: '' });
      },
      fail: function (error) {
        console.log(errpr);
      }

    })
  },
  // 问题收藏
  wzsc: function () {
    var that = this;
    if (that.data.aboutData.is_collection != null) {
      wx.request({
        url: app.InterfaceUrl + 'post_cel_collect',
        data: {
          userid: app.userData.user_id,
          toid: that.data.aboutData.question_id,
          supType: 4
        },
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        method: 'POST',
        success: function (res) {
          console.log(res);
          that.setData({
            'aboutData.is_collection': null
          })
        }
      })
    } else {
      wx.request({
        url: app.InterfaceUrl + 'post_collection',
        data: {
          userid: app.userData.user_id,
          type: 4,
          toid: that.data.aboutData.question_id
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
  // 评论列点赞
  like: function (index) {
    var that = this;
    console.log(that.data.commentData[index.currentTarget.dataset.postid].user_id)
    // 获取点赞数 key_dis_list_id
    var supportNum = 'commentData[' + index.currentTarget.dataset.postid + '].support_num';
    var isSupportM = 'commentData[' + index.currentTarget.dataset.postid + '].is_support';
    var isSupport = that.data.commentData[index.currentTarget.dataset.postid].is_support;
    var answer_id = that.data.commentData[index.currentTarget.dataset.postid].answer_id;
    if (isSupport > 0) {
      wx.request({
        url: app.InterfaceUrl + 'post_cel_support',
        data: {
          userid: app.userData.user_id,
          toid: answer_id,
          supType: 6
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: function (res) {
          console.log(res);
          // 点赞 + 1
          var addNum = parseInt(that.data.commentData[index.currentTarget.dataset.postid].support_num) - 1;
          // 根据 讨论列数组下标修改点赞数
          that.setData({
            [supportNum]: [addNum],
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
          userid: app.userData.user_id,
          toid: that.data.commentData[index.currentTarget.dataset.postid].answer_id,
          supType: 6
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'GET',
        success: function (res) {
          console.log(res.data);
          // 点赞 + 1
          var addNum = parseInt(that.data.commentData[index.currentTarget.dataset.postid].support_num) + 1;
          // 根据 讨论列数组下标修改点赞数
          that.setData({
            [supportNum]: [addNum],
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
        user_id: app.userData.user_id,
        to_id: item.currentTarget.dataset.postid.answer_id,
        type: 0,
        to_type: 5,
        content: item.currentTarget.dataset.postid.answer_content
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
          title: res.data.msg,
          duration: 1500,
        })
      },
      fail: function (error) {
        console.log(error);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.quesid);
    var that = this;
    that.setData({
      userid: options.userid,
      quesid: options.quesid
    })
    // 问题内容
    wx.request({
      url: app.InterfaceUrl + 'get_question_byquesid?quesid=' + options.quesid,
      data: {},
      header: { 'content-type': 'application/json' },
      success: function (res) {
        console.log(res.data.data);
        that.setData({ article: res.data.data.question_content });
        console.log(that.data.article)
        var temp = WxParse.wxParse('article', 'html', that.data.article, that, 5);
        res.data.data.question_tags = res.data.data.question_tags.split(',');
        that.setData({
          aboutData: res.data.data,
          article: temp
        })
        console.log(that.data.aboutData);
      }
    });
    // 回复
    wx.request({
      url: app.InterfaceUrl + 'get_answer_list?quesid=' + options.quesid + '&userid=' + app.userData.user_id,
      data: {},
      header: { 'content-type': 'application/json' },
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
        that.setData({
          commentData: res.data.data
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