// pages/index/article_detail/article_detail.js

// 接口URL
const InterfaceUrl = 'http://39.106.2.216/index.php/API/';
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
    inputTxt: ''
  },
  // 评论输入框
  commentInput: function (event) {
    var that = this;
    console.log(event.detail.value);
    wx.request({
      url: InterfaceUrl + 'post_comment',
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
          url: InterfaceUrl + 'get_allcomment_byid?toid=' + that.data.articleid + '&comType=0&comment_to_type=0',
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

              // console.log(res.data.data);
              // console.log(time);
              arrReverse.push(res.data.data[i]);
            }
            that.setData({
              commentData: arrReverse
            });
            // console.log(that.data.commentData)
          }
        })
        that.setData({ inputTxt: '' });
      },
      fail: function (error) {
        console.log(errpr);
      }

    })
  },
  // 关注
  follow: function () {
    var that = this;
    if (that.data.aboutData.is_follow > 0) {
      wx.request({
        url: InterfaceUrl + 'post_cel_follow',
        data: {
          userid: that.data.userid,
          befollid: that.data.aboutData.user_id
        },
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        method: "POST",
        success: function (res) {
          console.log(res)
          var isFollow = that.data.aboutData.is_follow;
          that.setData({
            'isFollow': 0
          })
          console.log(isFollow)
        },
        fail: function (error) {
          console.log(error);
        }
      })
    } else {
      wx.request({
        url: InterfaceUrl + 'post_follow',
        data: {
          userid: that.data.userid,
          befollid: that.data.aboutData.user_id
        },
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        method: "POST",
        success: function (res) {
          var isFollow = that.data.aboutData.is_follow;
          that.setData({
            'isFollow': 1
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
    var supportNum = 'commentData[' + index.currentTarget.dataset.postid + '].support_num';
    var isSupportM = 'commentData[' + index.currentTarget.dataset.postid + '].is_support';
    var isSupport = that.data.commentData[index.currentTarget.dataset.postid].is_support;
    var user_id = that.data.commentData[index.currentTarget.dataset.postid].user_id;
    if (isSupport) {
      wx.request({
        url: InterfaceUrl + 'post_cel_support',
        data: {
          userid: that.data.userid,
          toid: 'user_id',
          supType: 1
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
        url: InterfaceUrl + 'get_support',
        data: {
          userid: that.data.userid,
          toid: that.data.commentData[index.currentTarget.dataset.postid].user_id,
          supType: 5
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
      url: InterfaceUrl + 'post_report',
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
        url: InterfaceUrl + 'post_cel_support',
        data: {
          userid: that.data.userid,
          toid: that.data.aboutData.articleid,
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
        url: InterfaceUrl + 'get_support?userid=' + that.data.userid + '&toid=' + that.data.aboutData.articleid + '&supType=1',
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
        url: InterfaceUrl + 'post_cel_collect',
        data: {
          userid: that.data.userid,
          toid: that.data.aboutData.articleid,
          supType: 1
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
        url: InterfaceUrl + 'post_collection',
        data: {
          userid:that.data.userid,
          type: 1,
          toid:that.data.aboutData.articleid
        },
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        method:'POST',
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
  onShareTop:function(){
    wx.showActionSheet({
      itemList: ['分享给微信好友', '分享到朋友圈'],
      success: function (res) {
        console.log(res.tapIndex)
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var that = this;
    that.setData({
      userid: options.userid,
      articleid: options.articleid
    });
    wx.request({
      url: InterfaceUrl + 'get_articleinfo_byid?articleid=' + options.articleid + '&userid=' + options.userid,
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data.data);
        res.data.data.article_tags = res.data.data.article_tags.split(',');
        that.setData({
          aboutData: res.data.data
        });
        // article_tags
        console.log(that.data.aboutData.article_tags)
      }
    });
    // 获取评论数据
    wx.request({
      url: InterfaceUrl + 'get_allcomment_byid?toid=' + that.data.articleid + '&comType=0&comment_to_type=0',
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