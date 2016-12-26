Page({
  data:{
    name: 'unknown',
    gender: 'male',
  },
  changeData() {
    this.setData({
      name: 'foo',
    })
    this.setData({
      gender: 'female'
    })
  }
})
