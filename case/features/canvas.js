Page({
  data:{
    // text:"这是一个页面"
  },
  onLoad: function(options){
    // 页面初始化 options为页面跳转所带来的参数
    const ctx = wx.createCanvasContext('myCanvas')
    ctx.setFillStyle('red')
    ctx.fillRect(10, 10, 150, 75)
    ctx.draw()
  }
})
