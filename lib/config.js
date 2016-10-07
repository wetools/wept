let fs = require('fs')
let merge = require('merge')

if (!fs.existsSync('./app.json')) throw new Error('app.json not found')

let default_config = {
  "debug": true,
  "appname": "debug",
  "window":{
    "backgroundTextStyle":"light",
    "navigationBarBackgroundColor": "#fff",
    "navigationBarTitleText": "WeChat",
    "navigationBarTextStyle":"black"
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
  "userInfo": {}
}

module.exports = function () {
  return new Promise(function (resolve, reject) {
    fs.readFile('./app.json', 'utf8', (err, data) => {
      if (err) return reject(err)
      let config = JSON.parse(data)
      if (!config.pages || !config.pages.length) return reject(new Error('no pages found'))
      config.root = config.root || config.pages[0]
      config = merge.recursive(true, default_config, config)
      resolve(config)
    })
  })
}
