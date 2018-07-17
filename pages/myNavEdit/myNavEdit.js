// pages/myNavEdit/myNavEdit.js
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
    isType:''
  },
  // 换一批 刷新导航推荐
  refresh: function () {
    var that = this;
    // 导航推荐
    var types = that.data.isType =='0'?parseInt(that.data.isType)+1:that.data.isType;
    wx.request({
      url: app.InterfaceUrl + 'get_labels_rand', //仅为示例，并非真实的接口地址
      data: {
        limit: 10,
        type: types,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data.data);
        that.setData({
          tjlabel: res.data.data,
        });
      }
    });
  },
  // 删除 我的导航中某一项
  deleteItem: function (index) {
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
  Edit: function () {
    var that = this;
    var is_edit = !that.data.isEdit;
    var labelName_arr =[]; 
    if (that.data.isEdit){
      for (var i = that.data.mylabel.length-1;i>=0;i--){
        labelName_arr.unshift(that.data.mylabel[i].name)
      }
      //-------------------------------------------------------------------------------888888888888888888888888888888
      if (that.data.isType == 0 || that.data.isType == 4) { app.labels = labelName_arr}
      labelName_arr = labelName_arr.join(',')
      console.log(labelName_arr)
      wx.request({
        url: app.InterfaceUrl + 'post_addMyLabel',
        data: {
          userId: app.userData.user_id,
          labelname: labelName_arr,
          type: that.data.isType
        },
        method:'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success:function(res){
          console.log(res)
        }
      })
    }
    
    that.setData({
      isEdit: is_edit
    })
  },
  // 从 导航推荐 中选取 添加向 我的导航
  addlabel: function (items) {
    var that = this;
    console.log(items)
    var item = items.currentTarget.dataset.item;
    if (that.data.isEdit) {
      item.name = item.label_name;
      that.data.mylabel.push(item);
      var addlabel = that.data.mylabel
      // 
      that.data.tjlabel.splice(items.currentTarget.dataset.idx,1);
      var tjlabel = that.data.tjlabel
      that.setData({
        mylabel: addlabel,
        tjlabel: tjlabel
      })
    } else {
      return;
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options)
    that.setData({isType:options.who})
    if(that.data.isType == '0'){
      // 导航推荐
      wx.request({
        url: app.InterfaceUrl + 'get_labels_rand', //仅为示例，并非真实的接口地址
        data: {
          limit: 10,
          type: 1,
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res.data.data);
          that.setData({
            tjlabel: res.data.data,
          });
        }
      });
    }else if(that.data.isType == '4'){
      // 导航推荐
      wx.request({
        url: app.InterfaceUrl + 'get_labels_rand', //仅为示例，并非真实的接口地址
        data: {
          limit: 10,
          type: 3,
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res.data.data);
          that.setData({
            tjlabel: res.data.data,
          });
        }
      });
    }else{
      // 我的导航标签
      wx.request({
        url: app.InterfaceUrl + 'get_labels',
        data: {
          userid: app.userData.user_id,
          type: that.data.isType,
        },
        header: { 'content-type': 'application/json' },
        success: function (res) {
          console.log(res.data.data);
          that.setData({ mylabel: res.data.data })
        }
      });
      // 导航推荐
      wx.request({
        url: app.InterfaceUrl + 'get_labels_rand', //仅为示例，并非真实的接口地址
        data: {
          limit: 10,
          type: that.data.isType,
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res.data.data);
          that.setData({
            tjlabel: res.data.data,
          });
        }
      });
    }
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
    // this.data.isType == '0'?
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