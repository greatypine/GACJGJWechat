// pages/usersharepage/usersharepage.js
var WXBizDataCrypt = require('./../../utils/RdWXBizDataCrypt.js');
const gasmpath = require('./../../config').gasmpath;
const daqpath = require('./../../config').daqpath;
const app = getApp();
var AppId = "wxb240d771bd777f14";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shareData: '',
    openGid: '',
    showButton: true,
    userPhone: '',
    title_img: "../images/app1.jpg",
    order_no: "",
    order_name: "",
    order_phone: "",
    order_address: "",
    order_content: "",
    order_type: "",
    order_employee: "",
    order_status: "",
    order_date: "",
    address_phone: "",
    employee_phone: "",
    rcv_name:"",
    isBut:false


  },

  onShareAppMessage: function () {
    var that = this;
    var phone = that.data.userPhone;
    return {
      title: this.data.shareData,
      path: '/pages/home/home',
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
    console.log("onLOAD");
    var that=this;
    
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
            app.globalData.sessionkey = jsonData.session_key;
            app.globalData.openId = jsonData.openid;
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

    that.setData({
      order_no: (options.no == null || options.no == 'null' || options.no == '' || options.no == undefined) ? '--' : options.no,
      order_name: (options.user_name == null || options.user_name == 'null' || options.user_name == '' || options.user_name == undefined) ? '--' : options.user_name,
      order_phone: (options.user_phone == null || options.user_phone == 'null' || options.user_phone == '' || options.user_phone == undefined) ? '--' : options.user_phone,
      order_address: (options.address == null || options.address == 'null' || options.address == '' || options.address == undefined) ? '--' : options.address,
      order_content: (options.content == null || options.content == 'null' || options.content == '' || options.content == undefined) ? '--' : options.content,
      order_type: (options._type == null || options._type == 'null' || options._type == '' || options._type == undefined) ? '--' : options._type,
      order_employee: (options.men == null || options.men == 'null' || options.men == '' || options.men == undefined) ? '--' : options.men,
      order_date: (options.date == null || options.date == 'null' || options.date == '' || options.date == undefined) ? '--' : options.date,
      order_status: (options.status == null || options.status == 'null' || options.status == '' || options.status == undefined) ? '--' : options.status,
      address_phone: (options.address_phone == null || options.address_phone == 'null' || options.address_phone == '' || options.address_phone == undefined) ? '--' : options.address_phone,
      employee_phone: (options.employee_phone == null || options.employee_phone == 'null' || options.employee_phone == '' || options.employee_phone == undefined) ? '--' : options.employee_phone,
      rcv_name: (options.rcv_name == null || options.rcv_name == 'null' || options.rcv_name == '' || options.rcv_name == undefined) ? '--' : options.rcv_name,

    })
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
            app.globalData.sessionkey = jsonData.session_key;
            app.globalData.openId = jsonData.openid;
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
    var that = this;
    that.getStatus();


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
  //  微信授权获取手机号
  getPhoneNumber: function (e) {
  

    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '未授权',
        success: function (res) { }
      })
    } else {
      // 解密手机号
    
      if (e.detail.encryptedData != null && e.detail.iv != null && app.globalData.sessionkey != null) {
        var pc = new WXBizDataCrypt(AppId, app.globalData.sessionkey);
        var data = pc.decryptData(e.detail.encryptedData, e.detail.iv);
        app.globalData.phone_num = data.phoneNumber;
        
        if(data.phoneNumber == this.data.order_phone){
          

          if (e.target.dataset.type==2){
            this.getData(2);
          }
          //  else if (e.target.dataset.type == 4) {
          //   this.getData(4);
          // }
          
         
         
        }else{
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '这不是您的服务单',
            success: function (res) { }
          })

        }


      } else {
        wx.showToast({
          icon: 'loading',
          title: '拼死联网中',
        })
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
                app.globalData.sessionkey = jsonData.session_key;
                app.globalData.openId = jsonData.openid;
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

        return;

      }

    }
  },
  gocallphone: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.employee_phone, //此号码并非真实电话号码，仅用于测试  
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })

  },
  getData: function (status) {  

    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    })

    var param = Object();
    param.managerName = "InterManager";
    param.methodName = "updateStoreOrderStatusByNo";
    var worder_sn = that.data.order_no;
  
    param.parameters = [worder_sn, status];

    var paramdata = JSON.stringify(param);


    wx.request({
      url: gasmpath + 'dispatcher.action?',
      data: "requestString=" + encodeURIComponent(paramdata),
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        var jsonData = JSON.parse(res.data.data);
        var code = jsonData.code
   
        //返回200登录成功跳转页面
        if (code == 200) {
        
          if (status==2){
           
            wx.showToast({
              icon: 'loading',
              title: '确认成功',
            });
            that.setData({
              order_status: '已确认',
              isBut: false
            });
        

          } else if (status == 4){
            wx.showToast({
              icon: 'loading',
              title: '已取消',
            });
            that.setData({
              order_status: '已取消',
              isBut: false
            });

          }

        } else {
          wx.showToast({
            icon: 'loading',
            title: '请求失败',
          })

        }

      },
      fail: function () {
        wx.showToast({
          icon: 'loading',
          title: '拼死联网中',
        })
      }
    })


  },
  getStatus: function () {

    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    })

    var param = Object();
    param.managerName = "InterManager";
    param.methodName = "queryStoreOrderByOrderSN";
    var worder_sn =that.data.order_no;

    param.parameters = [worder_sn];

    var paramdata = JSON.stringify(param);


    wx.request({
      url: gasmpath + 'dispatcher.action?',
      data: "requestString=" + encodeURIComponent(paramdata),
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        var jsonData = JSON.parse(res.data.data);
        var code = jsonData.code
        
     

        //返回200登录成功跳转页面
        if (code == 200) {

          if (jsonData.data.worder_status == 0 ) {
            that.setData({
              order_status: '待确认',
              isBut: true
            });
          } else if (jsonData.data.worder_status == 1) {
            that.setData({
              order_status: '客户确认中',
              isBut: true
            });
          } else if (jsonData.data.worder_status == 2) {
            that.setData({
              order_status: '已确认',
              isBut: false
            });
          } else if (jsonData.data.worder_status == 3) {
            that.setData({
              order_status: '已完成',
              isBut: false
            });
          } else if (jsonData.data.worder_status == 4) {
            that.setData({
              order_status: '已取消',
              isBut: false
            });
          }  else if (jsonData.data.worder_status == null || jsonData.data.worder_status == "") {
            that.setData({
              order_status: '未录入',
              isBut: false
            });
          }

        } else {
          wx.showToast({
            icon: 'loading',
            title: '请求失败',
          })

        }

      },
      fail: function () {
        wx.showToast({
          icon: 'loading',
          title: '拼死联网中',
        })
      }
    })


  },
  copy_btn: function () {
    let that = this
    wx.setClipboardData({
      data: that.data.order_no,
      success() {
        console.log('success')
      }
    })
    wx.getClipboardData({
      success(res) {
        console.log(res.data)
        wx.showToast({
          title: '复制成功',
        })
      }
    })
  }





})