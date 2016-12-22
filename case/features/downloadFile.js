Page({
  data:{
    // text:"这是一个页面"
  },
  onLoad: function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  download: function (e) {
    wx.downloadFile({
      url: "http://localhost:4000/apple_music.png",
      type: "image",
      success: function(res) {
        console.log(res)
      }
    })
  }
})
