import Nprogress from 'nprogress'
import merge from 'merge'
import Bus from './bus'
import * as viewManage from './viewManage'
import {onNavigate, onLaunch} from './service'
import header from './header'
import throttle from 'throttleit'
import {toAppService} from './service'
import Compass from './compass'

let appData = {} //eslint-disable-line

// get current page
let root_path = window.location.hash.replace('#', '') || window.__root__

if (!root_path) throw new Error('path not found')

// publish event to views
export function publish(data) {
  let all_ids = viewManage.getViewIds()
  let ids = data.webviewIds || all_ids
  data.act = 'sendMsgFromAppService'
  let obj = {
    msg: data,
    command: 'MSG_FROM_APPSERVICE'
  }
  viewManage.eachView(view => {
    if (ids.indexOf(view.id) !== -1) {
      view.postMessage(obj)
    }
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

export function navigateBack(data) {
  viewManage.navigateBack()
  data.args.url = viewManage.currentView().url
  onNavigate(data)
}

export function APP_SERVICE_COMPLETE(data) { //eslint-disable-line
  Bus.emit('APP_SERVICE_COMPLETE')
  viewManage.navigateTo(root_path)
  onLaunch(root_path)
}

export function send_app_data(data) {
  appData = data.appData
  // TODO edit for appData
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

export function enableCompass() {
  let id = Compass.watch(throttle(head => {
    toAppService({
      msg: {
        eventName: 'onCompassChange',
        type: 'ON_APPLIFECYCLE_EVENT',
        data: {
          direction: head
        }
      }
    })
  }, 200))
  viewManage.currentView().on('destroy', () => {
    Compass.unwatch(id)
  })
}

export function enableAccelerometer() {
  if(window.DeviceMotionEvent){
    let handler = throttle(event => {
      let {x, y, z} = {
        x: event.accelerationIncludingGravity.x,
        y: event.accelerationIncludingGravity.y,
        z: event.accelerationIncludingGravity.z
      }
      if (x == null || y == null || z == null) return
      toAppService({
        msg: {
          eventName: 'onAccelerometerChange',
          type: 'ON_APPLIFECYCLE_EVENT',
          data: {x, y, z}
        }
      })
    }, 200)
    window.addEventListener("devicemotion", handler, false);
    viewManage.currentView().on('destroy', () => {
      window.removeEventListener("devicemotion", handler, false);
    })
  } else {
    console.warn("DeviceMotionEvent is not supported");
  }
}

export function getNetworkType(data) {
  let type = navigator.connection == null ? 'WIFI' : navigator.connection.type
  toAppService({
    command: 'GET_ASSDK_RES',
    ext: merge.recursive(true, {}, data),
    msg: {
      errMsg: "getNetworkType:ok",
      networkType: type
    }
  })
}

export function getSystemInfo(data) {
  toAppService({
    command: 'GET_ASSDK_RES',
    ext: merge.recursive(true, {}, data),
    msg: {
      errMsg: "getSystemInfo:ok",
      model: "iPhone6",
      pixelRatio: 2,
      windowWidth: 320,
      windowHeight: 528,
      language: "zh_CN",
      version: "6.3.9"
    }
  })
}

export function getLocation(data) {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(position => {
      let coords = position.coords
      toAppService({
        command: 'GET_ASSDK_RES',
        ext: merge.recursive(true, {}, data),
        msg: {
          errMsg: "getLocation:ok",
          longitude: coords.longitude,
          latitude: coords.latitude
        }
      })
    })
  } else {
    console.warn('navigator.geolocation not supported')
  }
}

export function openLocation(data) {
  let args = data.args
  let url = "http://apis.map.qq.com/tools/poimarker?type=0&marker=coord:" + args.latitude + "," + args.longitude + "&key=JMRBZ-R4HCD-X674O-PXLN4-B7CLH-42BSB&referer=wxdevtools"
  viewManage.openExternal(url)
  Nprogress.done()
  toAppService({
    command: 'GET_ASSDK_RES',
    ext: data,
    msg: {
      errMsg: "openLocation:ok",
      latitude: args.latitude,
      longitude: args.longitude
    }
  })
}
