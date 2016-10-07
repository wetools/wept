import {uid, createFrame, parsePath} from './util'
import merge from 'merge'

export default class View {
  constructor(path) {
    if (!path) throw new Error('path required for view')
    let id = this.id = uid()
    let o = parsePath(path)
    this.path = o.path
    this.query = o.query
    this.el = createFrame(`view-${id}`, `/app/${path}`)
    let gbc = window.__wxConfig__.window.backgroundColor || '#fff'
    this.el.style.backgroundColor = gbc
    let ua = window.navigator.userAgent
    Object.defineProperty(this.el.contentWindow.navigator, 'userAgent', {
      get : function () {
        return `${ua} webview/${id}`
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
