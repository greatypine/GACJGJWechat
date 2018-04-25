// pages/home/home.js
var WXBizDataCrypt = require('./../../utils/RdWXBizDataCrypt.js');
const openIdUrl = require('./../../config').testpath;
const app = getApp();
var AppId = "wxb240d771bd777f14";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shareData: '',
    openGid: '',
    showButton:true,
    userPhone:''

  },
  onShareAppMessage: function () {
    var that = this;
    var phone = that.data.userPhone;
    console.log('phone' + phone);
    return {
      title: this.data.shareData,
      path: '/pages/user/user?phone=' + phone,
      success: function (res) {
        // 转发成功
        var shareTickets = res.shareTickets;
        console.log('shareTickets' + res.shareTickets);
        if (shareTickets.length == 0) {
          return false;
        }

        wx.getShareInfo({
          shareTicket: shareTickets[0],
          success: function (res) {
            var encryptedData = res.encryptedData;
            var iv = res.iv;
            var pc = new WXBizDataCrypt(AppId, app.globalData.sessionkey);
            var data = pc.decryptData(res.encryptedData, res.iv);

            that.setData({
              openGid: data.openGId
            })
           
          }
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //转发配置
    wx.showShareMenu({
      withShareTicket: true
    })
   
    if (options.scene == 1044) {
      wx.getShareInfo({
        shareTicket: options.shareTicket,
        success: function (res) {
          var encryptedData = res.encryptedData;
          var iv = res.iv;
        }
      })
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

  //获取用户输入的用户名
  userNameInput: function (e) {
    var that = this;
    that.setData({
      shareData: e.detail.value
    })
  },
  //获取用户输入的用户名
  userPhoneInput: function (e) {
    var that = this;
    that.setData({
      userPhone: e.detail.value
    })
  }
  
})