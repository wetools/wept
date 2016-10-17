'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');
var merge = require('merge');

if (!fs.existsSync('./app.json')) throw new Error('app.json not found');

var default_config = {
  "directory": process.cwd(),
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
      "HeaderBlackList": ["User-Agent"],
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
};

module.exports = function () {
  return new _promise2.default(function (resolve, reject) {
    fs.readFile('./app.json', 'utf8', function (err, data) {
      if (err) return reject(err);
      var config = JSON.parse(data);
      if (!config.pages || !config.pages.length) return reject(new Error('no pages found'));
      config.root = config.root || config.pages[0];
      config = merge.recursive(true, default_config, config);
      resolve(config);
    });
  });
};