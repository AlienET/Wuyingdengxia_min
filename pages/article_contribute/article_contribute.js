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
    labels:[]
  },
  // 添加标签
  addLabel:function(){
    var that = this;
    wx.navigateTo({
      url: '../myNavEdit/myNavEdit',
    })
    wx.request({
      url: app.InterfaceUrl + 'get_labels?type=1&userid='+that.data.userid,
      success:function(res){
        console.log(res.data.data)
        that.setData({labels:res.data.data})
      }
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
    // 图片转码
    var data = {
      data: that.data.tempFilePaths[0]
    }
    wx.uploadFile({
      url: app.InterfaceUrl + 'upload', //仅为示例，非真实的接口地址
      filePath: that.data.tempFilePaths[0],
      name: 'image_file',
      // header: {'content-type':'multipart/form-data'},
      formData: {
        'type': 1,
        'data': data
      },
      success: function (res) {
        var data = res.data
        console.log(res);
        //do something
      },
      fail:function(error){
        console.log(error)
      }
    });
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
    if (that.data.isInner && that.data.isTit) {
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