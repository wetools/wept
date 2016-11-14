import merge from 'merge'
import Emitter from 'emitter'
import {uid, createFrame, parsePath} from './util'

function isMap(path) {
  return /^http(s)?:\/\/(apis\.map|3gimg\.qq\.com)/.test(path)
}

export default class View extends Emitter {
  constructor(path) {
    if (!path) throw new Error('path required for view')
    super()
    let id = this.id = uid()
    let o = parsePath(path)
    this.url = path
    this.path = o.path
    this.query = o.query
    this.isMap = isMap(path)
    let external = this.external = /^http(s)?:\/\//.test(path)
    let root = document.querySelector('.scrollable')
    let width = window.screen.width
    let ratio = window.devicePixelRatio
    let url = external ? path : `/app/${o.path}.wxml?w=${width}&r=${ratio}`
    this.el = createFrame(`view-${id}`, url, false, root)
    let ua = window.navigator.userAgent
    Object.defineProperty(this.el.contentWindow.navigator, 'userAgent', {
      get : function () {
        return `${ua} wechatdevtools webview/${id}`
      }
    })
    Object.defineProperty(this.el.contentWindow.console, 'warn', {
      get : function () {
        return function () {}
      }
    })
    let self = this
    Object.defineProperty(this.el.contentWindow, '__wxConfig', {
      get: function () {
        return self.getConfig()
      }
    })
  }
  setLocation(data) {
    this.location = {
      name: data.poiname,
      address: data.poiaddress,
      latitude: data.latlng.lat,
      longitude: data.latlng.lng
    }
    console.log(this.location)
  }
  getConfig() {
    let win = window.__wxConfig__.window
    let obj = {
      backgroundTextStyle: win.backgroundTextStyle || 'dark',
      backgroundColor: win.backgroundColor || '#fff',
      enablePullDownRefresh: win.enablePullDownRefresh || false
    }
    let winConfig = win.pages[this.path] || {}
    Object.keys(obj).forEach(function (key) {
      if (winConfig.hasOwnProperty(key)) {
        obj[key] = winConfig[key]
      }
    })
    return { window: obj }
  }
  hide() {
    this.el.style.display = 'none'
  }
  show() {
    this.el.style.display = 'block'
  }
  destroy() {
    this.emit('destroy')
    this.el.parentNode.removeChild(this.el)
  }
  postMessage(data) {
    if (!this.el) return
    let obj = merge.recursive(true, {
      to: 'webframe',
      webviewID: this.id,
      id: Math.random()
    }, data)
    obj.msg = data.msg || {}
    this.el.contentWindow.postMessage(obj, '*')
  }
  reloadWxss(path) {
    let width = window.screen.width
    let ratio = window.devicePixelRatio
    if (this.el.contentWindow.hasOwnProperty('reloadWxss')) {
      this.el.contentWindow.reloadWxss(width, ratio, path)
    }
  }
  resizeWxss() {
    let width = window.screen.width
    let ratio = window.devicePixelRatio
    if (this.el.contentWindow.hasOwnProperty('resizeWxss')) {
      this.el.contentWindow.resizeWxss(width, ratio)
    }
  }
  reloadWxml(path, isGlobal) {
    if (!isGlobal && path !== this.path) return
    // load generateFn and notify view
    //this.el.contentWindow.__gen()
    let root = this.el
    let p = this.path
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var text = xhr.responseText
          var func = new Function(text + '\n return $gwx("./' + p + '.wxml")')
          root.contentWindow.__generateFunc__ = func()
          this.postMessage({
            msg: {
              eventName: "appDataChange",
              data: {
                data:{}
              },
              sdkName: "publish",
              to: "backgroundjs",
              comefrom: "webframe",
              command: "COMMAND_FROM_ASJS"
            },
            command: "MSG_FROM_APPSERVICE",
          })
          console.info('Hot apply: ' + p + '.wxml')
        }
      }
    }
    xhr.open('GET', '/generateFunc?path=' + encodeURIComponent(p))
    xhr.send()
  }
}
