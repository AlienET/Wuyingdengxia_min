// pages/Authentication1/Authentication1.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    aboutData: [],
    // 当前用户id
    userid: '',
    // 真实姓名
    user_name: '',
    // 联系电话
    user_phone: '13456789',
    // 身份证号
    user_id: '',
    // 您的身份
    index: 6,
    identity: ['主任委员', '副主任委员', '常务副主任委员', '秘书', '青年委员', '委员', '普通', '行业专家'],
    // 专委会
    indexs: 10,
    zhuan: ['手术装备与材料专业委员会', '内镜装备与材料专业委员会', '护理设备专业委员会', '耗材管理专业委员会', '血液净化装备与材料专业委员会', '区域器材灭菌管理专业委员会', '安全防护专业委员会', '康复与老年护理专业委员会', '介入装备与材料专业委员会', '重症医学装备与材料专业委员会',' 无 ']
  },
  // 真实姓名
  blurUserName: function (e) {
    this.setData({ user_name: e.detail.value })
  },
  // 联系电话
  blurIDnumber: function (e) {
    this.setData({ user_id: e.detail.value })
  },
  // 职务
  bindPickerChange: function (e) {
    // event.detail = {value: value}
    this.setData({ index: e.detail.value })
  },
  // 专委会
  bindzhuanChange: function (e) {
    // event.detail = {value: value}
    this.setData({ indexs: e.detail.value })
  },
  // 下一步
  OnNextStepTap: function () {
    var that = this;
    // post_change_myinfo
    if (that.data.user_name != '' && that.data.user_id != '') {
      wx.navigateTo({
        url: '../Authentication2/Authentication2',
        success: function () {
          app.rzxx.realName = that.data.user_name,//真实姓名,
          app.rzxx.useridcard = that.data.user_id,//身份证号
            app.rzxx.user_identity = Number(that.data.index)+1,//您的身份
            app.rzxx.special_committee = Number(that.data.indexs)+1//委员
        }
      })
    } else {
      wx.showToast({
        title: '请完善信息',
        icon: 'none',
        duration: 1500
      })
    }



  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(app.userData)
    that.setData({
      aboutData: app.userData,
      user_id: app.userData.userIdcard,
      user_name: app.userData.userReal_name,
      indexs: Number(app.userData.special_committee)-1,
      index: Number(app.userData.user_identity)-1
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

  }
})