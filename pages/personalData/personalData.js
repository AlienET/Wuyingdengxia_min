// pages/personalData/personalData.js
//获取应用实例
const app = getApp()
// 
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 当前用户id
    userid: '',
    // 出生年月
    date: '',
    // 性别
    sex: ['男', '女'],
    index: 0,
    // 城市
    region: ['北京市', '北京市', '东城区'],
    customItem: '全部',
    // 头像 ＵＲＬ
    tempFilePaths: '',
    // 昵称
    username: '李鲫鱼',
    aboutData:[]
  },
  // 医护认证 
  AuthenticationTap:function(){
    wx.navigateTo({
      url: '../Authentication1/Authentication1',
    })
  },
  // 用户昵称
  blurNC: function (e) {
    var that = this;
    that.setData({ username: e.detail.value })
  },
  // 出生年月
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  // 性别
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  // 城市
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  // 更换头像
  BindImage: function () {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        wx.uploadFile({
          url: app.InterfaceUrl + 'upload?type=1', //仅为示例，非真实的接口地址
          filePath: res.tempFilePaths[0],
          name: 'image_file',
          header: { 'content-type': 'multipart/form-data' },
          formData: {
            'data': res.tempFilePaths[0]
          },
          success:function(res){
            console.log(res);
            var imgUrl = JSON.parse(res.data).data.complete_url
            console.log(imgUrl)

            wx.request({
              url: app.InterfaceUrl + 'post_change_myinfo',
              data: {
                userid: app.userData.user_id,
                head_img: imgUrl //头像url
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              method: 'POST',
              success: function (res) {
                console.log(res);
                app.userData.headimg = imgUrl;
              },
              fail: function (error) {
                console.log(error)
              }
            })

            that.setData({'aboutData.headimg':imgUrl})
          }
        })

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({aboutData:app.userData})
    console.log(that.data.aboutData)
    // 当前日期
    var date = util.formatTime(new Date);
    that.setData({ date: date })
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
    var that = this;
    // post_change_myinfo
    wx.request({
      url: app.InterfaceUrl + 'post_change_myinfo',
      data: {
        userid: app.userData.user_id,
        username: that.data.username,//昵称,
        usersex: that.data.sex[that.data.index],//性别
        usercity: that.data.region//城市
        // head_img://头像url
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
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    var that = this;
    // post_change_myinfo
    wx.request({
      url: app.InterfaceUrl + 'post_change_myinfo',
      data: {
        userid: that.data.userid,
        username: that.data.username,//昵称,
        usersex: that.data.sex[that.data.index],//性别
        usercity: that.data.region//城市
        // head_img://头像url
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