import merge from 'merge'
import {parsePath, isTabbar} from './util'
import Bus from './bus'
import {currentView} from './viewManage'

let serviceReady = false
const SERVICE_ID = 100000

Bus.once('APP_SERVICE_COMPLETE', () => {
  serviceReady = true
  window.postMessage({
    to: 'devtools',
    sdkName: 'APP_SERVICE_COMPLETE'
  }, '*')
})

function message(obj) {
  let el = document.getElementById('service')
  el.contentWindow.postMessage(obj, '*')
}

export function toAppService(data) {
  data.to = 'appservice'
  let obj = merge.recursive(true, {
    command: 'MSG_FROM_WEBVIEW',
    webviewID: SERVICE_ID
  }, data)

  if (obj.msg) {
    let view = currentView()
    let id = view ? view.id : 0
    if (obj.command !== 'GET_ASSDK_RES') {
      obj.msg.webviewID = data.webviewID || id
      obj.msg.options = obj.msg.options || {}
      obj.msg.options.timestamp = Date.now()
    }
  }
  if (serviceReady) {
    message(obj)
  } else {
    Bus.once('APP_SERVICE_COMPLETE', () => {
      message(obj)
    })
  }
}

export function lifeSycleEvent(path, query, openType) {
  toAppService({
    msg: {
      eventName: 'onAppRoute',
      type: 'ON_APPLIFECYCLE_EVENT',
      data: {
        path: `${path}.wxml`,
        query: query,
        openType: openType
      }
    }
  })
}

export function onLaunch(rootPath) {
  let {path, query} = parsePath(rootPath)
  lifeSycleEvent(path, query, 'appLaunch')
}

export function onBack() {
  let view = currentView()
  lifeSycleEvent(view.path, view.query, 'navigateBack')
}

export function onNavigate(data, type = 'navigateTo') {
  if (!data.args.url) {
    console.error(`url argument not found for wx.${type}`)
    return
  }
  let view = currentView()
  if ((type == 'navigateTo' || type == 'redirectTo')
      && isTabbar(view.url)) {
    console.error('wx.navigateTo wx.redirectTo 不允许跳转到 tabbar 页面，请使用 wx.switchTab')
    return
  }
  message({
    to: 'appservice',
    msg: {
      errMsg: `${data.sdkName}:ok`,
      url: data.args.url,
      webviewId: view.id
    },
    command: 'GET_ASSDK_RES',
    ext: merge.recursive(true, {}, data),
    webviewID: SERVICE_ID
  })
  view.onReady(() => {
    lifeSycleEvent(view.path, view.query,type)
  })
}
