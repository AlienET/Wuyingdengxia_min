// pages/index/search/search.js
var RSA = require('../../utils/wx_rsa.js');
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 当前用户
    userid: '',
    // 热门搜索 关键词
    hotWords: [],
    // 搜索历史
    searchHistory: [],
    isShow: true, 
    wenzhang: [],
    wenda: [],
    shipin: [],
    inputText: '',
    // tab切换
    flag: 0,
    //搜索内容
    valuetxt:''
  },
  // 点击切换
  onBackTap: function(e) {
    var that = this;
    console.log(e.target.dataset.current)
    if (this.data.flag === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        flag: e.target.dataset.current
      })
    }
  },
  /** 
   * 滑动切换tab 
   */
  bindChange: function(e) {
    console.log(e.detail.current)
    var that = this;
    that.setData({
      flag: e.detail.current
    });
    var data = new Object();
    data.type = e.detail.current == 0 ? 1 : e.detail.current == 1 ? 4 : 3;
    data.keyword = that.data.valuetxt;
    data.offset = 0;
    data.size = 10;
    data.userid = app.userData.userid;
    data = JSON.stringify(data); // 转JSON字符串
    var data = RSA.sign(data);
    wx.request({
      url: app.InterfaceUrl+'homepagemanage/queryAllInfo',
      data: {
        data: data
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        if (e.detail.current == 0) {
          that.setData({
            wenzhang: res.data.data.article.list
          })
          console.log(that.data.wenzhang)
        } else if (e.detail.current == 1) {
          that.setData({
            wenda: res.data.data.question.list
          })
          console.log(that.data.wenda)
        } else {
          that.setData({
            shipin: res.data.data.replay.list
          })
          console.log(that.data.shipin)
        }
      }
    })
  },
  reciTap: function(e) {
    var that = this;
    that.setData({
      inputText: e.currentTarget.dataset.content,
      isShow: false
    });

    var data = new Object();
    data.type = that.data.flag == 0 ? 1 : that.data.flag == 1 ? 4 : 3;
    data.keyword = e.currentTarget.dataset.content;
    data.offset = 0;
    data.size = 10;
    data.userid = app.userData.userid;
    data = JSON.stringify(data); // 转JSON字符串
    var data = RSA.sign(data);
    wx.request({
      url: app.InterfaceUrl+'homepagemanage/queryAllInfo',
      data: {
        data: data
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
        success: function(res) {
          console.log(res)
          that.setData({
            wenzhang: res.data.data.article.list
          })
          console.log(that.data.wenzhang)
        }
      })
  },
  //退出页面
  onReturnTap: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  // 历史搜索-删除某条
  deleteSome: function(index) {
    var that = this;
    that.data.searchHistory.splice(index.currentTarget.dataset.postid,1)
    that.setData({
      searchHistory: that.data.searchHistory
    })
    var searchHistory = that.data.searchHistory.join(',')
    wx.setStorage({
      key: "LSSS",
      data: searchHistory
    });
  },
  //进详情
  onArticleDetailTap: function(e) {
    var that = this;
      console.log(e.currentTarget.dataset.postid) //id
    if (that.data.flag == 0) {
        wx.navigateTo({
          url: '../article_detail/article_detail?articleid=' + e.currentTarget.dataset.postid,
        })
    } else if (that.data.flag == 1) {
        wx.navigateTo({
          url: '../problemDetails/problemDetails?quesid=' + e.currentTarget.dataset.postid,
        })
      } else {
        wx.navigateTo({
          url: '../pastVideo/pastVideo?replay_sub_id=' + e.currentTarget.dataset.postid,
        })
      }
  },
  // input
  onSearchTap: function(event) {
    var that = this;
    that.setData({
      valuetxt: event.detail.value
    })
    console.log(event.detail.value)
    if (event.detail.value != '') {
      that.setData({
        isShow: false
      })
    } else {
      that.setData({
        isShow: true
      })
    }
    var data = new Object();
    data.type = that.data.flag==0?1:that.data.flag==1?4:3;
    data.keyword = event.detail.value;
    data.offset = 0;
    data.size = 10;
    data.userid = app.userData.userid;
    data = JSON.stringify(data); // 转JSON字符串
    var data = RSA.sign(data);
    wx.request({
      url: app.InterfaceUrl+'homepagemanage/queryAllInfo',
      data: {
        data: data
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log(res)
        console.log(that.data.flag)
        if(that.data.flag==0){
          that.setData({
            wenzhang:res.data.data.article.list
          })
          console.log(that.data.wenzhang)
        }else if(that.data.flag == 1){
          that.setData({
            wenda: res.data.data.question.list
          })
          console.log(that.data.wenda)
        }else{
          that.setData({
            shipin: res.data.data.replay.list
          })
          console.log(that.data.shipin)
        }
      }
    })
  },
  // 记录搜索
  onlishiTap:function(e){
    var that = this;
    var value = wx.getStorageSync('LSSS');
    if(value){
      value = value + ',' + e.detail.value;
    }else{
      value = e.detail.value;
    }
    console.log(value)
    wx.setStorage({
      key: "LSSS",
      data: value,
      success:function(){
        var searchHistory = value.split(',');
        that.setData({
          searchHistory: searchHistory
        })
      }
    })
  },
  // 清空历史搜索
  deleteall: function() {
    var that = this;
    wx.setStorage({
      key: "LSSS",
      data: '',
      success:function(){
        that.setData({
          searchHistory : []
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    var that = this;
    that.setData({
      userid: options.userid,
      shui: options.shui
    });
    // 热搜关键词
    wx.request({
      url: app.InterfaceUrl+'homepagemanage/getHotWords',
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method:'POST',
      success: function(res) {
        console.log(res);
        that.setData({
          hotWords: res.data.data
        })
      }
    });
    // 获取历史搜索
    var searchHistory = wx.getStorageSync('LSSS');
    if (searchHistory){
      searchHistory = searchHistory.split(',');
    }
    that.setData({
      searchHistory: searchHistory
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