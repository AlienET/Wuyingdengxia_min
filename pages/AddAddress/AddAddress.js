// pages/AddAddress/AddAddress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 城市
    region: ['北京市', '北京市', '东城区'],
    // customItem: '全部',
    //收件人
    name: '',
    //手机号
    phone: '',
    //详细信息
    information: ''
  },
  //收件人
  bindNameInput: function(e) {
    var that = this;
    console.log(e.detail.value)
    that.setData({
      name: e.detail.value
    })
  },
  // 城市
  bindRegionChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  // 手机
  bindPhoneInput: function(e) {
    var that = this;
    console.log(e.detail.value)
    that.setData({
      phone: e.detail.value
    })
  },
  // 详细信息
  bindInformationInput: function(e) {
    var that = this;
    console.log(e.detail.value)
    that.setData({
      information: e.detail.value
    })
  },
  //保存信息
  PreservationTap: function() {
    var that = this;
    console.log(that.data.name)
    console.log(that.data.region)
    console.log(that.data.phone)
    console.log(that.data.information)
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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