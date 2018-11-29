//app.js
var WXBizDataCrypt = require('utils/RdWXBizDataCrypt.js');
var AppId = "wxb240d771bd777f14";
// var AppSecret="8f609b0687747a13a87515da2d2de597";
const gasmpath = require('./config').gasmpath;
App({
  onLaunch: function (ops) {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that = this;


    wx.getStorage({
      key: 'login_style',
      success: function (res) {
        if (res.data == 'guoanxia_login') {
          wx.getStorage({
            key: 'employee',
            success: function (res) {
              that.globalData.isLogin_code = res.data.code;
              that.globalData.employee_no = res.data.user.employeeId;
              that.globalData.employee_name = res.data.user.name;
              that.globalData.employee_zw = res.data.user.zw;
              that.globalData.inviteCode = res.data.user.inviteCode;
              that.globalData.showStore = false;
              that.globalData.showShareBut=true;
             


            }
          });
        } else {
          
          // 登录
          // 小程序初始化
          wx.login({
            success: res => {
              console.log('res.code==:', res.code)
              var param = Object();
              param.managerName = "InterManager";
              param.methodName = "requestWxApi";


              param.parameters = [res.code];
              var paramdata = JSON.stringify(param);
              console.log(paramdata);

              // 发送 res.code 到后台换取 openId, sessionKey, unionId

              wx.request({
                url: gasmpath + 'dispatcher.action?',
                data: "requestString=" + encodeURIComponent(paramdata),
                method: 'post',
                header: {
                  'content-type': 'application/x-www-form-urlencoded' // 默认值
                },
                success: function (res) {
                  var jsonData = JSON.parse(JSON.parse(res.data.data).toString());
                  console.log(jsonData.session_key + "getsession_key");
                  var pc = new WXBizDataCrypt(AppId, jsonData.session_key)
                  that.globalData.sessionkey = jsonData.session_key;
                  that.globalData.openId = jsonData.openid;
                  wx.setStorage({
                    key: 'session_key',
                    data: jsonData.session_key
                  });
                  wx.setStorage({
                    key: 'openid',
                    data: jsonData.openid
                  });
                  console.log('解密后openId: ', jsonData.openid);

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
          });
         

        }


      },fail:function(){
        // 登录
        // 小程序初始化
        wx.login({
          success: res => {
            console.log('res.code==:', res.code)
            var param = Object();
            param.managerName = "InterManager";
            param.methodName = "requestWxApi";


            param.parameters = [res.code];
            var paramdata = JSON.stringify(param);
            console.log(paramdata);

            // 发送 res.code 到后台换取 openId, sessionKey, unionId

            wx.request({
              url: gasmpath + 'dispatcher.action?',
              data: "requestString=" + encodeURIComponent(paramdata),
              method: 'post',
              header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
              },
              success: function (res) {
                var jsonData = JSON.parse(JSON.parse(res.data.data).toString());
                console.log(jsonData.session_key + "getsession_key");
                var pc = new WXBizDataCrypt(AppId, jsonData.session_key)
                that.globalData.sessionkey = jsonData.session_key;
                that.globalData.openId = jsonData.openid;
                wx.setStorage({
                  key: 'session_key',
                  data: jsonData.session_key
                });
                wx.setStorage({
                  key: 'openid',
                  data: jsonData.openid
                });
                console.log('解密后openId: ', jsonData.openid);

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
        });

      }
    });


   
    //获取用户的当前设置
    wx.getSetting({
      success: (res) => {
        /*
         * res.authSetting = {
         *   "scope.userInfo": true,
         *   "scope.userLocation": true
         * }
         */
      }
    });

    
  },
  globalData: {
    userInfo: null,//用户基本信息
    sessionkey: null,//唯一标示
    openid: null,
    login_statu: true,//首页登录框状态
    nick_name: '',//用户微信昵称
    latitude: null,//纬度
    longitude: null,//经度
    phone_num:null,
    isLogin_code:null,//保存登录成功状态
    employee_name:null, //国安侠姓名
    employee_no: null, //国安侠员工号
    employee_zw: null, //国安侠职务
    showStore: true,//附近门店等状态拦
    showShareBut:false,//分享按钮显示
    guoanxiaisLogin:null,//登录状态
    inviteCode:null//社员邀请码
  }
})