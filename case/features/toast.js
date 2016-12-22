Page({
  data:{
  },
  onLoad: function(options){
  },
  showToast: function () {
    wx.showToast({
      mask: true,
      title: '成功',
      icon: 'success',
      duration: 2000
    })
  }
})
