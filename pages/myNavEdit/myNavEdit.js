// pages/myNavEdit/myNavEdit.js
// 接口URL
const InterfaceUrl = 'http://39.106.2.216/index.php/API/';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用户id
    userid:'',
    // 导航推荐
    tjlabel:[],
    // 我的导航
    mylabel:[],
    // 是否编辑
    isEdit:false
  },
  // 换一批 刷新导航推荐
  refresh:function(){
    var that = this;
    // 导航推荐
    wx.request({
      url: InterfaceUrl + 'get_labels_rand', //仅为示例，并非真实的接口地址
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
  },
  // 删除 我的导航中某一项
  deleteItem:function(index){
    var that = this;
    console.log(index.currentTarget.dataset.postid);
    var mylabel = that.data.mylabel;
    mylabel.splice(index.currentTarget.dataset.postid,1);
    console.log(mylabel)
    that.setData({
      mylabel:mylabel
    })
  },
  // 编辑
  Edit:function(){
    var that = this;
    var is_edit = !that.data.isEdit
    that.setData({
      isEdit:is_edit
    })
  },
  // 从 导航推荐 中选取 添加向 我的导航
  addlabel:function(item){
    var that = this;
    var item = item.currentTarget.dataset.item;
    if (that.data.isEdit){
      wx.request({
        url: InterfaceUrl + 'post_user_key',
        data:{
          user_id:that.data.userid,
          key_id: item.label_id
        },
        header: { 'content-type': 'application/x-www-form-urlencoded'},
        method:'GET',
        success:function(res){
          console.log(res);
          // 我的导航标签
          wx.request({
            url: InterfaceUrl + 'get_labels',
            data: {
              user_id: that.data.userid,
              type: 1,
            },
            header: { 'content-type': 'application/json' },
            success: function (res) {
              console.log(res.data.data);
              that.setData({ mylabel: res.data.data })
            }
          });
        }
      })
    }else{
      return;
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({userid:options.userid});
    // 我的导航标签
    wx.request({
      url: InterfaceUrl + 'get_labels',
      data:{
        user_id: that.data.userid,
        type:1,
      },
      header: { 'content-type': 'application/json'},
      success:function(res){
        console.log(res.data.data);
        that.setData({mylabel:res.data.data})
      }
    });
    // 导航推荐
    wx.request({
      url: InterfaceUrl + 'get_labels_rand', //仅为示例，并非真实的接口地址
      data: {
        limit:10,
        type:1,
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