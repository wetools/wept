import Nprogress from 'nprogress'
import * as util from './util'
import {onReloadJson, onReloadJavascript, notifyView} from './notify'
import Bus from './bus'
import {navigateBack, navigateTo, currentView} from './viewManage'
import {onBack} from './service'
import toast from './component/toast'
import tabbar from './tabbar'
import {lifeSycleEvent} from './service'
require('./message')

Nprogress.start()
util.createFrame('service', '/appservice', true)

Bus.on('back', () => {
  let curr = currentView()
  navigateBack()
  if (!curr.external) onBack()
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
      let isGlobal = pages.indexOf(p.replace(/\.(\w+)$/, '')) == -1
      if (/\.json$/.test(p)) {
        onReloadJson(p, isGlobal, data.content)
      } else if (/\.wxss$/.test(p) || /\.wxml$/.test(p)) {
        notifyView(p, isGlobal)
      } else if (/\.js$/.test(p)) {
        onReloadJavascript(p, isGlobal)
      }
      // ignore unknow filetype
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

