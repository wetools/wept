// handle COMMAND_FROM_ASJS
import Nprogress from 'nprogress'
import Bus from './bus'
import * as viewManage from './viewManage'
import {onNavigate, onLaunch} from './service'
import header from './header'

// get current page
let root_path = window.location.hash.replace('#', '') || window.__root__

if (!root_path) throw new Error('path not found')

// publish event to views
export function publish(data) {
  let ids = data.webviewIds
  let all_ids = viewManage.getViewIds()
  if (!ids) {
    ids = all_ids
  } else {
    ids = ids.filter(id => {
      return all_ids.indexOf(id) !== -1
    })
  }
  data.act = 'sendMsgFromAppService'
  let obj = {
    msg: data,
    command: 'MSG_FROM_APPSERVICE'
  }
  ids.forEach(id => {
    let view = viewManage.getViewById(id)
    view.postMessage(obj)
  })
}

export function redirectTo(data) {
  Nprogress.start()
  viewManage.redirectTo(data.args.url)
  onNavigate(data)
}

export function navigateTo(data) {
  Nprogress.start()
  viewManage.navigateTo(data.args.url)
  onNavigate(data)
}

export function APP_SERVICE_COMPLETE(data) { //eslint-disable-line
  Bus.emit('APP_SERVICE_COMPLETE')
  viewManage.navigateTo(root_path)
  onLaunch(root_path)
}

export function send_app_data(data) {
  data.appData
  // TODO edit for appData
  //console.log(data)
  //data.appData
}

export function setNavigationBarTitle(data) {
  let title = data.args.title
  if (title) header.setTitle(title)
}

export function showNavigationBarLoading() {
  header.showLoading()
}

export function hideNavigationBarLoading() {
  header.hideLoading()
}
