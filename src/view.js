import Nprogress from 'nprogress'
import Emitter from 'emitter'
import {uid, createFrame, parsePath} from './util'
import merge from 'merge'

export default class View extends Emitter {
  constructor(path) {
    if (!path) throw new Error('path required for view')
    super()
    let id = this.id = uid()
    let o = parsePath(path)
    this.url = path
    this.path = o.path
    this.query = o.query
    let external = this.external = /^http(s)?:\/\//.test(path)
    let root = document.querySelector('.scrollable')
    let url = external ? path : `/app/${o.path}.wxml`
    this.el = createFrame(`view-${id}`, url, false, root)
    let gbc = window.__wxConfig__.window.backgroundColor || '#fff'
    this.el.style.backgroundColor = gbc
    let ua = window.navigator.userAgent
    Object.defineProperty(this.el.contentWindow.navigator, 'userAgent', {
      get : function () {
        return `${ua} wechatdevtools webview/${id}`
      }
    })
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
    let obj = merge.recursive(true, {
      to: 'webframe',
      webviewID: this.id,
      id: Math.random()
    }, data)
    this.el.contentWindow.postMessage(obj, '*')
  }
  reload(path) {
    this.postMessage({
      msg: {
        data: {
          data: { path }
        },
        eventName: 'reload'
      },
      command: 'CUSTOM'
    })
  }
}
