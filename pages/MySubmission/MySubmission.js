// pages/MySubmission/MySubmission.js
var RSA = require('../../utils/wx_rsa.js');
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 列 数据
    aboutData:[]
  },
  myArticle:function(e){
    console.log(e.currentTarget.dataset.postid);
    wx.navigateTo({
      url: '../article_detail/article_detail?articleid=' + e.currentTarget.dataset.postid,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var data = new Object();
    data.userphone = app.userData.phoneNum;
    data = JSON.stringify(data); // 转JSON字符串
    var data = RSA.sign(data);
    wx.request({
      url: app.InterfaceUrl+'homepagemanage/getMyArticle',
      data: {
        data: data
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(res){
        console.log(res);
        var arrReverse = [];
        var time = '';
        if(res.data.msg != '无投稿信息'){
          for (var i = res.data.data.length - 1; i >= 0; i--) {
            time = res.data.data[i].ctime.substring(0, 19);

            time = time.replace(/-/g, '/');
            time = new Date(time).getTime();
            res.data.data[i].jubao = false;
            res.data.data[i].ctime = app.getDateDiff(time);

            arrReverse.push(res.data.data[i]);
          }
        }
        that.setData({
          aboutData: arrReverse
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