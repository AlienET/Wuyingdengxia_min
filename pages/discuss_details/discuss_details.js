// pages/discuss_details/discuss_details.js
var RSA = require('../../utils/wx_rsa.js');
//获取应用实例
const app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //讨论详情 接口数据
    aboutData: [], //建一个空数组，用来保存调用接口获取的数据
    // 讨论列 接口数据
    DiscussListsData: [],
    // 文章id
    key_dis_id: '',
    // 输入框value
    inputTxt: '',
    // 当前用户id
    userid: null,
    type: 0,
    article: ''
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
    data.toid = that.data.key_dis_id;
    data.userid = app.userData.userid;
    data.comType = '0';
    data.comment_to_type = that.data.type == '0' ? "6" : '7';
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
        if (res.data.code == 1) {
          var commentData = new Object();
          commentData.toid = that.data.key_dis_id;
          commentData.user_id = app.userData.userid;
          commentData.comType = "0";
          commentData.comment_to_type = that.data.type == '0' ? "6" : '7';
          var commentDataStr = JSON.stringify(commentData); // 转JSON字符串
          commentDataStr = RSA.sign(commentDataStr);
          wx.request({
            url: app.InterfaceUrl + 'usermanage/getCommentList',
            data: {
              data: commentDataStr
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            method: 'POST',
            success: function(res) {
              console.log(res)
              var arrReverse = [];
              var time = '';
              for (var i = res.data.data.length - 1; i >= 0; i--) {
                if (res.data.data[i].user_id == app.userData.userid) {
                  if (res.data.data[i].comment_content == event.detail.value) {
                    console.log(res.data.data[i])
                    res.data.data[i].jubao = false;
                    res.data.data[i].ctime = '刚刚';

                    var refresh = [];
                    refresh = res.data.data.splice(i, 1);
                    // iscussListsData.unshift(refresh[0]);
                    that.data.DiscussListsData.unshift(refresh[0]);
                    arrReverse = that.data.DiscussListsData;
                    console.log(arrReverse)
                    that.setData({
                      DiscussListsData: arrReverse
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
        }
      },
      fail: function(error) {
        console.log(errpr);
      }

    })
  },
  // 点赞
  like: function(index) {
    var that = this;
    var toUserId = that.data.DiscussListsData[index.currentTarget.dataset.postid].user_id;
    var data = new Object();
    data.userid = app.userData.userid;
    data.toid = that.data.DiscussListsData[index.currentTarget.dataset.postid].comment_id;
    data.supType = '5';
    data.toUserId = toUserId;
    data = JSON.stringify(data); // 转JSON字符串
    data = RSA.sign(data);
    console.log(that.data.DiscussListsData[index.currentTarget.dataset.postid].key_dis_list_id)
    // 获取点赞数 key_dis_list_id
    var supportNum = 'DiscussListsData[' + index.currentTarget.dataset.postid + '].comment_support_num';
    var isSupportM = 'DiscussListsData[' + index.currentTarget.dataset.postid + '].is_support';
    var isSupport = that.data.DiscussListsData[index.currentTarget.dataset.postid].is_support;
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
          var addNum = parseInt(that.data.DiscussListsData[index.currentTarget.dataset.postid].comment_support_num) - 1;
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
          var addNum = parseInt(that.data.DiscussListsData[index.currentTarget.dataset.postid].comment_support_num) + 1;
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
    var jubao = 'DiscussListsData[' + index.currentTarget.dataset.postid + '].jubao';
    var Fjubao = that.data.DiscussListsData[index.currentTarget.dataset.postid].jubao;
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
    var data = new Object();
    data.user_id = app.userData.userid;
    data.to_id = item.currentTarget.dataset.postid.comment_id;
    data.type = '0';
    data.to_type = '2';
    data.content = item.currentTarget.dataset.postid.comment_content;
    data.title = that.data.aboutData.key_dis_title;
    data = JSON.stringify(data); // 转JSON字符串
    data = RSA.sign(data);
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
        for (var i = that.data.DiscussListsData.length - 1; i >= 0; i--) {
          var DiscussListsData_jubao = 'DiscussListsData[' + i + '].jubao'
          that.setData({
            [DiscussListsData_jubao]: false
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    console.log(options);
    that.setData({
      key_dis_id: options.key_dis_id,
      userid: app.userData.userid,
      type: options.type
    })
    var data = new Object();
    data.key_dis_id = options.key_dis_id;
    data.user_id = app.userData.userid;
    data.type = options.type;
    data = JSON.stringify(data); // 转JSON字符串
    data = RSA.sign(data);
    wx.request({
      url: app.InterfaceUrl + 'homepagemanage/getHotTopDetails',
      data: {
        data: data
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: 'POST',
      success: function(res) {
        console.log(res)
        var article = res.data.data.content;
        var time = '';
        that.setData({
          article: article
        })
        WxParse.wxParse('article', 'html', that.data.article, that, 5);
        // if (res.data.data.user_dis.length > 0) {
        //   for (var i = res.data.data.user_dis.length - 1; i >= 0; i--) {
        //     time = res.data.data.user_dis[i].ctime.substring(0, 19);
        //     time = time.replace(/-/g, '/');
        //     time = new Date(time).getTime();
        //     res.data.data.user_dis[i].jubao = false;
        //     res.data.data.user_dis[i].ctime = app.getDateDiff(time);
        //   }
        // }
        that.setData({
          aboutData: res.data.data,
          DiscussListsData: res.data.data.user_dis,
          // article: temp
        });
        console.log(that.data.aboutData)
      }
    });
    var commentData = new Object();
    commentData.toid = options.key_dis_id,
      commentData.user_id = app.userData.userid,
      commentData.comType = "0",
      commentData.comment_to_type = that.data.type == '0' ? "6" : '7';
    commentData = JSON.stringify(commentData); // 转JSON字符串
    commentData = RSA.sign(commentData);
    wx.request({
      url: app.InterfaceUrl + 'usermanage/getCommentList',
      data: {
        data: commentData
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: 'POST',
      success: function(res) {
        console.log(res)
        if (res.data.data.length > 0) {
          for (var i = res.data.data.length - 1; i >= 0; i--) {
            var time = res.data.data[i].ctime.substring(0, 19);
            time = time.replace(/-/g, '/');
            time = new Date(time).getTime();
            res.data.data[i].jubao = false;
            res.data.data[i].ctime = app.getDateDiff(time);
          }
        }
        that.setData({
          DiscussListsData: res.data.data,
        });
        console.log(that.data.DiscussListsData)
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function(options) {},

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