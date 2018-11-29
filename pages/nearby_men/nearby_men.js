const gasmpath = require('./../../config').gasmpath;
const daqpath = require('./../../config').daqpath;
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: '',
    shareData: {
      title: '国安数据微服务',
      desc: '国安数据微服务',
      path: '/pages/home/home'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(app.globalData.longitude + ',' + app.globalData.latitude);
    // this.setData({
    //   url: webUrl + 'app_webview/store_round.html?target=2&centerPosition=' + app.globalData.longitude + ',' + app.globalData.latitude
    // })

  },
  /**
  * 用户点击右上角分享
  */
  onShareAppMessage: function () {
    return this.data.shareData
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
    var that=this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        app.globalData.latitude = latitude;
        app.globalData.longitude = longitude;
        that.setData({
          url: daqpath + 'app_webview/store_round.html?target=2&centerPosition=' + longitude + ',' + latitude
        })

      },fail:function(){
        that.setData({
          url: daqpath + 'app_webview/store_round.html?target=2&centerPosition=' + app.globalData.longitude + ',' + app.globalData.latitude
        })

      }
    });
    

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