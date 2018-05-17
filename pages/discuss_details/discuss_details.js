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
    DiscussListsData: []
  },
  // 点赞
  like: function (index) {
    var that = this;
    console.log(index.currentTarget.dataset.postid)
    // 获取点赞数
    var supportNum = 'DiscussListsData[' + index.currentTarget.dataset.postid + '].support_num';
    var isSupportM = 'DiscussListsData[' + index.currentTarget.dataset.postid + '].is_support';
    var isSupport = that.data.DiscussListsData[index.currentTarget.dataset.postid].is_support;
    console.log(isSupport)
    if (isSupport > 0) {
      wx.request({
        url: InterfaceUrl + 'post_cel_support',
        data: {
          userid: 10003,
          toid: 1,
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
          userid: 10003,
          toid: 1,
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
  luelue:function(index){
    var that = this;
    // console.log(index.currentTarget.dataset.postid);
    var jubao = 'DiscussListsData[' + index.currentTarget.dataset.postid + '].jubao';
    var Fjubao = that.data.DiscussListsData[index.currentTarget.dataset.postid].jubao;
    if(Fjubao){
      that.setData({
        [jubao]: false
      })
    }else{
      that.setData({
        [jubao]: true
      })
    }
  },
  // 举报
  report: function (item) {
    console.log(item.currentTarget.dataset.postid.jubao);
    var that =this;
    wx.request({
      url: InterfaceUrl + 'post_report',
      data: {
        user_id: 10003,
        to_id: item.currentTarget.dataset.postid.key_dis_list_id,
        supType: 5,
        content: item.currentTarget.dataset.postid.key_dis_content
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        console.log(res);
        // 隐藏 ‘举报’
        for (var i = that.data.DiscussListsData.length - 1 ;i>=0;i--){
          var DiscussListsData_jubao = 'DiscussListsData[' + i + '].jubao'
          that.setData({
            [DiscussListsData_jubao]:false
          })
        }
        // 提示框
        wx.showToast({
          title: '举报成功',
          duration: 1000,
        })
      },
      fail: function (error) {
        
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options.key_dis_id);
    // get_hot_labelList_detail
    wx.request({
      url: InterfaceUrl + 'get_hot_labelList_detail?key_dis_id=' + options.key_dis_id,
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var arrReverse = [];
        console.log(res.data.data);
        for (var i = res.data.data.user_dis.length - 1; i >= 0; i--) {
          res.data.data.user_dis[i].jubao = false;
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

  }
})