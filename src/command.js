import Nprogress from 'nprogress'
import filePicker from 'file-picker'
import merge from 'merge'
import Upload from 'upload'
import Serial from 'node-serial'
import Bus from './bus'
import * as viewManage from './viewManage'
import {onNavigate, onLaunch} from './service'
import header from './header'
import throttle from 'throttleit'
import {toAppService} from './service'
import record from './sdk/record'
import Compass from './sdk/compass'
import storage from './sdk/storage'
import {once} from './event'
import Preview from './component/preview'
import confirm from './component/confirm'
import toast from './component/toast'
import mask from './component/mask'
import {getRedirectData, validPath} from './util'

const doc = document.documentElement


let appData = {} //eslint-disable-line
let fileIndex = 0
let fileStore = {}

// fix incorrect height when keyboard is up
let height = 0
document.addEventListener('DOMContentLoaded', function(e) { 
  height = Math.max(doc.clientHeight, window.innerHeight || 0)
})


export function getPublicLibVersion() {
  //ignore
}

export function systemLog() {
  //ignore
}

export function requestPayment(data) {
  confirm('确认支付吗？').then(() => {
    onSuccess('requestPayment', data)
  }, () => {
    onError('requestPayment', data)
  })
}

export function previewImage(data) {
  let args = data.args
  let urls = args.urls
  let current = args.current
  let preview = new Preview(urls, {})
  preview.show()
  preview.active(current)
  onSuccess('previewImage', data)
}

export function PULLDOWN_REFRESH(data) {
  toAppService({
    msg: {
      data: {},
      eventName: "onPullDownRefresh",
      webviewID: data.webviewID
    }
  })
}

export function stopPullDownRefresh(data) {
  let curr = viewManage.currentView()
  if (curr) {
    curr.postMessage({
      command: "STOP_PULL_DOWN_REFRESH"
    })
  }
}

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

