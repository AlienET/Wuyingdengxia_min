// pages/Authentication3/Authentication3.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 添加照片列
    tempFilePaths: [],
    // 上传成功过返回图片URL
    imgUrl: []
  },
  // 添加图片
  addImg: function () {
    var that = this;
    wx.chooseImage({
      count: 3, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        for (var i = res.tempFilePaths.length - 1; i >= 0; i--) {
          that.data.tempFilePaths.push(res.tempFilePaths[i])
        }
        that.setData({ tempFilePaths: that.data.tempFilePaths })
        console.log(that.data.tempFilePaths)
      }
    })
  },
  // 删除照片
  imgDelete: function (e) {
    var that = this;
    console.log(e.currentTarget.dataset.deleteimg)
    var tempFilePaths = that.data.tempFilePaths;
    tempFilePaths.splice(e.currentTarget.dataset.deleteimg, 1);
    that.setData({ tempFilePaths: tempFilePaths })
    console.log(that.data.tempFilePaths)
  },
  // 下一步
  OnNextStepTap: function () {
    var that = this;
    if (that.data.tempFilePaths.length == 0) {
      wx.showToast({
        title: '请添加认证材料',
        icon: 'none',
        duration: 1500
      })
    } else {
      wx.showLoading({
        title: '提交中',
        success:function(e){
          wx.request({
            url: app.InterfaceUrl + 'post_change_myinfo',
            data:{
              userid:app.userData.user_id,
              realName: app.rzxx.realName,
              useridcard: app.rzxx.useridcard,
              user_identity: app.rzxx.user_identity,
              special_committee: app.rzxx.special_committee,
              userhospital: app.rzxx.userhospital,
              useroffice: app.rzxx.useroffice,
              userpost: app.rzxx.userpost
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            success: function (res) {
              console.log(res);
            },
            fail: function (error) {
              console.log(error)
            }
          })
        }
      })
      var imgUrl = [];
      for (var i = that.data.tempFilePaths.length - 1; i >= 0; i--) {
        wx.uploadFile({
          url: app.InterfaceUrl + 'upload?type=1', //仅为示例，非真实的接口地址
          filePath: that.data.tempFilePaths[i],
          name: 'file',
          formData: {
            'data': that.data.tempFilePaths[i]
          },
          success: function (res) {
            console.log(res)
            var data = JSON.parse(res.data).data.url;
            console.log(data)
            imgUrl.push(data);
            console.log(imgUrl)
            //do something
          }
        })
      }

      var timer = setInterval(function () {
        if (imgUrl.length == that.data.tempFilePaths.length) {
          imgUrl = imgUrl.join(',');
          console.log(imgUrl)
          wx.request({
            url: app.InterfaceUrl + 'post_usercerti',
            data: {
              userid: app.userData.user_id,
              imgpath: imgUrl,
              certtype: 1,
              user_token: app.userData.user_token//                缺token
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            success: function (res) {
              console.log(res);
              if (res.data.code == '0') {
                wx.showToast({
                  title: '提交失败',
                  icon: 'none',
                  duration: 1500
                })
              } else {
                wx.navigateTo({
                  url: '../MSSubSuccess/MSSubSuccess',
                })
              }
            },
          })
          clearInterval(timer);
        }
      }
        , 1500)


      // wx.hideLoading()
    }
  },
  // 上一步
  OnlastStepTap: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    wx.hideLoading()
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