const gasmpath = require('./../../config').gasmpath;
const daqpath = require('./../../config').daqpath;
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    thumb: '',
    nickiphone: '',
    shareData: {
      title: '国安数据微服务',
      desc: '国安数据微服务',
      path: '/pages/home/home'
    },
    user_name: '--',
    employee_id: '--',
    zw: '--',
    inviteCode: "--"


  },
  exit_logon: function () {
    wx.showModal({
      title: '提示',
      content: '是否确认退出登录',
      success: function (res) {
        if (res.confirm) {

          
          app.globalData.showStore=true;
          app.globalData.employee_name = null;
          app.globalData.employee_no = null;
          app.globalData.employee_zw = null;
          app.globalData.isLogin_code=null;
          app.globalData.showShareBut=false;
          app.globalData.guoanxiaisLogin=null;

         
          wx.setStorage({
            key: 'login_style',
            data: ''
          });
          wx.navigateBack({
            delta: 2
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },

  /**
  * 用户点击右上角分享
  */
  onShareAppMessage: function () {
    return this.data.shareData
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
  
    that.setData({
      employee_id: (app.globalData.employee_no == null || app.globalData.employee_no == '' || app.globalData.employee_no == undefined) ? '--' : app.globalData.employee_no,
      user_name: (app.globalData.employee_name == null || app.globalData.employee_name == '' || app.globalData.employee_name == undefined) ? '--' : app.globalData.employee_name,
      zw: (app.globalData.employee_zw == null || app.globalData.employee_zw == '' || app.globalData.employee_zw == undefined) ? '--' : app.globalData.employee_zw,
      inviteCode: (app.globalData.inviteCode == null || app.globalData.inviteCode == '' || app.globalData.inviteCode == undefined) ? '暂无数据' : app.globalData.inviteCode
      
    })
    var a=null;
    wx.getStorage({
      key: 'phoneNumber',
      success: function (res) {
        that.setData({
        nickiphone: res.data
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

  }
})