function getRoutes() {
  let root = window.__root__
  let path = location.hash.replace(/^#!/, '')
  if (sessionStorage == null) return path ? [path] : [root]
  let str = sessionStorage.getItem('routes')
  if (!str) return path ? [path] : [root]
  let routes = str.split('|')
  if (routes.indexOf(path) !== routes.length - 1) {
    return [path]
  }
  return routes
}

export function APP_SERVICE_COMPLETE(data) { //eslint-disable-line
  Bus.emit('APP_SERVICE_COMPLETE')
  let routes = getRoutes()
  let first = routes.shift()
  let valid = validPath(first)
  // make sure root is valid page
  let root =  valid ? first : window.__root__
  viewManage.navigateTo(root)
  onLaunch(root)
  if (!valid) return
  if (routes.length) {
    mask.show()
    let cid = viewManage.currentView().id
    Bus.once('ready', id => {
      if (id !== cid) return mask.hide()
      let serial = new Serial()
      serial.timeout(10000)
      for (let route of routes) {
        // check if in pages
        valid = validPath(route)
        if (!valid) {
          console.warn(`无法在 pages 配置中找到 ${route}，停止路由`)
          break;
        }
        serial.add(cb => {
          let data = getRedirectData(`/${route}`, viewManage.currentView().id)
          toAppService(data)
          Bus.once('ready', () => cb())
        })
      }
      serial.done(err => {
        mask.hide()
        if (err) {
          console.error(err.stack)
          toast(err.message, {type: 'error'})
          return
        }
      })
    })
  }
}

export function send_app_data(data) {
  appData = data.appData
  // TODO edit for appData
  //console.log(appData)
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

export function chooseImage(data) {
  let URL = (window.URL || window.webkitURL)
  filePicker({ multiple: true, accept: 'image/*' }, files => {
    files = [].slice.call(files)
    let paths = files.map(file => {
      let blob = URL.createObjectURL(file)
      fileStore[blob] = file
      return blob
    })
    onSuccess('chooseImage', data, {
      tempFilePaths: paths
    })
  })
}

export function chooseVideo(data) {
  let URL = (window.URL || window.webkitURL)
  filePicker({accept: 'video/*' }, files => {
    let path = URL.createObjectURL(files[0])
    fileStore[path] = files[0]
    let video = document.createElement('video')
    video.preload = 'metadata'
    video.onloadedmetadata = function () {
      let duration = video.duration
      let size = files[0].size
      onSuccess('chooseVideo', data, {
        duration,
        size,
        height: video.videoHeight,
        width: video.videoWidth,
        tempFilePath: path
      })
    }
    video.src =  path
  })
}

export function saveFile(data) {
  let blob = data.args.tempFilePath
  if (!blob) return onError('saveFile', data, 'file path required')
  let file = fileStore[blob]
  if (!file) return onError('saveFile', data, 'file not found')
  let upload = new Upload(file)
  upload.to('/upload')
  upload.on('end', xhr => {
    if (xhr.status / 100 | 0 == 2) {
      let result = JSON.parse(xhr.responseText)
      onSuccess('saveFile', data, {
        savedFilePath: result.file_path
      })
    } else {
      onError('saveFile', data, `request error ${xhr.status}`)
    }
  })
  upload.on('error', err => {
    onError('saveFile', data, err.message)
  })
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
  onSuccess('getNetworkType', data, {
    networkType: type
  })
}

export function getSystemInfo(data) {
  onSuccess('getSystemInfo', data, {
    model: /iPhone/.test(navigator.userAgent) ? 'iPhone6' : 'Android',
    pixelRatio: window.devicePixelRatio || 1,
    windowWidth: Math.max(doc.clientWidth, window.innerWidth || 0),
    windowHeight: Math.max(height, Math.max(doc.clientHeight, window.innerHeight || 0)),
    language: window.navigator.userLanguage || window.navigator.language,
    version: "6.3.9"
  })
}

export function getLocation(data) {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(position => {
      let coords = position.coords
      onSuccess('getLocation', data, {
        longitude: coords.longitude,
        latitude: coords.latitude
      })
    })
  } else {
    onError('getLocation', data, {
      message: 'geolocation not supported'
    })
  }
}

export function openLocation(data) {
  let args = data.args
  let url = "http://apis.map.qq.com/tools/poimarker?type=0&marker=coord:" + args.latitude + "," + args.longitude + "&key=JMRBZ-R4HCD-X674O-PXLN4-B7CLH-42BSB&referer=wxdevtools"
  viewManage.openExternal(url)
  Nprogress.done()
  onSuccess('openLocation', data, {
    latitude: args.latitude,
    longitude: args.longitude
  })
}

export function setStorage(data) {
  let args = data.args
  storage.set(args.key, args.data, args.dataType)
  if (args.key == null || args.key == '') {
    return onError('setStorage', data, 'key required')
  }
  onSuccess('setStorage', data)
}

export function getStorage(data) {
  let args = data.args
  if (args.key == null || args.key == '') {
    return onError('getStorage', data, 'key required')
  }
  let res = storage.get(args.key)
  onSuccess('getStorage', data, {
    data: res.data,
    dataType: res.dataType
  })
}

export function clearStorage(data) {
  storage.clear()
  onSuccess('clearStorage', data)
}

export function startRecord(data) {
  record.startRecord({
    success: url => {
      onSuccess('startRecord', data, {
        tempFilePath: url
      })
    },
    fail: err => {
      return onError('startRecord', data, err.message)
    }
  }).catch((e) => {
    console.warn(`Audio record failed: ${e.message}`)
  })
}

export function stopRecord() {
  record.stopRecord().then(blob => {
    let filename = `audio${fileIndex}`
    fileIndex++
    let file = new File([blob], filename, {type: 'audio/x-wav', lastModified: Date.now()});
    fileStore[blob] = file
  })
}

export function playVoice(data) {
  let url = data.args.filePath
  let audio = document.getElementById("audio");
  if (audio.src && audio.paused && !audio.ended) {
    // resume
    audio.play()
  } else {
    audio.src = url
    audio.load()
    audio.play()
    once(audio, 'error', e => {
      onError('playVoice', data, e.message)
    })
    once(audio, 'ended', () => {
      onSuccess('playVoice', data)
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
  audio.src = ''
}

window.addEventListener('DOMContentLoaded', function () {
  let audio = document.getElementById("background-audio");
  audio.addEventListener('error', function () {
    toAppService({
      msg: {
        eventName: 'onMusicError',
        type: 'ON_MUSIC_EVENT'
      }
    })
  }, false)
}, false)

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
  onSuccess('getMusicPlayerState', data, obj)
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
      toAppService({
        msg: {
          eventName: 'onMusicPlay',
          type: 'ON_MUSIC_EVENT'
        }
      })
      break
    case 'pause':
      a.pause()
      toAppService({
        msg: {
          eventName: 'onMusicPause',
          type: 'ON_MUSIC_EVENT'
        }
      })
      break
    case 'seek':
      a.currentTime = args.position
      break
    case 'stop':
      a.pause()
      a.currentTime = 0
      a.src = ''
      toAppService({
        msg: {
          eventName: 'onMusicEnd',
          type: 'ON_MUSIC_EVENT'
        }
      })
      break
  }
  onSuccess('operateMusicPlayer', data)
}

export function uploadFile(data) {
  let args = data.args
  if (!args.filePath || !args.url || !args.name) {
    return onError('uploadFile', data, 'filePath, url and name required')
  }
  let file = fileStore[args.filePath]
  if (!file) return onError('uploadFile', data, `${args.filePath} not found`)

  let headers = args.header || {}
  let formData = args.formData || {}
  let xhr = new XMLHttpRequest()
  xhr.open('POST', '/remoteProxy')
  xhr.onload = function () {
    if (xhr.status / 100 | 0 == 2) {
      onSuccess('uploadFile', data)
    } else {
      onError('uploadFile', data, `request error ${xhr.status}`)
    }
  }
  xhr.onerror = function (e) {
    onError('uploadFile', data, `request error ${e.message}`)
  }
  let key
  for (key in headers) {
    xhr.setRequestHeader(key, headers[key]);
  }
  xhr.setRequestHeader('X-Remote', args.url);
  let body = new FormData
  body.append(args.name, file)
  for (key in formData) {
    body.append(key, formData[key])
  }
  xhr.send(body)
}

export function downloadFile(data) {
  let URL = (window.URL || window.webkitURL)
  let args = data.args
  if (!args.url) return onError('downloadFile', data, 'url required')
  let xhr = new XMLHttpRequest()
  xhr.responseType = 'arraybuffer'
  let headers = args.header || {}
  xhr.open('GET', '/remoteProxy', true)
  xhr.onload = function () {
    if (xhr.status / 100 | 0 == 2) {
      let b = new Blob([xhr.response], {type: xhr.getResponseHeader("Content-Type")});
      let blob = URL.createObjectURL(b)
      fileStore[blob] = b
      onSuccess('downloadFile', data, {
        tempFilePath: blob
      })
    } else {
      onError('downloadFile', data, `request error ${xhr.status}`)
    }
  }
  xhr.onerror = function (e) {
    onError('downloadFile', data, `request error ${e.message}`)
  }
  let key
  for (key in headers) {
    xhr.setRequestHeader(key, headers[key]);
  }
  xhr.setRequestHeader('X-Remote', args.url);
  xhr.send(null)
}

function onError(name, data, message) {
  let obj = {
    command: "GET_ASSDK_RES",
    ext: merge.recursive(true, {}, data),
    msg: {
      errMsg: `${name}:fail`
    }
  }
  if (message) obj.msg.message = message
  toAppService(obj)
}

function onSuccess(name, data, extra = {}) {
  let obj = {
    command: "GET_ASSDK_RES",
    ext: merge.recursive(true, {}, data),
    msg: {
      errMsg: `${name}:ok`
    }
  }
  obj.msg = merge.recursive(true, obj.msg, extra)
  toAppService(obj)
}
