Page({
  data:{
  },
  onLoad: function(options){
  },
  scancode: function () {
    wx.scanCode({
      success: (res) => {
        console.log(res)
      }
    })
  }
})
