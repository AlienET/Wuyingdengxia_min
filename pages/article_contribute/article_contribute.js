// pages/article_contribute/article_contribute.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 当前用户id
    suerid: '10003',
    // 状态  内容
    isInner: false,
    // 状态 标题
    isTit: false,
    // 投稿 状态
    isSubmission: false,
    // 标题
    titleText: '',
    // 内容
    innerText: '',
    // 本地图片路径集合
    tempFilePaths: [],
    // 标签列 数据
    labels: [],
    // 上传成功返回图片URL集合
    imgUrl: []
  },
  // 添加标签
  addLabel: function () {
    var that = this;
    wx.navigateTo({
      url: '../myNavEdit/myNavEdit?who=0',
    })

  },
  // 添加图片
  addImg: function () {
    var that = this;
    wx.chooseImage({
      count: 5, // 默认9
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
  // 投稿
  Submission: function () {
    var that = this;
    console.log(this.data.titleText)
    console.log(this.data.innerText)
    if (that.data.isInner && that.data.isTit && that.data.labels != '') {
      that.setData({ isSubmission: true })
    } else { that.setData({ isSubmission: false }) }
    if (that.data.isSubmission) {
      // 判断图片
      if (that.data.tempFilePaths.length > 0) {
        // 图片转码
        for (var i = that.data.tempFilePaths.length - 1; i >= 0; i--) {
          var data = { data: that.data.tempFilePaths[i] }
          wx.uploadFile({
            url: app.InterfaceUrl + 'upload?type=1', //仅为示例，非真实的接口地址
            filePath: that.data.tempFilePaths[i],
            name: 'image_file',
            header: { 'content-type': 'multipart/form-data' },
            formData: {
              'data': data
            },
            success: function (res) {
              var imgUrl = JSON.parse(res.data).data.url
              that.data.imgUrl.push(imgUrl);
              that.setData({ imgUrl: that.data.imgUrl });
              console.log(that.data.imgUrl);
            },
            fail: function (error) {
              console.log(error)
            }
          });
        }
      }
      var labels = that.data.labels.join(',');
      //投稿
      wx.request({
        url: app.InterfaceUrl + 'post_article',
        data: {
          userid: app.userData.user_id,
          articleTitle: that.data.titleText,
          articleContent: that.data.innerText,
          articleType: '',
          articleClass: labels,
          articleImg: that.data.imgUrl
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: function (res) {
          if (res.data.code == '1') {
            wx.navigateTo({
              url: '../contribute_error/contribute_error?code=1',
            })
          } else {
            wx.navigateTo({
              url: '../contribute_error/contribute_error?code=0',
            })
          }
        }
      })
    }

  },
  // 内容监听
  isinnertext: function (e) {
    var that = this;
    console.log(e.detail.value)
    if (e.detail.value == '') {
      that.setData({ isInner: false })
    } else {
      that.setData({
        isInner: true,
        innerText: e.detail.value

      })
    }
    if (that.data.isInner && that.data.isTit && that.data.labels != '') {
      that.setData({ isSubmission: true })
    } else { that.setData({ isSubmission: false }) }
  },
  // 标题监听
  istitletext: function (e) {
    var that = this;
    console.log(e.detail.value)
    if (e.detail.value == '') {
      that.setData({ isTit: false })
    } else {
      that.setData({
        isTit: true,
        titleText: e.detail.value
      })
    }
    if (that.data.isInner && that.data.isTit && that.data.labels != '') {
      that.setData({ isSubmission: true })
    } else { that.setData({ isSubmission: false }) }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.labels = '';
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
    var that = this;
    if (app.labels != '') {
      console.log(app.labels)
      // var labelName = app.labels.join(',');
      that.setData({ labels: app.labels })
      console.log(that.data.labels)
    }
    if (that.data.isInner && that.data.isTit && that.data.labels != '') {
      that.setData({ isSubmission: true })
    } else { that.setData({ isSubmission: false }) }
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