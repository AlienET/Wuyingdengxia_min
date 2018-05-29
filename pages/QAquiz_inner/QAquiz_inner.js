// pages/QAquiz_inner/QAquiz_inner.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: '',
    // 当前月亮币
    currentMoonY: 90,
    // 当前月亮币数额
    moonNum: { num: '￥', active: false },
    // 选择悬赏月亮币 [0,10,20,50,100]
    moonY: [
      { num: 0, active: false },
      { num: 10, active: false },
      { num: 20, active: false },
      { num: 50, active: false },
      { num: 100, active: false }
    ]
  },
  // 选择月亮币
  chooseMoon: function (item, idx) {
    var that = this;
    if (item.currentTarget.dataset.item.num > that.data.currentMoonY) {
      return;
    } else {
      console.log(item.currentTarget.dataset.item);
      console.log(item.currentTarget.dataset.idx);
      var active = 'moonY[' + item.currentTarget.dataset.idx + '].active';
      var num = that.data.moonY[item.currentTarget.dataset.idx].num;
      for (var i = that.data.moonY.length - 1; i >= 0; i--) {
        var defout = 'moonY[' + i + '].active';
        that.setData({ [defout]: false })
      }
      that.setData({
        [active]: true,
        'moonNum.num': num,
        'moonNum.active': true,
      })
      // var state_idx = 'aboutData[' + e.currentTarget.dataset.idx + '].state';
      // that.setData({ [state_idx]: false })
    }

  },
  // 标签选取
  onAddLabelTap: function () {
    wx.navigateTo({
      url: '../addLabel/addLabel',
    })
  },
  // 选取照片
  onchooseImage: function () {
    wx.chooseImage({
      count: 5, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths);

      }
    })
  },
  // 匿名状态
  switchChange: function (event) {
    console.log(event.detail.value)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.quesTitle)
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