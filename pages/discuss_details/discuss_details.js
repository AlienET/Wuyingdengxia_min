// pages/discuss_details/discuss_details.js
// 接口URL
const InterfaceUrl = 'http://39.106.2.216/index.php/API/';
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
    userid:'10003'
  },
  // 评论输入框
  commentInput: function (event) {
    var that = this;
    console.log(event.detail.value);
    wx.request({
      url: InterfaceUrl + 'post_key_dis',
      data: {
        key_dis_id: that.data.key_dis_id,
        user_id: that.data.userid,
        key_dis_content: event.detail.value
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        console.log(res);
        console.log(that.data.key_dis_id);

        wx.request({
          url: InterfaceUrl + 'get_hot_labelList_detail?key_dis_id=' + that.data.key_dis_id,
          data: {},
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            var arrReverse = [];
            var time = '';
            console.log(res.data.data);
            for (var i = res.data.data.user_dis.length - 1; i >= 0; i--) {
              res.data.data.user_dis[i].jubao = false;
              time = res.data.data.user_dis[i].ctime.substring(0, 19);
              time = time.replace(/-/g, '/');
              time = new Date(time).getTime();
              res.data.data.user_dis[i].ctime = that.getDateDiff(time);

              arrReverse.push(res.data.data.user_dis[i]);
            }
            that.setData({
              DiscussListsData: arrReverse
            });
          }
        });
        that.setData({ inputTxt: '' });
      },
      fail: function (error) {
        console.log(errpr);
      }

    })
  },
  // 点赞
  like: function (index) {
    var that = this;
    console.log(that.data.DiscussListsData[index.currentTarget.dataset.postid].key_dis_list_id)
    // 获取点赞数 key_dis_list_id
    var supportNum = 'DiscussListsData[' + index.currentTarget.dataset.postid + '].support_num';
    var isSupportM = 'DiscussListsData[' + index.currentTarget.dataset.postid + '].is_support';
    var isSupport = that.data.DiscussListsData[index.currentTarget.dataset.postid].is_support;
    if (isSupport > 0) {
      wx.request({
        url: InterfaceUrl + 'post_cel_support',
        data: {
          userid: that.data.userid,
          toid: that.data.DiscussListsData[index.currentTarget.dataset.postid].key_dis_list_id,
          supType: 5
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: function (res) {
          console.log(res);
          // 点赞 + 1
          var addNum = parseInt(that.data.DiscussListsData[index.currentTarget.dataset.postid].support_num) - 1;
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
          toid: that.data.DiscussListsData[index.currentTarget.dataset.postid].key_dis_list_id,
          supType: 5
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'GET',
        success: function (res) {
          console.log(res.data);
          // 点赞 + 1
          var addNum = parseInt(that.data.DiscussListsData[index.currentTarget.dataset.postid].support_num) + 1;
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
  report: function (item) {
    console.log(item.currentTarget.dataset.postid.jubao);
    var that = this;
    wx.request({
      url: InterfaceUrl + 'post_report',
      data: {
        user_id: that.data.userid,
        to_id: item.currentTarget.dataset.postid.key_dis_list_id,
        type: 5,
        content: item.currentTarget.dataset.postid.key_dis_content
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
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
    console.log(options.key_dis_id);
    that.setData({
      key_dis_id: options.key_dis_id
    })
    // get_hot_labelList_detail
    wx.request({
      url: InterfaceUrl + 'get_hot_labelList_detail?key_dis_id=' + options.key_dis_id,
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var arrReverse = [];
        var time = '';
        for (var i = res.data.data.user_dis.length - 1; i >= 0; i--) {
          time = res.data.data.user_dis[i].ctime.substring(0, 19);
          time = time.replace(/-/g, '/');
          time = new Date(time).getTime();
          res.data.data.user_dis[i].jubao = false;
          res.data.data.user_dis[i].ctime = that.getDateDiff(time);

          console.log(res.data.data);
          console.log(res.data.data.user_dis[i]);
          console.log(time);
          arrReverse.push(res.data.data.user_dis[i]);
        }
        that.setData({
          aboutData: res.data.data,
          DiscussListsData: arrReverse
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (options) {
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