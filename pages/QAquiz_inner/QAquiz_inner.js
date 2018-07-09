// pages/QAquiz_inner/QAquiz_inner.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid: '10003',
    imgSrc: '',
    // 当前月亮币
    currentMoonY: '',
    // 当前月亮币数额
    moonNum: { num: '￥', active: false },
    // 选择悬赏月亮币 [0,10,20,50,100]
    moonY: [
      { num: 0, active: false },
      { num: 10, active: false },
      { num: 20, active: false },
      { num: 50, active: false },
      { num: 100, active: false }
    ],
    // 选取月亮币状态
    isMoon: false,
    // --------------------------------------------------
    // 提问 - 标题
    quesTitle: '',
    // 是否匿名
    conceal: true,
    labels: [],
    textarea: '',
    imgUrl:''
  },
  tijiao: function () {
    var that = this;
    console.log('11111111111111111')
    if (that.data.labels != '' && that.data.moonNum.num != '￥' && that.data.textarea != '') {
      var labels = that.data.labels.join(',')
      wx.request({
        url: app.InterfaceUrl + 'post_question',
        data: {
          userid: app.userData.user_id,
          quesTitle: that.data.quesTitle,
          moonCash: that.data.moonNum.num,
          quesContent: that.data.textarea,
          quesType:1,
          img_path:that.data.imgUrl,
          questags:labels
        },
        method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: function (res) {
          console.log(res)
          if (res.data.code == '1'){
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 2000,
              success:function(){
                wx.switchTab({
                  url: '../quick_quiz/quick_quiz'
                })
              }
            })
          }else{
            wx.showToast({
              title: '提交失败...',
              icon: 'none',
              duration: 2000,
            })
          }
        }
      })
    } else {
      wx.showToast({
        title: '请完善填写项目',
        icon: 'none',
        duration: 2000
      })
    }
  },
  textareaTap: function (event) {
    var that = this;
    that.setData({ textarea: event.detail.value })
    console.log(that.data.textarea)
  },
  // 切换 选取状态
  moonTap: function () {
    var that = this;
    var isMoon = !that.data.isMoon;
    that.setData({
      isMoon: isMoon
    })
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
      url: '../myNavEdit/myNavEdit?who=4',//addLabel
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
    var that = this;
    that.setData({ conceal: event.detail.value });
    console.log(that.data.conceal)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options.quesTitle);
    that.setData({
      quesTitle: options.quesTitle,
      currentMoonY: app.userData.moon_cash
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
    var that = this;
    if (app.labels != '') {
      console.log(app.labels)
      // var labelName = app.labels.join(',');
      that.setData({ labels: app.labels })
      console.log(that.data.labels)
    }
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