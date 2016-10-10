import record from './record'
import Nprogress from 'nprogress'
import merge from 'merge'
import Bus from './bus'
import * as viewManage from './viewManage'
import {onNavigate, onLaunch} from './service'
import header from './header'
import throttle from 'throttleit'
import {toAppService} from './service'
import Compass from './compass'
import storage from './storage'
import {once} from './event'

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

export function setStorage(data) {
  let args = data.args
  storage.set(args.key, args.data)
  if (args.key == null || args.key == '') {
    return toAppService({
      command: "GET_ASSDK_RES",
      ext: merge.recursive(true, {}, data),
      msg: {
        errMsg: "setStorage:fail"
      }
    })
  }
  toAppService({
    command: "GET_ASSDK_RES",
    ext: merge.recursive(true, {}, data),
    msg: {
      errMsg: "setStorage:ok"
    }
  })
}

export function getStorage(data) {
  let args = data.args
  if (args.key == null || args.key == '') {
    return toAppService({
      command: "GET_ASSDK_RES",
      ext: merge.recursive(true, {}, data),
      msg: {
        errMsg: "getStorage:fail"
      }
    })
  }
  let res = storage.get(args.key)
  let t = typeof res
  let dataType = t[0].toUpperCase() + t.slice(1)
  toAppService({
    command: "GET_ASSDK_RES",
    ext: merge.recursive(true, {}, data),
    msg: {
      errMsg: "getStorage:ok",
      data: res,
      dataType
    }
  })
}

export function clearStorage(data) {
  storage.clear()
  toAppService({
    command: "GET_ASSDK_RES",
    ext: merge.recursive(true, {}, data),
    msg: {
      errMsg: "clearStorage:ok"
    }
  })
}

export function startRecord(data) {
  record.startRecord({
    success: url => {
      toAppService({
        command: "GET_ASSDK_RES",
        ext: merge.recursive(true, {}, data),
        msg: {
          errMsg: "startRecord:ok",
          tempFilePath: url
        }
      })
    },
    fail: err => {
      toAppService({
        command: "GET_ASSDK_RES",
        ext: merge.recursive(true, {}, data),
        msg: {
          errMsg: "startRecord:fail",
          message: err.message
        }
      })
    }
  }).catch((e) => {
    console.warn(`Audio record failed: ${e.message}`)
  })
}

export function stopRecord() {
  record.stopRecord()
}

export function playVoice(data) {
  let url = data.args.filePath
  let audio = document.getElementById("audio");
  if (audio.src && audio.paused && !audio.ended) {
    // resume
    audio.play()
  } else {
    audio.src = url;
    audio.load();
    audio.play();
    once(audio, 'error', () => {
      toAppService({
        command: "GET_ASSDK_RES",
        ext: merge.recursive(true, {}, data),
        msg: {
          errMsg: "playVoice:fail"
        }
      })
    })
    once(audio, 'ended', () => {
      toAppService({
        command: "GET_ASSDK_RES",
        ext: merge.recursive(true, {}, data),
        msg: {
          errMsg: "playVoice:ok"
        }
      })
    })
  }
}

export function pauseVoice() {
  let audio = document.getElementById("audio");
  audio.pause()
}

export function stopVoice() {
  let audio = document.getElementById("audio");
  audio.pause()
  audio.currentTime = 0
  audio.src = null
}

export function getMusicPlayerState(data) {
  let a = document.getElementById("background-audio");
  let obj = {
    status: a.src ? a.paused ? 0 : 1 : 2,
    currentPosition: Math.floor(a.currentTime) || -1
  }
  if (a.src && !a.paused) {
    obj.duration = a.duration || 0
    try {
      obj.downloadPercent = Math.round(100*a.buffered.end(0)/a.duration)
    } catch(e) {
    }
    obj.dataUrl = a.currentSrc
  }
  obj.errMsg = "getMusicPlayerState:ok"
  toAppService({
    command: "GET_ASSDK_RES",
    ext: merge.recursive(true, {}, data),
    msg: obj
  })
}

export function operateMusicPlayer(data) {
  let args = data.args
  let a = document.getElementById("background-audio");
  switch (args.operationType) {
    case 'play':
      if (a.src == args.dataUrl && a.paused && !a.ended) {
        a.play()
      } else {
        a.src = args.dataUrl
        a.load()
        a.loop = true
        a.play()
      }
      break
    case 'pause':
      a.pause()
      break
    case 'seek':
      a.currentTime = args.position
      break
    case 'stop':
      a.pause()
      a.currentTime = 0
      a.src = null
      break
  }
  toAppService({
    command: "GET_ASSDK_RES",
    ext: merge.recursive(true, {}, data),
    msg: {
      errMsg: "operateMusicPlayer:ok"
    }
  })
}
