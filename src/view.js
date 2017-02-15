import Bus from './bus'
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
    let width = window.innerWidth
    let ratio = window.devicePixelRatio
    let url = external ? path : `/app/${o.path}.wxml?w=${width}&r=${ratio}`
    this.el = createFrame(`view-${id}`, url, false, root)
    this.ready = false
    if (this.isMap) {
      this.el.contentWindow.addEventListener('load', () => {
        this._onReady()
      })
    } else {
      Bus.on('ready', viewId => {
        if (viewId == id) {
          this._onReady()
        }
      })
    }
    this.readyCallbacks = []
  }
  _onReady() {
    if (this._removed) return
    let cbs = this.readyCallbacks
    if (!cbs) {
      Bus.emit('reload', this)
      return
    }
    this.ready = true
    for (let cb of cbs) {
      cb()
    }
    this.readyCallbacks = null
  }
  onReady(cb) {
    if (this.ready) return cb()
    this.readyCallbacks.push(cb)
  }
  setLocation(data) {
    this.location = {
      name: data.poiname,
      address: data.poiaddress,
      latitude: data.latlng.lat,
      longitude: data.latlng.lng
    }
    // TODO implement map location
    console.log(this.location)
  }
  hide() {
    this.el.style.display = 'none'
  }
  show() {
    this.el.style.display = 'block'
  }
  destroy() {
    this._removed = true
    this.emit('destroy')
    this.off()
    this.el.parentNode.removeChild(this.el)
  }
  postMessage(data) {
    this.onReady(() => {
      let obj = merge.recursive(true, {
        to: 'webframe',
        webviewID: this.id,
        id: Math.random()
      }, data)
      obj.msg = data.msg || {}
      this.el.contentWindow.postMessage(obj, '*')
    })
  }
  reloadWxss(path) {
    let width = window.innerWidth
    let ratio = window.devicePixelRatio
    if (this.el.contentWindow.hasOwnProperty('reloadWxss')) {
      this.el.contentWindow.reloadWxss(width, ratio, path)
    }
  }
  resizeWxss() {
    let width = window.innerWidth
    let ratio = window.devicePixelRatio
    if (this.el.contentWindow.hasOwnProperty('resizeWxss')) {
      this.el.contentWindow.resizeWxss(width, ratio)
    }
  }
  reloadWxml() {
    // load generateFn and notify view
    this.el.contentWindow.location.reload()
  }
}
