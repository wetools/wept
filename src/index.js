import Nprogress from 'nprogress'
import * as util from './util'
import {onReload} from './notify'
import Bus from './bus'
import header from './header'
import {navigateBack} from './viewManage'
import {onBack} from './service'
import toast from './toast'
require('./message')
require('./polyfill')

Nprogress.start()
util.createFrame('service', '/appservice', true)

header.on('back', () => {
  navigateBack()
  onBack()
})

Bus.on('route', n => {
  header.resetTitle()
  if (n > 1) {
    header.backStatus(true)
  } else {
    header.backStatus(false)
  }
})

let socket = new WebSocket(`ws://${location.host}`)
socket.onopen = function () {
  console.log('=> socket open')
}

socket.onmessage = function (e) {
  let data = JSON.parse(e.data)
  let p = data.path
  if (data.type == 'error') {
    toast(data.msg || '未知错误', {type: 'error'})
  } else if (data.type == 'reload'){
    if (!p) {
      redirectToHome()
    } else {
      onReload(p)
    }
  }
}

socket.onerror = function (e) {
  console.error('socket error ' + e.message)
}

function redirectToHome() {
  // reload all pages
  socket.close()
  window.history.replaceState({path: '/'}, '', '/')
  window.location.reload()
}
