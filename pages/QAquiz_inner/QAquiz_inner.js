// pages/QAquiz_inner/QAquiz_inner.js
var RSA = require('../../utils/wx_rsa.js');
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid: '',
    imgSrc: '',
    // 当前月亮币
    currentMoonY: '',
    // 当前月亮币数额
    moonNum: {
      num: '￥',
      active: false
    },
    // 选择悬赏月亮币 [0,10,20,50,100]
    moonY: [{
        num: 5,
        active: false
      },
      {
        num: 10,
        active: false
      },
      {
        num: 20,
        active: false
      },
      {
        num: 50,
        active: false
      },
      {
        num: 100,
        active: false
      }
    ],
    // 选取月亮币状态
    isMoon: false,
    // --------------------------------------------------
    // 提问 - 标题
    quesTitle: '',
    // 是否匿名
    conceal: true,
    labels: [],
    labelId: [],
    textarea: '',
    imgUrl: [],
    //图片路径
    tempFilePaths: []
  },

  // 投
  tijiao: function() {
    var that = this;
    if (that.data.labels != '' && that.data.moonNum.num != '￥' && that.data.textarea != '') {

      // 判断图片
      if (that.data.tempFilePaths.length > 0) {
        // 图片转码
        for (var i = that.data.tempFilePaths.length - 1; i >= 0; i--) {
          var data = that.data.tempFilePaths[i];
          var suffix = data.lastIndexOf(".");
          suffix = data.substring(suffix + 1, data.length); //后缀名
          wx.uploadFile({
            url: app.InterfaceUrl + 'usermanage/uploadFile?suffix=' + suffix + '&type=3', //仅为示例，非真实的接口地址
            filePath: data,
            name: 'file',
            header: {
              'content-type': 'multipart/form-data'
            },
            formData: {},
            success: function(res) {
              console.log(res);
              var imgUrl = JSON.parse(res.data).data.complete_url
              that.data.imgUrl.push(imgUrl);
              that.setData({
                imgUrl: that.data.imgUrl
              });
              if (that.data.imgUrl.length == that.data.tempFilePaths.length) {
                that.TGfun();
              }
            },
            fail: function(error) {
              console.log(error)
            }
          });
        }
      } else {
        that.TGfun();
      }
    } else {
      wx.showToast({
        title: '请完善填写项目',
        icon: 'none',
        duration: 2000
      })
    }
  },
  //投稿
  TGfun: function() {
    var that = this;
    var labelName = [];
    var labelId = [];
    for (var i = that.data.labels.length - 1; i >= 0; i--) {
      labelName.push(that.data.labels[i].label_name);
      labelId.push(that.data.labels[i].label_id);
    }
    console.log(labelName)
    var labels = labelName.join(',');
    var label_id = labelId.join(',');
    //投稿
    var imgUrl = that.data.imgUrl.join(',');
    var tougao = new Object();
    tougao.userid = app.userData.userid;
    tougao.quesTitle = that.data.quesTitle;
    tougao.moonCash = that.data.moonNum.num.toString();
    tougao.quesContent = that.data.textarea;
    tougao.img_path = imgUrl;
    tougao.questags = labels;
    tougao.labelId = label_id;
    tougao.is_anony = that.data.conceal ? '0' : '1';
    tougao = JSON.stringify(tougao); // 转JSON字符串
    var dataTG = RSA.sign(tougao);
    wx.request({
      url: app.InterfaceUrl + 'questionsmanage/askQuestions',
      data: {
        data: dataTG
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function(res) {
        console.log(res);
        if (res.data.code == '1') {
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000,
            success: function() {
              wx.switchTab({
                url: '../quick_quiz/quick_quiz'
              })
            }
          })
        } else {
          wx.showToast({
            title: '提交失败...',
            icon: 'none',
            duration: 2000,
          })
        }
      }
    })
  },
  textareaTap: function(event) {
    var that = this;
    that.setData({
      textarea: event.detail.value
    })
    console.log(that.data.textarea)
  },
  // 切换 选取状态
  moonTap: function() {
    var that = this;
    var isMoon = !that.data.isMoon;
    that.setData({
      isMoon: isMoon
    })
  },
  // 选择月亮币
  chooseMoon: function(item, idx) {
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
        that.setData({
          [defout]: false
        })
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
  onAddLabelTap: function() {
    wx.navigateTo({
      url: '../myNavEdit/myNavEdit?who=4', //addLabel
    })
  },
  // 添加图片
  onchooseImage: function() {
    var that = this;
    wx.chooseImage({
      count: 5, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        for (var i = res.tempFilePaths.length - 1; i >= 0; i--) {
          that.data.tempFilePaths.push(res.tempFilePaths[i])
        }
        that.setData({
          tempFilePaths: that.data.tempFilePaths
        })
        console.log(that.data.tempFilePaths)
      }
    })
  },
  // 删除照片
  imgDelete: function(e) {
    var that = this;
    var tempFilePaths = that.data.tempFilePaths;
    tempFilePaths.splice(e.currentTarget.dataset.deleteimg, 1);
    that.setData({
      tempFilePaths: tempFilePaths
    })
  },
  // 匿名状态
  switchChange: function(event) {
    var that = this;
    that.setData({
      conceal: event.detail.value
    });
    console.log(that.data.conceal)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    app.labels = '';
    console.log(options.quesTitle);
    that.setData({
      quesTitle: options.quesTitle,
      currentMoonY: app.userData.moon_cash
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
    if (app.labels != '') {
      console.log(app.labels)
      // var labelName = app.labels.join(',');
      that.setData({
        labels: app.labels
      })
      console.log(that.data.labels)
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
    app.labels = '';
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