// pages/user/user.js
var WXBizDataCrypt = require('./../../utils/RdWXBizDataCrypt.js');
const openIdUrl = require('./../../config').testpath;
var AppId = "wxb240d771bd777f14";
var AppSecret = "8f609b0687747a13a87515da2d2de597";
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userphone:'',
    seec_key:''
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      userPhone: options.phone
    })
    wx.login({
      success: res => {
       
        // 发送 res.code 到后台换取 openId, sessionKey, unionId

        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var that = this;
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data: {
            appid: AppId,
            secret: AppSecret,
            js_code: res.code,
            grant_type: 'authorization_code'
          },
          method: 'post',
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          success: function (res) {
            // var jsonData = JSON.parse(JSON.parse(res.data.data).toString());
            // console.log(jsonData.session_key + "getkey");
            var pc = new WXBizDataCrypt(AppId, res.data.session_key);
            // that.globalData.sessionkey = res.data.session_key;
            that.setData({
              seec_key: res.data.session_key
            })
            // that.globalData.openId = res.data.openid;
            console.log('res: ', res.data);

            // wx.getUserInfo({
            //   success: function (res) {

            //     var data = pc.decryptData(res.encryptedData, res.iv)
            //     that.globalData.openId = data.openId;
            //     console.log('解密后openId: ', data.openId)
            //   }
            // })
          },
          fail: function (res) {
            wx.showToast({
              icon: 'loading',
              title: '拼死联网',
            })

          },
          complete: function (res) {

          }
        });
      }
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
    wx.login({
      success: res => {

        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var that = this;
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data: {
            appid: AppId,
            secret: AppSecret,
            js_code: res.code,
            grant_type: 'authorization_code'
          },
          method: 'post',
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          success: function (res) {
            wx.showToast({
              icon: 'loading',
              title: '333',
            })
            // var jsonData = JSON.parse(JSON.parse(res.data.data).toString());
            // console.log(jsonData.session_key + "getkey");
            var pc = new WXBizDataCrypt(AppId, res.data.session_key);
            // that.globalData.sessionkey = res.data.session_key;
            that.setData({
              seec_key: res.data.session_key
            })
            // that.globalData.openId = res.data.openid;
            console.log('res: ', res.data);

            // wx.getUserInfo({
            //   success: function (res) {

            //     var data = pc.decryptData(res.encryptedData, res.iv)
            //     that.globalData.openId = data.openId;
            //     console.log('解密后openId: ', data.openId)
            //   }
            // })
          },
          fail: function (res) {
            wx.showToast({
              icon: 'loading',
              title: '拼死联',
            })

          },
          complete: function (res) {

          }
        });
      }
    })
  
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
  
  },
  getPhoneNumber: function (e) {
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '未授权',
        success: function (res) { }
      })
    } else {
      var that = this;
      console.log("user_解1" + e.detail.encryptedData);
      console.log("user_解2" + e.detail.iv);
      console.log("user_解3" + that.data.seec_key);
      // 解密手机号
      if (e.detail.encryptedData != null && e.detail.iv != null && that.data.seec_key != null) {
       
        var pc = new WXBizDataCrypt(AppId, that.data.seec_key);
        var data = pc.decryptData(e.detail.encryptedData, e.detail.iv);
        // app.globalData.iphone_num = data.phoneNumber;
        console.log("user_解密" + data.phoneNumber);
        console.log("user_传递" + that.data.userPhone);
        if (data.phoneNumber == that.data.userPhone){
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '确认成功',
            success: function (res) { }
          })

        }else{
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '不是你的工单',
            success: function (res) { }
          })

        }



      } else {
        wx.showToast({
          icon: 'loading',
          title: '拼死联网中',
        })
      }
    }
  }
})