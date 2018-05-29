// pages/pastVideo/pastVideo.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 当前用户id
    userid: '10003',
    // 播放页 详情数据
    aboutData: [],
    // 精彩片段
    VideoList: [],
    // 视频列
    VideoAddress: [],
    // 视频地址
    VideoUrl: '',
    // 评论列数据
    commentData:[],
    // 评论输入框
    inputTxt: ''
  },
  // 评论输入框
  commentInput: function (event) {
    var that = this;
    console.log(event.detail.value);
    wx.request({
      url: app.InterfaceUrl + 'post_comment',
      data: {
        userid: that.data.userid,
        toid: that.data.aboutData.replay_sub_id,
        comType: 0,
        comContent: event.detail.value,
        comment_to_type: 4
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        console.log(res);
        // 获取评论数据
        wx.request({
          url: app.InterfaceUrl + 'get_allcomment_byid?toid=' + that.data.aboutData.replay_sub_id + '&comType=0&comment_to_type=4',
          data: {},
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log(res.data.data);
            var arrReverse = [];
            var time = '';
            for (var i = res.data.data.length - 1; i >= 0; i--) {
              // console.log(res.data.data);
              time = res.data.data[i].ctime.substring(0, 19);
              // debugger;
              time = time.replace(/-/g, '/');
              time = new Date(time).getTime();
              res.data.data[i].jubao = false;
              res.data.data[i].ctime = that.getDateDiff(time);
              arrReverse.push(res.data.data[i]);
            }
            that.setData({
              commentData: arrReverse
            });
          }
        })
        that.setData({ inputTxt: '' });
      },
      fail: function (error) {
        console.log(errpr);
      }

    })
  },
  // 视频切换
  VideoItem: function (e) {
    var that = this;
    console.log(e.currentTarget.dataset.postid);
    var url = that.data.VideoAddress[e.currentTarget.dataset.postid];
    var active = 'VideoList[' + e.currentTarget.dataset.postid + '].Vactive';
    for (var i = 0; i < that.data.VideoList.length; i++) {
      var Unchecked = 'VideoList[' + i + '].Vactive';
      that.setData({ [Unchecked]: false })
    }
    that.setData({
      VideoUrl: url,
      [active]: true
    });
    console.log(that.data.VideoUrl)
  },
  // 视频点赞
  support: function () {
    var that = this;
    if (that.data.aboutData.is_support > 0) {
      wx.request({
        url: app.InterfaceUrl + 'post_cel_support',
        data: {
          userid: that.data.userid,
          toid: that.data.aboutData.replay_sub_id,
          supType: 3
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
        url: app.InterfaceUrl + 'get_support?userid=' + that.data.userid + '&toid=' + that.data.aboutData.replay_sub_id + '&supType=3',
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
  // 视频收藏
  collection: function () {
    var that = this;
    if (that.data.aboutData.is_collection > 0) {
      wx.request({
        url: app.InterfaceUrl + 'post_cel_collect',
        data: {
          userid: that.data.userid,
          toid: that.data.aboutData.replay_sub_id,
          supType: 3
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
          type: 3,
          toid: that.data.aboutData.replay_sub_id
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
  // 评论列点赞
  like: function (index) {
    var that = this;
    console.log(that.data.commentData[index.currentTarget.dataset.postid].user_id)
    // 获取点赞数 key_dis_list_id
    var supportNum = 'commentData[' + index.currentTarget.dataset.postid + '].support_num';
    var isSupportM = 'commentData[' + index.currentTarget.dataset.postid + '].is_support';
    var isSupport = that.data.commentData[index.currentTarget.dataset.postid].is_support;
    var user_id = that.data.commentData[index.currentTarget.dataset.postid].user_id;
    if (isSupport) {
      wx.request({
        url: app.InterfaceUrl + 'post_cel_support',
        data: {
          userid: that.data.userid,
          toid: user_id,
          supType: 3
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
          userid: that.data.userid,
          toid: that.data.commentData[index.currentTarget.dataset.postid].user_id,
          supType: 3
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
        user_id: that.data.userid,
        to_id: item.currentTarget.dataset.postid.user_id,
        type: 4,
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 视频详情数据
    var VideoAddress = [];
    console.log(options.replay_sub_id);
    wx.request({
      url: app.InterfaceUrl + 'get_replay_detail?replay_sub_id=' + options.replay_sub_id,
      data: {},
      success: function (res) {
        console.log(res.data.data.active);
        for (var i = res.data.data.relative.length - 1; i >= 0; i--) {
          res.data.data.relative[i].Vactive = false;
          res.data.data.relative[0].Vactive = true;
          VideoAddress.push(res.data.data.relative[i].video_url);
        }
        that.setData({
          aboutData: res.data.data.active,
          VideoList: res.data.data.relative,
          VideoAddress: VideoAddress,
          VideoUrl: VideoAddress[0]
        });
        console.log(that.data.VideoUrl);
        console.log(that.data.VideoAddress)
      }
    });
    // 获取评论数据
    wx.request({
      url: app.InterfaceUrl + 'get_allcomment_byid?toid=' + options.replay_sub_id + '&comType=0&comment_to_type=4',
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
          res.data.data[i].ctime = that.getDateDiff(time);

          arrReverse.push(res.data.data[i]);
        }
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
  // 时间戳
  getDateDiff: function (dateTimeStamp) {
    var result;
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var halfamonth = day * 15;
    var month = day * 30;
    var now = new Date().getTime();
    var diffValue = now - dateTimeStamp;
    if (diffValue < 0) {
      result = "刚刚";
    }
    var monthC = diffValue / month;
    var weekC = diffValue / (7 * day);
    var dayC = diffValue / day;
    var hourC = diffValue / hour;
    var minC = diffValue / minute;
    if (monthC >= 1) {
      if (monthC <= 12)
        result = "" + parseInt(monthC) + "月前";
      else {
        result = "" + parseInt(monthC / 12) + "年前";
      }
    }
    else if (weekC >= 1) {
      result = "" + parseInt(weekC) + "周前";
    }
    else if (dayC >= 1) {
      result = "" + parseInt(dayC) + "天前";
    }
    else if (hourC >= 1) {
      result = "" + parseInt(hourC) + "小时前";
    }
    else if (minC >= 1) {
      result = "" + parseInt(minC) + "分钟前";
    } else {
      result = "刚刚";
    }

    return result;
  }
})