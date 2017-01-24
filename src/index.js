import Nprogress from 'nprogress'
import * as util from './util'
import Bus from './bus'
import {eachView, navigateBack, navigateTo, currentView} from './viewManage'
import {onBack, lifeSycleEvent, toAppService} from './service'
import toast from './component/toast'
import tabbar from './tabbar'
import debounce from 'debounce'
import * as nativeMethods from './native'
require('./message')

let ua = navigator.userAgent
Object.defineProperty(navigator, 'userAgent', {
  get : function () {
    return ua + ' weapp'
  }
})

Nprogress.start()

Bus.on('back', () => {
  let curr = currentView()
  navigateBack()
  if (!curr.external) onBack()
})

Bus.on('share', () => {
  toAppService({
    msg: {
      data: {
        data: '{}'
      },
      eventName: "onShareAppMessage"
    }
  })
})

tabbar.on('active', pagePath => {
  let curr = currentView()
  if (curr && curr.url == pagePath) return
  let {path, query} = util.parsePath(pagePath)
  navigateTo(pagePath, true)
  lifeSycleEvent(path, query, 'switchTab')
})

Bus.on('route', (n, curr) => {
  tabbar.show(curr.url)
})

let socket = new WebSocket(`ws://${location.host}`)
socket.onopen = function () {
  console.log('=> socket open')
}

socket.onmessage = function (e) {
  let data = JSON.parse(e.data)
  let p = data.path
  let pages = window.__wxConfig__.pages
  if (data.type == 'error') {
    toast(data.msg || '未知错误', {type: 'error'})
  } else if (data.type == 'reload'){
    if (!p) {
      util.reload()
    } else {
      let path = p.replace(/\.(\w+)$/, '')
      let isGlobal = pages.indexOf(path) == -1
      if (isGlobal || /\.(js|json)$/.test(p) ) {
        window.location.reload()
        return
      }
      if (/\.wxss$/.test(p)) {
        eachView(view => {
          if (path == view.path) view.reloadWxss(p)
        })
      } else if (/\.wxml$/.test(p)) {
        eachView(view => {
          if (path == view.path) view.reloadWxml(path, isGlobal)
        })
      }
    }
  }
}

socket.onerror = function (e) {
  console.error('socket error ' + e.message)
}

window.addEventListener('unload', function () {
  // reload all pages
  socket.close()
})

window.addEventListener('resize', debounce(function () {
  eachView(view => {
    view.resizeWxss()
  })
}, 200))

let serviceFrame = util.createFrame('service', '/appservice', true)
Object.defineProperty(serviceFrame.contentWindow, 'prompt', {
  get: function () {
    return function (str) {
      if (str.indexOf('____sdk____') !== 0) {
        return console.warn(`Invalid prompt ${str}`)
      }
      let obj = JSON.parse(str.replace(/^____sdk____/, ''))
      let method = obj.sdkName
      if (nativeMethods.hasOwnProperty(method)) {
        return JSON.stringify(nativeMethods[method](obj))
      } else {
        console.warn(`${method} not found on native.js`)
      }
    }
  }
})
