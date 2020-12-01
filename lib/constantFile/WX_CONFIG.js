
const DEFAULT_WX_CONFIG = {
  'pages': [
    'pages/index/index',
    'pages/logs/logs'
  ],
  'resizable': false,
  'debug': false,
  'widgets': [],
  'customClose': false,
  'workers': '',
  'navigateToWeptAppletAppIdList': [],
  'cloud': false,
  'global': {
    'window': {
      'backgroundTextStyle': 'light',
      'navigationBarBackgroundColor': '#fff',
      'navigationBarTitleText': 'WeChat',
      'navigationBarTextStyle': 'black'
    }
  },
  'page': {
    'pages/index/index.html': {
      'window': {
        'usingComponents': {}
      }
    },
    'pages/ccc/ccc.html': {
      'window': {
        'usingComponents': {
          'test-event': '../components/test-event/test-event'
        }
      }
    },
    'pages/yyy/yyy.html': {
      'window': {
        'usingComponents': {}
      }
    },
    'pages/decode/decode.html': {
      'window': {
        'usingComponents': {}
      }
    },
    'pages/components/index.html': {
      'window': {
        'usingComponents': {
          'test-event': '/pages/components/test-event/test-event'
        }
      }
    },
    'pages/hello/hello.html': {
      'window': {
        'usingComponents': {},
        'navigationBarBackgroundColor': '#ffffff',
        'navigationBarTextStyle': 'black',
        'navigationBarTitleText': '微信接口功能演示',
        'backgroundColor': '#eeeeee',
        'backgroundTextStyle': 'light'
      }
    },
    'pages/world/world.html': {
      'window': {
        'usingComponents': {}
      }
    }
  },
  'networkTimeout': {
    'request': 60000,
    'uploadFile': 60000,
    'connectSocket': 60000,
    'downloadFile': 60000
  },
  'ext': {},
  'extAppid': '',
  'mainPlugins': {},
  '__warning__': '',
  'entryPagePath': 'pages/index/index.html',
  'tabBar': {
    'list': [
      {
        'pagePath': 'pages/index/index.html',
        'text': '首页'
      },
      {
        'pagePath': 'pages/components/index.html',
        'text': '组件'
      }
    ]
  },
  'appType': 0,
  'urlCheck': false,
  'wxAppInfo': {
    'maxRequestConcurrent': 10,
    'maxUploadConcurrent': 10,
    'maxDownloadConcurrent': 10,
    'maxWorkerConcurrent': 1
  },
  'accountInfo': {
    'appId': 'wxe07cd86c4aec6dec',
    'nickname': 'wxid_irk1h2m28mk621的接口测试号',
    'icon': 'https://mmbiz.qpic.cn/mmbiz_png/icTdbqWNOwNQ0ia79enzYJBsZ3CIkLQGe39qeOxbpT9oM9KaCthzBa0PF75xzBGjZQGlM69TDggxpNX7ACibCjjtw/0?wx_fmt=png'
  },
  'platform': 'devtools',
  'appLaunchInfo': {
    'scene': 1001,
    'path': 'pages/index/index',
    'query': {}
  },
  'env': {
    'USER_DATA_PATH': 'http://usr'
  },
  'envVersion': 'develop'
};

module.exports = DEFAULT_WX_CONFIG;
