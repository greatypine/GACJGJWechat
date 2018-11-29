// pages/home/home.js
var WXBizDataCrypt = require('./../../utils/RdWXBizDataCrypt.js');
const gasmpath = require('./../../config').gasmpath;
const daqpath = require('./../../config').daqpath;
const app = getApp();
var AppId = "wxb240d771bd777f14";
Page({
  data: {
    // thumb: '',//头像
    // nickname: '',//昵称
    weekdata: "../images/weekdata_img.png",
    moreData: "../images/icon2.png",
    src_store: "../images/store_img.png",
    src_men: "../images/men_img.png",
    service_img: "../images/icon_bg.png",
    showModalStatus: app.globalData.login_statu,//判断是否显示登录框的状态
    showLoginView: false,//判断是否显示国安侠用户密码登录页面的状态
    phoneNo: "",//解密的手机号
    userName: '',//国安侠登录账号
    userPwd: '',//国安侠登录密码
    currentPage: 1 , //分页
    worklist: [], //工单列表
    scrolltop: null, //滚动位置
    view_background:"",//item背景颜色
    showStore: app.globalData.showStore,//判断是否显示附近门店等状态栏
    showHome:false,//判断是否显示首页内容的状态
    showLogin: true,//判断是否显示授权的状态
    // showWorklist: true,//判断是否用户服务单的状态
    iswork:false,////判断是否有工单列表的状态
    nowork:true,////没有工单列表时显示状态
    guoanxiaisLogin: app.globalData.guoanxiaisLogin,//登录状态
    showShareBut: app.globalData.showShareBut,//分享按钮显示
    searchLoadingComplete: false,  //“没有数据”的变量，默认false，隐藏
    searchtext:'',//搜索输入字段
 
   
 
    
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (e) {
   
    var that = this;
    var no = e.target.dataset.no;
    var date = e.target.dataset.date;
    var _type = e.target.dataset._type;
    var men = e.target.dataset.men;
    var user_name = e.target.dataset.user_name;
    var user_phone = e.target.dataset.user_phone;
    var content = e.target.dataset.content;
    var status = e.target.dataset.status;
    var address_phone = e.target.dataset.address_phone;
    var employee_phone = e.target.dataset.employee_phone;
    var address = e.target.dataset.address;
    var rcv_name = e.target.dataset.rcv_name;
    var order_sn = e.target.dataset.order_sn;
    var home_date = e.target.dataset.home_date;
  
    return {
      title: no + user_name,
      path: '/pages/usersharepage/usersharepage?no=' + no + '&_type=' + _type + '&men=' + men + '&user_name=' + user_name + '&user_phone=' + user_phone + '&content=' + content + '&status=' + status + '&address_phone=' + address_phone + '&employee_phone=' + employee_phone + '&address=' + address + '&date=' + date + '&rcv_name=' + rcv_name + '&order_sn=' + order_sn,
      success: function (res) {
        wx.setStorage({
          key: 'userstatus',
          data: ''
        });
        if (status=='待确认'){
      
            that.setStatus(1,no);
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

  // 跳转到附近门店页面
  goto_store: function () {
    wx.navigateTo({
      url: '../nearby_store/nearby_store'
    })
  },
  // 跳转到社区服务
  goto_shequ: function () {
    wx.navigateTo({
      url: '../community_service/community_service'
    })
  },
  // 跳转到附近国安侠页面
  goto_men: function () {
    wx.navigateTo({
      url: '../nearby_men/nearby_men'
    })
  },
  // 跳转到工单列表
  openpage: function (e) {
   
    var that=this;
    var no = e.currentTarget.dataset.no;
    var date = e.currentTarget.dataset.date;
    var _type = e.currentTarget.dataset._type;
    var men = e.currentTarget.dataset.men;
    var user_name = e.currentTarget.dataset.user_name;
    var user_phone = e.currentTarget.dataset.user_phone;
    var content = e.currentTarget.dataset.content;
    var status = e.currentTarget.dataset.status;
    var address_phone = e.currentTarget.dataset.address_phone;
    var employee_phone = e.currentTarget.dataset.employee_phone;
    var address = e.currentTarget.dataset.address;
    var rcv_name = e.currentTarget.dataset.rcv_name;
    var order_sn = e.currentTarget.dataset.order_sn;
   
    if (app.globalData.guoanxiaisLogin == null || app.globalData.guoanxiaisLogin==""){
      wx.navigateTo({
        url: '../usersharepage/usersharepage?no=' + no + '&_type=' + _type + '&men=' + men + '&user_name=' + user_name + '&user_phone=' + user_phone + '&content=' + content + '&status=' + status + '&address_phone=' + address_phone + '&employee_phone=' + employee_phone + '&address=' + address + '&date=' + date + '&rcv_name=' + rcv_name + '&order_sn=' + order_sn
      })

    }else{
      wx.navigateTo({
        url: '../userwork/userwork?no=' + no + '&_type=' + _type + '&men=' + men + '&user_name=' + user_name + '&user_phone=' + user_phone + '&content=' + content + '&status=' + status + '&address_phone=' + address_phone + '&employee_phone=' + employee_phone + '&address=' + address + '&date=' + date + '&rcv_name=' + rcv_name + '&order_sn=' + order_sn
      })

    }
   
  },
  
  // 判断是否弹出登录框
  goto_login: function () {
    if (app.globalData.isLogin_code == null) {
      this.setData({
        showModalStatus: true
      })
    } else {
      wx.navigateTo({
        url: '../personal/personal'
      })

    }


  },
  scrollHandle: function (e) { //滚动事件
 
    this.setData({
      scrolltop: e.detail.scrollTop
    })
 
  },
  goToTop: function () { //回到顶部
    this.setData({
      scrolltop: 0
    })
  },
  scrollLoading: function () { //滚动加载
    this.setData({
      currentPage: this.data.currentPage + 1,
    })

    if (this.data.guoanxiaisLogin== 'guoanxia_login'){
      this.shareWorkData();
    }else{
      this.fetchServiceData();
    }
  
  },
  onPullDownRefresh: function () { //下拉刷新

    this.setData({
      currentPage: 1,
      searchLoadingComplete: false, //“没有数据”的变量，默认false，隐藏 
      worklist: []
    })
    
    if (this.data.guoanxiaisLogin == 'guoanxia_login') {
      this.shareWorkData();
    } else {
      this.fetchServiceData();
    }
   
    setTimeout(() => {
      
      wx.stopPullDownRefresh()
    }, 1000)
  },


  fetchServiceData: function () {  //获取数据列表
    console.log("fetchServiceData");
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    })

    var param = Object();
    param.managerName = "InterManager";
    param.methodName = "queryStoreOrderInfoByPhone";

    var user_phone = that.data.phoneNo;
    var select_val = that.data.searchtext;
    var pageInfo = Object();
    pageInfo.recordsPerPage = 10;
    pageInfo.totalRecords = 0;
    pageInfo.tooManySearchReturn = false;
    pageInfo.currentPage = that.data.currentPage;
    var p = JSON.stringify(pageInfo);
    param.parameters = [p,user_phone,select_val];

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
        var message = jsonData.message;
        var data = jsonData.data.data;
        const newlist = [];
        //返回200登录成功跳转页面
        
        if (code == 200) {
    
          if (jsonData.data.data.length > 0) {
            for (var i = 0; i < jsonData.data.data.length; i++) {
              
              if (data[i].worder_type == 0) {
                data[i].worder_type = "产品类";
              } else if (data[i].worder_type == 1) {
                data[i].worder_type = "服务类";
              } else if (data[i].worder_type == null || data[i].worder_type == "") {
                data[i].worder_type = "未录入";
              }
              var statusCode = "";
              if (data[i].worder_status == 0) {
                data[i].worder_status = "待确认";
                statusCode=0
              } else if (data[i].worder_status == 1) {
                data[i].worder_status = "客户确认中";
                statusCode = 1
              } else if (data[i].worder_status == 2) {
                data[i].worder_status = "已确认";
                statusCode = 2
              } else if (data[i].worder_status == 3) {
                data[i].worder_status = "已完成";
                statusCode = 3
              } else if (data[i].worder_status == 4) {
                data[i].worder_status = "已取消";
                statusCode = 4
              } else if (data[i].worder_status == null || data[i].worder_status == "") {
                data[i].worder_status = "未录入";
              }


              newlist.push({
                "id": data[i].worder_sn,
                "date": that.timestampToTime(data[i].create_time),
                "_type": data[i].worder_type,
                "men": data[i].employee_name,
                "user_name": data[i].username,
                "user_phone": data[i].phone,
                "content": data[i].wcontent,
                "status": data[i].worder_status,
                "address_phone": data[i].rcv_phone,
                "rcv_name": data[i].rcv_name,
                "order_sn": (data[i].order_sn == null || data[i].order_sn == 'null' || data[i].order_sn == '' || data[i].order_sn == undefined) ? '--' : data[i].order_sn,
                "employee_phone": data[i].employee_phone,
                "address": data[i].address,
                "statusCode": statusCode,
                "home_date": that.getDateDiff(data[i].create_time),

              })
            }
            if (jsonData.data.data.length < 10) {
              that.setData({
                searchLoadingComplete: true  //把"上拉加载"的变量设为false，显示               
              })
            }
            that.setData({
              worklist: that.data.worklist.concat(newlist),
              nowork: false,
              iswork: true
            })


          } else if (jsonData.data.data.length <= 0 && that.data.currentPage==1){
           
            that.setData({
              nowork:true,
              iswork:false,
              searchLoadingComplete: false
            
            })
          } else if (jsonData.data.data.length <= 0 && that.data.currentPage > 1) {

            that.setData({
              nowork: false,
              iswork: true,
              searchLoadingComplete: true

            })
          }
          

        } else {
          that.setData({
            nowork: true,
            iswork: false,
            searchLoadingComplete: false
        
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
  shareWorkData: function () {  //获取数据列表
    console.log("shareWorkData");
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    })

    var param = Object();
    param.managerName = "InterManager";
    param.methodName = "queryStoreOrderListForApp";
    var employeeId = null;
    if (app.globalData.employee_no!=null){
      employeeId = app.globalData.employee_no;
    }else{
      wx.getStorage({
        key: 'employee_no',
        success: function (res) {
         employeeId=res.data;
        }
      });

    }
    var pageInfo = Object();
    var select_val = that.data.searchtext;
    pageInfo.recordsPerPage = 10;
    pageInfo.totalRecords = 0;
    pageInfo.tooManySearchReturn = false;
    pageInfo.currentPage = that.data.currentPage;
    var p = JSON.stringify(pageInfo);
    param.parameters = [p, employeeId, '0,1,2,3,4',select_val];

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
        var message = jsonData.message;
        var data = jsonData.data.data;
        const newlist = [];
        //返回200登录成功跳转页面
        if (code == 200) {
          if (jsonData.data.data.length > 0) {
            
            for (var i = 0; i < jsonData.data.data.length; i++) {
              
              if (data[i].worder_type == 0) {
                data[i].worder_type = "产品类";
              } else if (data[i].worder_type == 1) {
                data[i].worder_type = "服务类";
              } else if (data[i].worder_type == null || data[i].worder_type == "") {
                data[i].worder_type = "未录入";
              }
              var statusCode = "";
              var but_str="";
      
              if (data[i].worder_status == 0) {
                data[i].worder_status = "待确认";
                statusCode=0;
                but_str ="发送给客户确认";
              } else if (data[i].worder_status == 1) {
                data[i].worder_status = "客户确认中";
                statusCode = 1;
                but_str = "再次发送";
              } else if (data[i].worder_status == 2) {
                data[i].worder_status = "已确认";
                statusCode = 2;
              } else if (data[i].worder_status == 3) {
                data[i].worder_status = "已完成";
                statusCode = 3;
              } else if (data[i].worder_status == 4) {
                data[i].worder_status = "已取消";
                statusCode = 4;
              } else if (data[i].worder_status == null || data[i].worder_status == "") {
                data[i].worder_status = "未录入";
              }

          
              newlist.push({
                "id": data[i].worder_sn,
                "date": that.timestampToTime(data[i].create_time),
                "_type": data[i].worder_type,
                "men": data[i].employee_name,
                "user_name": data[i].username,
                "user_phone": data[i].phone,
                "content": data[i].wcontent,
                "status": data[i].worder_status,
                "address_phone": data[i].rcv_phone,
                "rcv_name": data[i].rcv_name,
                "order_sn": (data[i].order_sn == null || data[i].order_sn == 'null' || data[i].order_sn == '' || data[i].order_sn == undefined) ? '--' : data[i].order_sn,
                "employee_phone": data[i].employee_phone,
                "address": data[i].address,
                "statusCode": statusCode,
                "home_date": that.getDateDiff(data[i].create_time),
                "but_str": but_str
            
                

              })
            }
            if (jsonData.data.data.length < 10) {
              that.setData({
                searchLoadingComplete: true  //把"上拉加载"的变量设为false，显示               
              })
            }
            that.setData({
              worklist: that.data.worklist.concat(newlist),
              nowork: false,
              iswork: true
            })


          } else if (jsonData.data.data.length <= 0 && that.data.currentPage == 1){
            that.setData({
              nowork: true,
              iswork: false,
              searchLoadingComplete: false
         
            })

          } else if (jsonData.data.data.length <= 0 && that.data.currentPage > 1) {
            that.setData({
              nowork: false,
              iswork: true,
              searchLoadingComplete: true

            })

          }

        


        } else {
          that.setData({
            nowork: true,
            iswork: false,
            searchLoadingComplete: false
       
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

  onLoad() {
    console.log("onLoad");
    var that=this;
    // wx.getStorage({
    //   key: 'phoneNumber',
    //   success: function (res) {
    //     that.setData({
    //       showHome: true,
    //       showLogin: false,
    //       showModalStatus: false
    //     });
    //   }
    // });

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
      console.log(app.globalData.sessionkey + "homesession_key");
      if (e.detail.encryptedData != null && e.detail.iv != null && app.globalData.sessionkey != null) {
        var pc = new WXBizDataCrypt(AppId, app.globalData.sessionkey);
        var data = pc.decryptData(e.detail.encryptedData, e.detail.iv);
        app.globalData.phone_num = data.phoneNumber;
       

        this.setData({
          showHome: true,
          showLogin: false,
          showModalStatus: false,
          phoneNo: data.phoneNumber
        });
        wx.setStorage({
          key: 'phoneNumber',
          data: data.phoneNumber
        });
        this.fetchServiceData();

      } else {
        wx.showToast({
          icon: 'loading',
          title: '拼死联网中',
        })
      
        return;

      }

    }
  },
  onShow: function (options) {
    console.log('onShow');
    wx.setStorage({
      key: 'userstatus',
      data: ''
    });
   
   
    var that = this;
    
   
    const updateManager = wx.getUpdateManager()

    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate);
    });

    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })

    });

    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
      console.log('新的版本下载失败');
    });
    that.setData({
      currentPage: 1,
      worklist: [],
      guoanxiaisLogin: app.globalData.guoanxiaisLogin
    });
    
    wx.getStorage({
      key: 'login_style',
      success: function (res) {
        
        if (res.data == 'guoanxia_login') {
          
          that.shareWorkData();
          app.globalData.guoanxiaisLogin ='guoanxia_login';
          that.setData({
            guoanxiaisLogin: app.globalData.guoanxiaisLogin,
            showHome: true,
            showLogin: false,
            showModalStatus: false
          })
        } else {
          wx.getStorage({
            key: 'phoneNumber',
            success: function (res) {
              that.setData({
                phoneNo: res.data,
                 showHome: true,
                  showLogin: false,
                  showModalStatus: false
              })
              that.fetchServiceData();


            }
          });

        }


      },fail:function(){
        wx.getStorage({
          key: 'phoneNumber',
          success: function (res) {
            that.setData({
              phoneNo: res.data,
              showHome: true,
              showLogin: false,
              showModalStatus: false
            })
            that.fetchServiceData();


          }
        });

      }
    });
  
   
    wx.getStorage({
      key: 'userName',
      success: function (res) {
        that.setData({ userName: res.data });
      }
    });
    wx.getStorage({
      key: 'userPassword',
      success: function (res) {

        that.setData({ userPwd: res.data });
      }
    });
    wx.getStorage({
      key: 'session_key',
      success: function (res) {
        app.globalData.sessionkey = res.data;

      }
    });
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        app.globalData.openId = res.data;

      }
    });
    that.setData({
      showStore: app.globalData.showStore,
      showShareBut:app.globalData.showShareBut

   
   
    })



  },
  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例 
    var animation = wx.createAnimation({
      duration: 200,  //动画时长
      timingFunction: "linear", //线性
      delay: 0  //0则不延迟
    });

    // 第2步：这个动画实例赋给当前的动画实例
    this.animation = animation;

    // 第3步：执行第一组动画
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画
    setTimeout(function () {
      // 执行第二组动画
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
      this.setData({
        animationData: animation
      })

      //关闭
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false,
            showLoginView: false
            

          }
        );
      }
    }.bind(this), 200)

    // 显示
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  },
  //获取用户输入的用户名
  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },
  passWdInput: function (e) {
    this.setData({
      userPwd: e.detail.value
    })
  },
  // 跳转到账号登录页面
  goLogin: function () {
    this.setData({
      showModalStatus: false,
      showLoginView: true
    })
  },
  // 跳转首页
  goHome: function () {
    this.setData({
      showModalStatus: false
     
    })
  },
  // 登录按钮接口
  loginbtn: function () {
    if (this.data.userName == null || this.data.userName == '') {
      wx.showModal({
        title: '提示',
        content: '登录名不能为空',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {


          }
        }
      })
      return;
    }
    if (this.data.userPwd == null || this.data.userPwd == '') {
      wx.showModal({
        title: '提示',
        content: '密码不能为空',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log(res.confirm);

          }
        }
      })
      return;
    }

    var param = Object();
    param.managerName = "UserManager";
    param.methodName = "saveTokenAndLogin";
    var po = Object();
    po.code = this.data.userName;
    po.password = this.data.userPwd;
    po.os = "";
    po.client_id = "";
    po.token = "";
    param.parameters = [JSON.stringify(po)];
    var paramdata = JSON.stringify(param);

    wx.setStorage({
      key: 'userName',
      data: this.data.userName
    });
    wx.setStorage({
      key: 'userPassword',
      data: this.data.userPwd
    });
    var that = this;
    wx.request({
      url: daqpath + 'dispatcher.action?',
      data: "requestString=" + encodeURIComponent(paramdata),
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {

        var jsonData = JSON.parse(res.data.data);
        var code = jsonData.code
        var message = jsonData.message;
 

        //返回200登录成功跳转页面
        if (code == 200) {
          var employee = jsonData.user;
          var usergroup = jsonData.user.usergroup;


          wx.showToast({
            title: '登录成功',
          })
          wx.setStorage({
            key: 'login_style',
            data: 'guoanxia_login'
          });
          wx.setStorage({
            key: 'employee',
            data: jsonData
          });
          wx.setStorage({
            key: 'employee_no',
            data: employee.employeeId
          });
        
          app.globalData.isLogin_code = code;
          app.globalData.employee_no = employee.employeeId;
          app.globalData.employee_name = employee.name;
          app.globalData.employee_zw = employee.zw;
          app.globalData.inviteCode = employee.inviteCode;
          app.globalData.guoanxiaisLogin = 'guoanxia_login';
     
          app.globalData.showStore=false;
          app.globalData.showShareBut=true;
          that.setData({
            currentPage: 1,
            worklist: [],
            guoanxiaisLogin: app.globalData.guoanxiaisLogin
           
          })
         that.shareWorkData();


          that.setData({
            showLoginView: false,
            showStore:false,
            showShareBut:true
          })
        } else {
          wx.showModal({
            title: '',
            content: message,
            showCancel: false,
            confirmText: "确定"
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
  setStatus: function (status, worder_sn) {

    var that = this;
    var param = Object();
    param.managerName = "InterManager";
    param.methodName = "updateStoreOrderStatusByNo";
   

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


  },
   getDateDiff:function (dateTimeStamp){
  
    var result;
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var halfamonth = day * 15;
    var month = day * 30;
    var now = new Date().getTime();
    var diffValue = now - dateTimeStamp;
    if(diffValue < 0){
      return "刚刚";
    }
    var monthC = diffValue / month;
    var weekC = diffValue / (7 * day);
    var dayC = diffValue / day;
    var hourC = diffValue / hour;
    var minC = diffValue / minute;
   
    if (weekC>=2) {
      var date = new Date(dateTimeStamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '/';
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
      var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      result= Y + M + D;
    }else if(weekC>=1) {
      result = "" + parseInt(weekC) + "周前";
    } else if(dayC>=1) {
      result = "" + parseInt(dayC) + "天前";
    }else if(hourC>=1) {
      result = "" + parseInt(hourC) + "小时前";
    } else if(minC>=1) {
      result = "" + parseInt(minC) + "分钟前";
    }else{
      result="刚刚";
    }

    return result;
  },
   timestampToTime: function (timestamp) {
     var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
     var Y = date.getFullYear() + '-';
     var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
     var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
     var h = date.getHours() + ':';
     var m = date.getMinutes() + ':';
     var s = date.getSeconds();
     console.log(Y + M + D + h + m + s);
     return Y + M + D;
   },
   inputSearch: function (e) {  //输入搜索文字
     this.setData({
       searchtext: e.detail.value
     })
   },
   submitSearch: function () {  //提交搜索
     console.log(this.data.searchtext);
     this.setData({
       currentPage: 1,
       searchLoadingComplete: false, //“没有数据”的变量，默认false，隐藏 
       worklist: []
     });
     if (this.data.guoanxiaisLogin == 'guoanxia_login') {
       this.shareWorkData();
     } else {
       this.fetchServiceData();
     }
   },
  
 


})