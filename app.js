//app.js
var WXBizDataCrypt = require('utils/RdWXBizDataCrypt.js');
var AppId = "wxb240d771bd777f14";
var AppSecret="8f609b0687747a13a87515da2d2de597";
const openIdUrl = require('./config').testpath;
App({
  onLaunch: function (ops) {
    wx.showToast({
      icon: 'loading',
      title: 'app',
    })
    console.log("ops.scene" + ops.phone);
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId

        // 发送 res.code 到后台换取 openId, sessionKey, unionId
         var that=this;
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
            that.globalData.sessionkey = res.data.session_key;
            that.globalData.openId = res.data.openid;
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
              title: '拼死联网中',
            })

          },
          complete: function (res) {

          }
        });
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    sessionkey: null,
    openid: null
  }
})