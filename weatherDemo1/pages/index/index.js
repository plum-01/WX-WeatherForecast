Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['福建省', '厦门市', '集美区'],
    locationID: 101230201,
    now: {
      temp: 0,
      text: '未知',
      icon: '999',
      humidity: 0,
      pressure: 0,
      vis: 0,
      windDir: 0,
      windSpeed: 0,
      windScale: 0,
    }
  },

  // 更新地区
  regionChange: function(e) {
    this.setData({region: e.detail.value});
    this.getlocationID().then(result => {
      this.getWeather();
    });
  },

  // 获取地区id
  getlocationID() {
    var that = this;
    return new Promise(resolve => {
      wx.request({
        url: 'https://geoapi.qweather.com/v2/city/lookup?',
        data: {
          location: that.data.region[2],
          adm: that.data.region[1],
          key: '...'  // 改成自己的和风天气秘钥
        },
        success: res => {
          console.log(res.data);
          that.setData({locationID:res.data.location[0].id})
          return resolve();
        },
      })
    });
  },

  // 获取实时天气状况
  getWeather() {
    var that = this;
    wx.request({
      url: 'https://devapi.qweather.com/v7/weather/now',
      data: {
        location: that.data.locationID,
        key: '...'  // 改成自己的和风天气秘钥
      },
      success:function(res) {
        console.log(res.data.now);
        that.setData({now: res.data.now});
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getlocationID().then(result => {
      this.getWeather();
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
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})