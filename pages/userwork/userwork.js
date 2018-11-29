// pages/userwork/userwork.js
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
    order_sn: "",
    order_name: "",
    order_phone: "",
    order_address: "",
    order_content: "",
    order_type: "",
    order_date:"",
    order_employee: "",
    order_status: "",
    address_phone:"",
    employee_phone:"",
    address:"",
    rcv_name:"",
    isBut: false,
    isshow:false
  },
  gocallphone:function(){
    wx.makePhoneCall({
      phoneNumber: this.data.order_phone, 
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () { 
        console.log("拨打电话失败！")
      }
    })  

  },
  gocalladdressphone: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.address_phone, 
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })

  },

  onShareAppMessage: function () {
    var that = this;
    var no = that.data.order_no;
    var order_sn = that.data.order_sn;
    var _type = that.data.order_type;
    var men = that.data.order_employee;
    var user_name = that.data.order_name;
    var user_phone = that.data.order_phone;
    var content = that.data.order_content;
    var status = that.data.order_status;
    var address_phone = that.data.address_phone;
    var employee_phone = that.data.employee_phone;
    var address = that.data.address;
    var date = that.data.order_date;
    var rcv_name = that.data.rcv_name;
    return {
      title: no + user_name,
      path: '/pages/usersharepage/usersharepage?no=' + no + '&_type=' + _type + '&men=' + men + '&user_name=' + user_name + '&user_phone=' + user_phone + '&content=' + content + '&status=' + status + '&address_phone=' + address_phone + '&employee_phone=' + employee_phone + '&address=' + address + '&date=' + date + '&rcv_name=' + rcv_name,
      success: function (res) {

        if (status == '待确认') {
          that.setStatus(1, no);
        }
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
    var that = this;
 
    that.setData({
      order_no: (options.no == null || options.no == 'null'|| options.no == '' || options.no == undefined) ? '--':options.no,
      order_sn: (options.order_sn == null || options.order_sn == 'null' || options.order_sn == '' || options.order_sn == undefined) ? '--' : options.order_sn,
      order_name: (options.user_name == null || options.user_name == 'null' || options.user_name == '' || options.user_name == undefined) ? '--' : options.user_name,
      order_phone: (options.user_phone == null || options.user_phone == 'null' || options.user_phone == '' || options.user_phone == undefined) ? '--' : options.user_phone,
      order_address: (options.address == null || options.address == 'null' || options.address == '' || options.address == undefined) ? '--' : options.address,
      order_content: (options.content == null || options.content == 'null' || options.content == '' || options.content == undefined) ? '--' : options.content,
      order_type: (options._type == null || options._type == 'null' || options._type == '' || options._type == undefined) ? '--' : options._type,
      order_employee: (options.men == null || options.men == 'null' || options.men == '' || options.men == undefined) ? '--' : options.men,
      order_status: (options.status == null || options.status == 'null' || options.status == '' || options.status == undefined) ? '--' : options.status,
      address_phone: (options.address_phone == null || options.address_phone == 'null' ||options.address_phone == '' || options.address_phone == undefined) ? '--' : options.address_phone,
      employee_phone: (options.employee_phone == null || options.employee_phone == 'null' || options.employee_phone == '' || options.employee_phone == undefined) ? '--' : options.employee_phone,
      address: (options.address == null || options.address == 'null'  || options.address == '' || options.address == undefined) ? '--' : options.address,
      order_date: (options.date == null || options.date == 'null'  || options.date == '' || options.date == undefined) ? '--' : options.date,
      rcv_name: (options.rcv_name == null || options.rcv_name == 'null' || options.rcv_name == '' || options.rcv_name == undefined) ? '--' : options.rcv_name,

    })

    if (options.status == '待确认' || options.status == '客户确认中'){
      that.setData({
        isBut:true
      })
    }
    if (options.status == '已完成'){
      that.setData({
        isshow: true
      })

    }
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
  setStatus: function (status) {  //获取数据列表

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
        console.log(JSON.stringify(res));


        var jsonData = JSON.parse(res.data.data);
        var code = jsonData.code

        //返回200登录成功跳转页面
        if (code == 200) {
          wx.setStorage({
            key: 'userstatus',
            data: status
          });
         if (status == 4) {
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
  cancelbut:function(){
    this.setStatus(4);

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
  },
  copy_order_sn: function () {
    let that = this
    wx.setClipboardData({
      data: that.data.order_sn,
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
  },
  setStatus: function (status, worder_sn) {

    var that = this;
    var param = Object();
    param.managerName = "InterManager";
    param.methodName = "updateStoreOrderStatusByNo";


    param.parameters = [worder_sn, status];

    var paramdata = JSON.stringify(param);
    console.log(JSON.stringify(paramdata));


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

          

        } else {


        }

      },
      fail: function () {
        wx.showToast({
          icon: 'loading',
          title: '拼死联网中',
        })
      }
    })


  }



})