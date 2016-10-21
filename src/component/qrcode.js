const assign = require('object-assign')
const event = require('event')
const domify = require('domify')
const jrQrcode = require('jr-qrcode')

module.exports = (function () {
  let overlay = document.createElement('div')
  let ip = window.__ip__
  assign(overlay.style, {
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    color: '#ffffff',
    padding: '60px 0',
    zIndex: 9999999,
    backgroundColor: '#000'
  })
  overlay.className = 'qr-overlay'
  overlay.appendChild(domify(`<div class="qr-head">请使用微信「扫一扫」扫码</div>`))
  overlay.appendChild(domify(`<div class="qr-body"><img src="" /></div>`))

  event.bind(overlay, 'click', () => {
    document.body.removeChild(overlay)
  })

  return {
    show: function () {
      document.body.appendChild(overlay)
      let img = overlay.querySelector('img')
      let loc = window.location
      let base64 = jrQrcode.getQrBase64(`http://${ip}:${loc.port}/${loc.hash}`, {
        padding: 5,   //二维码四边空白，默认为10px
        width: 256,  //二维码图片宽度，默认为256px
        height: 256,  //二维码图片高度，默认为256px
        //correctLevel: QRErrorCorrectLevel.H,    // eslint-disable-line
        background: "#fff",    //二维码颜色
        foreground: "#000"     //二维码背景颜色
      })
      img.src = base64
    }
  }
})()
