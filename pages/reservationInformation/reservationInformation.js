// pages/reservationInformation/reservationInformation.js
//获取应用实例
const app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    begin_time: '',
    end_time: '',
    meet_title: '',
    //去程
    // 终点
    terminus: '',
    // 始发
    originating: '',
    //返程
    // 终点
    f_terminus: '',
    // 始发
    f_originating: '',
    //车次选择
    f_train_no: '',
    //备选车次
    f_trainAll: '',
    // 日期
    f_date: '',
    //备注
    FinputTxt:'',
    // 日期
    date: '',
    // 车次
    train_no: '选择车次',
    // 备选车次
    trainAll: '',
    // 车次备注
    inputTxt: '',
    // 专委会
    inputTxtR: '',
    // 入住备注
    inputRemark: '',
    // 入住
    rzdate: '',
    // 离开
    lkdate: '',
    // 初始时间
    startDate: '',
    ji: '3',
    // 
    info: [],
    // 房型
    index: 0,
    fangxin: ['大床房', '标准间单住', '标准间拼住'],
    // 是否帮忙
    isSwitch: false,
    // 专委判断
    remark: true
  },
  // 车次查询
  cccx: function(e) {
    var that = this;
    if (e.currentTarget.dataset.w == '2' || e.currentTarget.dataset.w == '3') {
      if (that.data.originating != '始发' && that.data.terminus != '终点') {
        wx.navigateTo({
          url: '../juhe/juhe?w=' + e.currentTarget.dataset.w + '&start=' + that.data.originating + '&end=' + that.data.terminus + '&date=' + that.data.date,
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })
      } else {
        wx.showToast({
          title: '请选择城市',
          icon: 'none',
          duration: 2000
        })
      }
    } else if (e.currentTarget.dataset.w == '0' || e.currentTarget.dataset.w == '1') {
      wx.navigateTo({
        url: '../juhe/juhe?w=' + e.currentTarget.dataset.w,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }
  },
  // 车次查询
  Fcccx: function(e) {
    var that = this;
    if (e.currentTarget.dataset.w == '6' || e.currentTarget.dataset.w == '7') {
      if (that.data.f_originating != '始发' && that.data.f_terminus != '终点') {
        wx.navigateTo({
          url: '../juhe/juhe?w=' + e.currentTarget.dataset.w + '&start=' + that.data.f_originating + '&end=' + that.data.f_terminus + '&date=' + that.data.f_date,
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })
      } else {
        wx.showToast({
          title: '请选择城市',
          icon: 'none',
          duration: 2000
        })
      }
    } else if (e.currentTarget.dataset.w == '4' || e.currentTarget.dataset.w == '5') {
      wx.navigateTo({
        url: '../juhe/juhe?w=' + e.currentTarget.dataset.w,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }
  },
  // 房型选择
  bindPickerChange: function(e) {
    var that = this;
    that.setData({
      index: e.detail.value
    })
  },
  // 报名提交页面 跳转
  onBmtjTap: function(e) {
    var that = this;
    if (that.data.info.user_identity != '普通' && that.data.info.user_identity != '行业专家') {
      if (that.data.terminus != '终点' && that.data.originating != '始发' && that.data.train_no != '选择车次' && that.data.f_terminus != '终点' && that.data.f_originating != '始发' && that.data.f_train_no != '') {
        wx.request({
          url: app.InterfaceUrl + 'post_attend',
          data: {
            user_id: app.userData.user_id,
            meet_id: that.data.meet_id,
            take_type: '火车',
            car_num1: that.data.train_no,
            from1: that.data.originating,
            to1: that.data.terminus,
            car_num1b: that.data.trainAll,
            from1b: '',
            to1b: '',
            car_num2: that.data.f_train_no,
            from2: that.data.f_originating,
            to2: that.data.f_terminus,
            car_num2b: that.data.f_trainAll,
            from2b: '',
            to2b: '',
            special1: that.data.inputTxt,
            special2: that.data.FinputTxt,
            begin_time: that.data.rzdate,
            end_time: that.data.lkdate,
            remark: that.data.inputRemark,
            together_people: that.data.inputTxtR,
            room_type: that.data.index
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: 'POST',
          success: function(res) {
            console.log(res);
            if (res.data.code == 1) {
              wx.navigateTo({
                url: '../applySubmit/applySubmit',
              })
            } else {
              wx.showToast({
                title: '提交失败...',
                icon: 'none',
                duration: 2000
              })
            }
          },
          fail: function(error) {
            console.log(error)
          }
        })
      } else {
        wx.showToast({
          title: '请完善信息',
          icon: 'none',
          duration: 2000
        })
      }
    } else {
      console.log(1)
      wx.request({
        url: app.InterfaceUrl + 'post_attend',
        data: {
          user_id: app.userData.user_id,
          meet_id: that.data.meet_id,
          take_type: '火车',
          car_num1: that.data.train_no,
          from1: that.data.originating,
          to1: that.data.terminus,
          car_num1b: that.data.trainAll,
          from1b: '',
          to1b: '',
          car_num2: that.data.f_train_no,
          from2: that.data.f_originating,
          to2: that.data.f_terminus,
          car_num2b: that.data.f_trainAll,
          from2b: '',
          to2b: '',
          special1: that.data.inputTxt,
          special2: that.data.FinputTxt,
          begin_time: that.data.rzdate,
          end_time: that.data.lkdate,
          remark: that.data.inputRemark,
          together_people: that.data.inputTxtR,
          room_type: that.data.index
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: function(res) {
          console.log(res);
          if (res.data.code == 1) {
            wx.navigateTo({
              url: '../applySubmit/applySubmit',
            })
          } else {
            wx.showToast({
              title: '提交失败...',
              icon: 'none',
              duration: 2000
            })
          }
        },
        fail: function(error) {
          console.log(error)
        }
      })
    }
  },
  // 日期
  bindDateChange: function(e) {
    var that = this;
    this.setData({
      date: e.detail.value
    })
  },
  // 日期
  FbindDateChange: function (e) {
    var that = this;
    this.setData({
      f_date: e.detail.value
    })
  },
  bindruzhuChange: function(e) {
    var that = this;
    this.setData({
      rzdate: e.detail.value
    })
    console.log(that.data.rzdate)
  },
  bindlikaiChange: function(e) {
    var that = this;
    this.setData({
      lkdate: e.detail.value
    })
    console.log(that.data.lkdate)
  },
  onhuanTap: function() {
    var that = this;
    var terminus = that.data.terminus;
    var originating = that.data.originating;
    if (terminus == '终点' || originating == '始发') {
      wx.showToast({
        title: '请选择城市',
        icon: 'none',
        duration: 2000
      })
    } else {
      that.setData({
        terminus: originating,
        originating: terminus
      })
    }
  },
  // 备注
  bzxx: function(event) {
    var that = this;
    console.log(event.detail.value)
    that.setData({
      inputTxt: event.detail.value
    })
  },
  // fan备注
  Fbzxx: function (event) {
    var that = this;
    console.log(event.detail.value)
    that.setData({
      FinputTxt: event.detail.value
    })
  },
  // 住房备注
  zfbz: function(e) {
    var that = this;
    that.setData({
      inputRemark: e.detail.value
    })
  },
  bzxxR: function(event) {
    var that = this;
    console.log(event.detail.value)
    that.setData({
      inputTxtR: event.detail.value
    })
  },
  //几晚
  onjiTap: function() {
    console.log('1')
  },
  // 是否订票 切换
  switchChange: function(e) {
    var that = this;
    console.log(e.detail.value)
    that.setData({
      isSwitch: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var startDate = util.formatTime(new Date);
    console.log(startDate)
    that.setData({
      startDate: startDate,
      date: startDate,
      f_date: startDate,
      rzdate: startDate,
      lkdate: startDate,
      meet_id: options.meet_id
    })
    wx.request({
      url: app.InterfaceUrl + 'get_myinfo?userid=' + app.userData.user_id + '&current_userid=' + app.userData.user_id,
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(res.data.data)
        if (res.data.data.user_identity < 5) {
          that.setData({
            isSwitch: true,
            remark: false
          })
        }
        if (res.data.data.user_identity == 0) {
          res.data.data.user_identity = '主任委员'
        } else if (res.data.data.user_identity == 1) {
          res.data.data.user_identity = '副主任委员'
        } else if (res.data.data.user_identity == 2) {
          res.data.data.user_identity = '常务副主任委员'
        } else if (res.data.data.user_identity == 3) {
          res.data.data.user_identity = '秘书'
        } else if (res.data.data.user_identity == 4) {
          res.data.data.user_identity = '青年委员'
        } else if (res.data.data.user_identity == 5) {
          res.data.data.user_identity = '行业专家'
        } else if (res.data.data.user_identity == 6) {
          res.data.data.user_identity = '普通'
        } else {
          res.data.data.user_identity = '委员'
        }
        that.setData({
          info: res.data.data
        })
      },
    })
    that.setData({
      begin_time: options.begin_time,
      end_time: options.end_time,
      meet_title: options.meet_title,
      aboutData: app.userData,
      originating: app.originating,
      terminus: app.staName,
      f_originating: app.f_originating,
      f_terminus: app.f_staName
    })
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
    var that = this;
    console.log(app.staName)
    if (app.j == '0') {
      that.setData({
        originating: app.staName
      })
    } else if (app.j == '1') {
      that.setData({
        terminus: app.staName
      })
    } else if (app.j == '2') {
      that.setData({
        train_no: app.staName
      })
    } else if (app.j == '3') {
      that.setData({
        trainAll: app.staName
      })
    } else if (app.j == '4') {
      that.setData({
        f_originating: app.staName
      })
    } else if (app.j == '5') {
      that.setData({
        f_terminus: app.staName
      })
    } else if (app.j == '6') {
      that.setData({
        f_train_no: app.staName
      })
    } else if (app.j == '7') {
      that.setData({
        f_trainAll: app.staName
      })
    }
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