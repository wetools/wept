const fs = require('fs')
const path = require('path')
const merge = require('merge')

let _directory
let default_config = {
  "debug": false,
  "appname": "debug",
  "window": {
    "backgroundTextStyle": "light",
    "navigationBarBackgroundColor": "#fff",
    "navigationBarTitleText": "WeChat",
    "navigationBarTextStyle": "black"
  },
  "projectConfig": {
    "Network": {
      "RequestDomain": [],
      "WsRequestDomain": [],
      "UploadDomain": [],
      "DownloadDomain": []
    },
    "Setting": {
      "MaxLocalstorageSize": 10,
      "MaxCodeSize": 5,
      "MaxWebviewDepth": 5,
      "MaxBackgroundLifespan": 300,
      "MaxRequestConcurrent": 5,
      "MaxUploadConcurrent": 1,
      "MaxDownloadConcurrent": 5
    },
    "appid": "touristappid"
  },
  "appserviceConfig": {
    "AppserviceMaxDataSize": 1048576,
    "HTTPSetting": {
      "HTTPHeaderMode": "BlackList",
      "HeaderBlackList": [
        "User-Agent"
      ],
      "HeaderWhiteList": [],
      "UploadMaxTimeoutMS": 60000,
      "DownloadMaxTimeoutMS": 60000,
      "WebsocketMaxTimeoutMS": 60000,
      "RequestMaxTimeoutMS": 60000,
      "HTTPHeaderReferer": "servicewechat.com"
    },
    "CDNBaseURL": "https://res.wx.qq.com/weapp",
    "AppMaxRunningCount": 5
  },
  "appid": "touristappid",
  "apphash": 70475629,
  "isTourist": true,
  "userInfo": {
    "headUrl": "https://s-media-cache-ak0.pinimg.com/136x136/7f/f7/b9/7ff7b921190bc4c05a1f3c11ff2ce086.jpg",
    "city": "Chaoyang",
    "gender": 1,
    "nickName": "测试帐号",
    "province": "Beijing"
  }
}

module.exports.init = function (directory) {
  if (!directory) {
    throw new Error('请设置app根目录')
  }
  const appFile = path.join(directory, 'app.json')
  if (!fs.existsSync(appFile)) {
    throw new Error('无法找到 app.json 文件，请检查')
  } else {
    _directory = directory
  }
}

module.exports.cwd = function() {
  return _directory
}

module.exports.appConfig = function () {
  return new Promise(function (resolve, reject) {
    const appFile = path.join(_directory, 'app.json')
    fs.readFile(appFile, 'utf8', (err, data) => {
      if (err) return reject(err)
      let config = JSON.parse(data)
      if (!config.pages || !config.pages.length) return reject(new Error('no pages found'))
      config.root = config.root || config.pages[0]
      config.directory = _directory
      config = merge.recursive(true, default_config, config)
      resolve(config)
    })
  })
}
