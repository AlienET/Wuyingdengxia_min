// pages/authorInfo/authorInfo.js
var RSA = require('../../utils/wx_rsa.js');
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    aboutData: [],
    articleList: []
  },
  onArticleDetailTap: function(articleid) {
    wx.navigateTo({
      url: '../article_detail/article_detail?articleid=' + articleid.currentTarget.dataset.postid,
    })
  },
  // 关注
  follow: function() {
    var that = this;
    var data = new Object();
    data.userid = app.userData.userid;
    data.befollid = that.data.aboutData.userid;
    data = JSON.stringify(data); // 转JSON字符串
    var data = RSA.sign(data);
    if (that.data.aboutData.is_follow > 0) {
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
            'aboutData.is_follow': 0
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
          console.log(res)
          that.setData({
            'aboutData.is_follow': 1
          })
        },
        fail: function(error) {
          console.log(error);
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var data = new Object();
    data.userid = options.userid;
    data.current_userid = app.userData.userid;
    data = JSON.stringify(data); // 转JSON字符串
    var data = RSA.sign(data);
    wx.request({
      url: app.InterfaceUrl + 'usermanage/getUserInfo',
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
          aboutData: res.data.data
        });
        var obj = new Object();
        obj.userphone = res.data.data.phoneNum;
        obj = JSON.stringify(obj); // 转JSON字符串
        var data = RSA.sign(obj);
        wx.request({
          url: app.InterfaceUrl + 'homepagemanage/getMyArticle',
          data: {
            data: data
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function(res) {
            console.log(res)
            for (var i = 50 - 1; i >= 0; i--) {
              if (res.data.data[i].article_img_path != '') {
                res.data.data[i].article_img_path = res.data.data[i].article_img_path.split(',');
              }
            }
            var arr = [];
            for (var i = 50 - 1; i >= 0; i--) {
              if (res.data.data[i].is_check == '1') {
                arr.push(res.data.data[i])
              }
            }
            console.log(res.data.data)
            that.setData({
              articleList: arr
            })
            console.log(that.data.articleList)

          }
        })
      }
    });

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

  }
})