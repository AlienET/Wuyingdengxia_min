// pages/replay/replay.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    aboutData: null,
    commentData:[]
  },
  // 关注
  follow: function () {
    var that = this;
    if (that.data.aboutData.is_follow > 0) {
      wx.request({
        url: app.InterfaceUrl + 'post_cel_follow',
        data: {
          userid: app.userData.user_id,
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
          userid: app.userData.user_id,
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
    if (isSupport > 0) {
      wx.request({
        url: app.InterfaceUrl + 'post_cel_support',
        data: {
          userid: app.userData.user_id,
          toid: comment_id,
          supType: 1
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
          userid: app.userData.user_id,
          toid: that.data.commentData[index.currentTarget.dataset.postid].comment_id,
          supType: 1
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
        user_id: app.userData.user_id,
        to_id: item.currentTarget.dataset.postid.user_id,
        type: 0,
        to_type: 3,
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
          title: res.data.msg,
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
    console.log(options.comment_id)
    var that = this;
    that.setData({
      comment_id: options.comment_id
    })
    wx.request({
      url: app.InterfaceUrl + 'get_comment_detail?comment_id=' + options.comment_id+'&userid='+app.userData.user_id,
      success: function (res) {
        that.setData({ aboutData: res.data.data })
        console.log(that.data.aboutData)
      }
    })
    wx.request({
      url: app.InterfaceUrl + 'get_allcomment_byid?toid='+options.comment_id+'&comType=1&comment_to_type=3',
      success: function (res) {
        console.log(res.data.data)
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

  }
})