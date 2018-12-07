// pages/myNavEdit/myNavEdit.js
var RSA = require('../../utils/wx_rsa.js');
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用户id
    userid: '',
    // 导航推荐
    tjlabel: [],
    // 我的导航
    mylabel: [],
    // 是否编辑
    isEdit: false,
    isType: ''
  },
  // 换一批 刷新导航推荐
  refresh: function() {
    var that = this;
    // 导航推荐
    // var types = that.data.isType =='0'?parseInt(that.data.isType)+1:that.data.isType;
    var types = (that.data.isType == '0' || that.data.isType == '1') ? '1' : '3';
    var data = new Object();
    data.userid = app.userData.userid;
    data.limit = '15';
    data.type = types;
    var data = JSON.stringify(data); // 转JSON字符串
    data = RSA.sign(data);
    wx.request({
      url: app.InterfaceUrl + 'homepagemanage/randomGetLabels', //仅为示例，并非真实的接口地址
      data: {
        data: data
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: 'POST',
      success: function(res) {
        console.log(res)
        that.setData({
          tjlabel: res.data.data,
        });
      }
    });
  },
  // 删除 我的导航中某一项
  deleteItem: function(index) {
    var that = this;
    console.log(index.currentTarget.dataset.postid);
    var mylabel = that.data.mylabel;
    mylabel.splice(index.currentTarget.dataset.postid, 1);
    console.log(mylabel)
    that.setData({
      mylabel: mylabel
    })
  },
  // 编辑
  Edit: function() {
    var that = this;
    var is_edit = !that.data.isEdit;
    var labelName_arr = [];
    if (that.data.isEdit) {
      for (var i = that.data.mylabel.length - 1; i >= 0; i--) { //that.data.isType == '4'
        if (that.data.isType == '4') {
          labelName_arr.unshift(that.data.mylabel[i])
        } else {
          labelName_arr.unshift(that.data.mylabel[i].name)
        }
      }
      //-------------------------------------------------------------------------------
      if (that.data.isType == 0 || that.data.isType == 4) {
        app.labels = labelName_arr
      } else {
        labelName_arr = labelName_arr.join(',')
        console.log(labelName_arr)
        var data = new Object();
        data.type = that.data.isType;
        data.labelname = labelName_arr;
        data.userId = app.userData.userid;
        data = JSON.stringify(data); // 转JSON字符串
        var data = RSA.sign(data);
        wx.request({
          url: app.InterfaceUrl + 'usermanage/addMyLabel',
          data: {
            data: data
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function(res) {
            console.log(res)
          }
        })
      }
    }

    that.setData({
      isEdit: is_edit
    })
  },
  // 从 导航推荐 中选取 添加向 我的导航
  addlabel: function(items) {
    var that = this;
    console.log(items)
    if (that.data.isType == 1 || that.data.isType == 2) {
      if (that.data.mylabel.length >= 5) {
        wx.showToast({
          title: '标签限制只能为5个',
          icon: 'none',
          duration: 1500
        })
      } else {
        var item = items.currentTarget.dataset.item;
        if (that.data.isEdit) {
          item.name = item.label_name;
          that.data.mylabel.push(item);
          var addlabel = that.data.mylabel
          // 
          that.data.tjlabel.splice(items.currentTarget.dataset.idx, 1);
          var tjlabel = that.data.tjlabel
          that.setData({
            mylabel: addlabel,
            tjlabel: tjlabel
          })
        } else {
          return;
        }
      }
    } else {
      var item = items.currentTarget.dataset.item;
      if (that.data.isEdit) {
        item.name = item.label_name;
        that.data.mylabel.push(item);
        var addlabel = that.data.mylabel
        // 
        that.data.tjlabel.splice(items.currentTarget.dataset.idx, 1);
        var tjlabel = that.data.tjlabel
        that.setData({
          mylabel: addlabel,
          tjlabel: tjlabel
        })
      } else {
        return;
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    console.log(options)
    that.setData({
      isType: options.who
    })
    if (that.data.isType == '0') {
      // 导航推荐
      var tjNav = new Object();
      tjNav.userid = app.userData.userid;
      tjNav.limit = '15';
      tjNav.type = '1';
      tjNav = JSON.stringify(tjNav);
      tjNav = RSA.sign(tjNav);
      wx.request({
        url: app.InterfaceUrl + 'homepagemanage/randomGetLabels', //仅为示例，并非真实的接口地址
        data: {
          data: tjNav
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        method: 'POST',
        success: function(res) {
          console.log(res);
          that.setData({
            tjlabel: res.data.data,
          });
        }
      });
      console.log(app.labels);
      if (app.labels.length > 0) {
        var labels = [];
        for (var i = app.labels.length - 1; i >= 0; i--) {
          var data = new Object();
          data.name = app.labels[i];
          labels.push(data)
        }
        that.setData({
          mylabel: labels
        })
      }
    } else if (that.data.isType == '4') {
      // 导航推荐
      var tjNav = new Object();
      tjNav.userid = app.userData.userid;
      tjNav.limit = '15';
      tjNav.type = '2';
      tjNav = JSON.stringify(tjNav);
      tjNav = RSA.sign(tjNav);
      wx.request({
        url: app.InterfaceUrl + 'homepagemanage/randomGetLabels', //仅为示例，并非真实的接口地址
        data: {
          data: tjNav
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        method: 'POST',
        success: function(res) {
          console.log(res.data.data);
          that.setData({
            tjlabel: res.data.data,
          });
        }
      });
      if (app.labels.length > 0) {

        that.setData({
          mylabel: app.labels
        })
      }
    } else {
      // 我的导航标签
      var myLabels = new Object();
      myLabels.userid = app.userData.userid;
      myLabels.type = that.data.isType;
      var data = JSON.stringify(myLabels); // 转JSON字符串
      data = RSA.sign(data);
      wx.request({
        url: app.InterfaceUrl + 'homepagemanage/getLabels',
        data: {
          data: data
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: function(res) {
          console.log(res.data.data);
          that.setData({
            mylabel: res.data.data
          })
        }
      });
      // 导航推荐
      var tjNav = new Object();
      tjNav.userid = app.userData.userid;
      tjNav.limit = '15';
      tjNav.type = that.data.isType;
      tjNav = JSON.stringify(tjNav);
      tjNav = RSA.sign(tjNav);
      wx.request({
        url: app.InterfaceUrl + 'homepagemanage/randomGetLabels', //仅为示例，并非真实的接口地址
        data: {
          data: tjNav
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        method: 'POST',
        success: function(res) {
          console.log(res.data.data);
          that.setData({
            tjlabel: res.data.data
          });
        }
      });
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
    // this.data.isType == '0'?
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