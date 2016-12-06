const fs = require('fs')
const merge = require('merge')
const Parallel = require('node-parallel')

let default_config = {
  "directory": process.cwd(),
  "debug": false,
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
    }
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
  "apphash": 70475629,
  "userInfo": {
    "headUrl": "https://s-media-cache-ak0.pinimg.com/136x136/7f/f7/b9/7ff7b921190bc4c05a1f3c11ff2ce086.jpg",
    "city": "Chaoyang",
    "gender": 1,
    "nickName": "测试帐号",
    "province" : "Beijing"
  }
}

module.exports = function () {
  return new Promise(function (resolve, reject) {
    let p = new Parallel()
    p.add(done => {
      fs.readFile('./app.json', 'utf8', (err, data) => {
        if (err) return done(err)
        try {
          let config = JSON.parse(data)
          if (!config.pages || !config.pages.length) return done(new Error('No pages found'))
          config.root = config.root || config.pages[0]
          done(null, config)
        } catch(e) {
          return done(e)
        }
      })
    })
    p.add(done => {
      fs.readFile('./wept.json', 'utf8', (err, data) => {
        if (err) return done(null, {})
        try {
          let config = JSON.parse(data)
          done(null, config)
        } catch(e) {
          return done(e)
        }
      })
    })
    p.done((err,results) => {
      if (err) return reject(err)
      let appConfig = results[0]
      let weptConfig = results[1]
      let config = merge.recursive(true, default_config, appConfig)
      config.babel = true
      config = merge.recursive(true, config, weptConfig)
      config.appid = config.appid || 'touristappid'
      config.projectConfig.appid = config.appid
      config.isTourist = config.appid == 'touristappid'
      resolve(config)
    })
  })
}
