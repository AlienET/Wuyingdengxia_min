// pages/AddInvoice/AddInvoice.js
var RSA = require('../../utils/wx_rsa.js');
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //类型
    lx: '0',
    //姓名
    gr: '',
    //企业抬头
    tt: '',
    //税号
    sh: '',
    //修改或者添加
    or: false,
    //修改的id
    rId: ''
  },
  //发票类型
  radioChange: function(e) {
    console.log(e.detail.value)
    var that = this;
    that.setData({
      lx: e.detail.value
    })
  },
  //个人
  bindGRInput: function(e) {
    console.log(e.detail.value)
    var that = this;
    that.setData({
      gr: e.detail.value
    })
  },
  //公司抬头
  bindTTInput: function(e) {
    console.log(e.detail.value)
    var that = this;
    that.setData({
      tt: e.detail.value
    })
  },
  //税号
  bindSHInput: function(e) {
    console.log(e.detail.value)
    var that = this;
    that.setData({
      sh: e.detail.value
    })
  },
  //保存
  PreservationTap: function() {
    var that = this;

    if (that.data.lx == 0) {
      if (that.data.gr != '') {
        if (that.data.or) {
          var data = new Object();
          data.user_id = app.userData.userid;
          data.receipt_type = that.data.lx;
          data.bill_person_name = that.data.gr;
          data.receipt_id = that.data.rId;
          data.receipt_info = that.data.tt;
          data.tax_num = that.data.sh;
          data = JSON.stringify(data); // 转JSON字符串
          var data = RSA.sign(data);
          wx.request({
            url: app.InterfaceUrl + 'usermanage/editUserReceiptInfo',
            data: {
              data: data
            },
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function(res) {
              console.log(res);
              wx.showToast({
                title: '操作成功',
                icon: 'success',
                duration: 3000,
                success: function() {
                  wx.navigateBack({
                    delta: 1
                  })
                }
              })
            }
          })
        } else {
          var data = new Object();
          data.user_id = app.userData.userid;
          data.receipt_type = '0';
          data.bill_person_name = that.data.gr;
          data = JSON.stringify(data); // 转JSON字符串
          var data = RSA.sign(data);
          wx.request({
            url: app.InterfaceUrl + 'usermanage/addUserReceiptInfo',
            data: {
              data: data
            },
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function(res) {
              console.log(res);
              wx.showToast({
                title: '操作成功',
                icon: 'success',
                duration: 3000,
                success: function() {
                  wx.navigateBack({
                    delta: 1
                  })
                }
              })
            }
          })
        }
      } else {
        wx.showToast({
          title: '请完善信息',
          icon: 'none',
          duration: 1500
        })
      }
    } else {
      if (that.data.tt != '' && that.data.sh != '') {
        if (that.data.or) {
          var data = new Object();
          data.user_id = app.userData.userid;
          data.receipt_type = that.data.lx;
          data.bill_person_name = that.data.gr;
          data.receipt_id = that.data.rId;
          data.receipt_info = that.data.tt;
          data.tax_num = that.data.sh;
          data = JSON.stringify(data); // 转JSON字符串
          var data = RSA.sign(data);
          wx.request({
            url: app.InterfaceUrl + 'usermanage/editUserReceiptInfo',
            data: {
              data: data
            },
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function(res) {
              console.log(res);
              wx.showToast({
                title: '操作成功',
                icon: 'success',
                duration: 3000,
                success: function() {
                  wx.navigateBack({
                    delta: 1
                  })
                }
              })
            }
          })
        } else {
          var data = new Object();
          data.user_id = app.userData.userid;
          data.receipt_type = '1';
          data.receipt_info = that.data.tt;
          data.tax_num = that.data.sh;
          data = JSON.stringify(data); // 转JSON字符串
          var data = RSA.sign(data);
          wx.request({
            url: app.InterfaceUrl + 'usermanage/addUserReceiptInfo',
            data: {
              data: data
            },
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function(res) {
              console.log(res);
              wx.showToast({
                title: '操作成功',
                icon: 'success',
                duration: 3000,
                success: function() {
                  wx.navigateBack({
                    delta: 1
                  })
                }
              })
            }
          })
        }
      } else {
        wx.showToast({
          title: '请完善信息',
          icon: 'none',
          duration: 1500
        })
      }
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    if (options.receipt_id) {
      console.log(options);
      that.setData({
        lx: options.receipt_type,
        gr: options.bill_person_name,
        tt: options.receipt_info,
        sh: options.tax_num,
        rId: options.receipt_id,
        or: true
      })
    }
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