// pages/replay/replay.js
var RSA = require('../../utils/wx_rsa.js');
//获取应用实例
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    aboutData: null,
    commentData: [],
    inputTxt: '',
    //唤醒键盘
    focus: false,
    //回复再回复id
    replyId: ''
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
    var data = new Object();
    data.userid = app.userData.userid;
    data.befollid = that.data.aboutData.follow_user_id;
    data = JSON.stringify(data); // 转JSON字符串
    var data = RSA.sign(data);
    if (that.data.commentData.is_follow > 0) {
      wx.request({
        url: app.InterfaceUrl + 'usermanage/cancelFollow',
        data: {
          data: data
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: "POST",
        success: function(res) {
          console.log(res)
          that.setData({
            'commentData.is_follow': 0
          })
        },
        fail: function(error) {
          console.log(error);
        }
      })
    } else {
      wx.request({
        url: app.InterfaceUrl + 'usermanage/addFollow',
        data: {
          data: data
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: "POST",
        success: function(res) {
          that.setData({
            'commentData.is_follow': 1
          })
        },
        fail: function(error) {
          console.log(error);
        }
      })
    }
  },
  // 举报切换
  luelue: function(index) {
    var that = this;
    // console.log(index.currentTarget.dataset.postid);
    var jubao = 'commentData.array[' + index.currentTarget.dataset.postid + '].jubao';
    var Fjubao = that.data.commentData.array[index.currentTarget.dataset.postid].jubao;
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
    var that = this;
    var obj = new Object();
    obj.user_id = app.userData.userid;
    obj.to_id = item.currentTarget.dataset.postid.reply_id.toString();
    obj.type = '1';
    obj.to_type = that.data.aboutData.type;
    obj.content = item.currentTarget.dataset.postid.reply_content;
    obj.title = that.data.aboutData.title;
    obj = JSON.stringify(obj); // 转JSON字符串
    var data = RSA.sign(obj);
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
          var commentData_jubao = 'commentData.array[' + i + '].jubao'
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
  commentInput: function(event) {
    var that = this;
    console.log(event.detail.value)
    that.setData({
      inputTxt: event.detail.value
    })
  },
  confirmtxt: function(event) {
    var that = this;
    var data = new Object();
    data.userid = app.userData.userid;
    data.toid = that.data.focus ? that.data.replyId.toString() : that.data.aboutData.comment_id;
    data.comType = '1';
    data.comContent = event.detail.value;
    data.comment_to_type = that.data.aboutData.type;
    data = JSON.stringify(data); // 转JSON字符串
    var data = RSA.sign(data);
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
        var obj = new Object();
        obj.comment_id = that.data.aboutData.comment_id;
        obj.user_id = app.userData.userid;
        obj.follow_user_id = that.data.aboutData.follow_user_id;
        obj = JSON.stringify(obj); // 转JSON字符串
        var obj = RSA.sign(obj);
        wx.request({
          url: app.InterfaceUrl + 'usermanage/getReplyList',
          data: {
            data: obj
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: 'POST',
          success: function(res) {
            console.log(res);
            var arrReverse = [];
            var time = '';
            for (var i = res.data.data.array.length - 1; i >= 0; i--) {
              if (res.data.data.array[i].reply_userid == app.userData.userid) {
                if (res.data.data.array[i].reply_content == event.detail.value) {
                  console.log(res.data.data[i])
                  res.data.data.array[i].jubao = false;
                  res.data.data.array[i].ctime = '刚刚';

                  var refresh = [];
                  refresh = res.data.data.array.splice(i, 1);
                  // this.DiscussListsData.unshift(refresh[0]);

                  that.data.commentData.array.unshift(refresh[0]);
                  arrReverse = that.data.commentData.array;
                  console.log(arrReverse)
                  that.setData({
                    'commentData.array': arrReverse
                  });
                  console.log(that.data.commentData.array)
                  return;
                }
              }
            }
            // console.log(that.data.commentData)
          }
        })
        that.setData({
          inputTxt: '',
          focus: false
        });
      },
      fail: function(error) {
        console.log(error);
      }

    })
  },
  onfb: function() {
    var that = this;
    var inputText = that.data.inputTxt;
    var toid = that.data.focus ? that.data.replyId.toString() : that.data.aboutData.comment_id;
    console.log(toid)
    var data = new Object();
    data.userid = app.userData.userid;
    data.toid = toid;
    data.comType = '1';
    data.comContent = that.data.inputTxt;
    data.comment_to_type = that.data.aboutData.type;
    data = JSON.stringify(data); // 转JSON字符串
    var data = RSA.sign(data);
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
        var obj = new Object();
        obj.comment_id = that.data.aboutData.comment_id;
        obj.user_id = app.userData.userid;
        obj.follow_user_id = that.data.aboutData.follow_user_id;
        obj = JSON.stringify(obj); // 转JSON字符串
        var obj = RSA.sign(obj);
        wx.request({
          url: app.InterfaceUrl + 'usermanage/getReplyList',
          data: {
            data: obj
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: 'POST',
          success: function(res) {
            console.log(res);
            var arrReverse = [];
            var time = '';
            console.log(inputText)
            for (var i = res.data.data.array.length - 1; i >= 0; i--) {
              if (res.data.data.array[i].reply_userid == app.userData.userid) {
                if (res.data.data.array[i].reply_content == inputText) {
                  console.log(res.data.data[i])
                  res.data.data.array[i].jubao = false;
                  res.data.data.array[i].ctime = '刚刚';
                  var refresh = [];
                  refresh = res.data.data.array.splice(i, 1);
                  that.data.commentData.array.unshift(refresh[0]);
                  arrReverse = that.data.commentData.array;
                  console.log(arrReverse)
                  that.setData({
                    'commentData.array': arrReverse
                  });
                  console.log(that.data.commentData.array)
                  return;
                }
              }
            }
            // console.log(that.data.commentData)
          }
        })
        that.setData({
          inputTxt: '',
          focus: false
        });
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
    console.log(app.replayInner)
    that.setData({
      aboutData: app.replayInner
    })
    var data = new Object();
    data.comment_id = that.data.aboutData.comment_id;
    data.user_id = app.userData.userid;
    data.follow_user_id = that.data.aboutData.follow_user_id;
    data = JSON.stringify(data); // 转JSON字符串
    var data = RSA.sign(data);
    wx.request({
      url: app.InterfaceUrl + 'usermanage/getReplyList',
      data: {
        data: data
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log(res)
        var arrReverse = '';
        var time = '';
        for (var i = res.data.data.array.length - 1; i >= 0; i--) {
          time = res.data.data.array[i].ctime.substring(0, 19);
          time = time.replace(/-/g, '/');
          time = new Date(time).getTime();
          res.data.data.array[i].jubao = false;
          res.data.data.array[i].ctime = app.getDateDiff(time);
        }
        arrReverse = res.data.data
        that.setData({
          commentData: arrReverse
        });
        console.log(that.data.commentData)
      }
    })
  },
  //回复列回复
  replay: function(item) {
    console.log(item)
    var that = this;
    that.setData({
      focus: true,
      replyId: item.currentTarget.dataset.item.reply_id
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
    app.replayInner = '';
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