const WX_PROJECT_CONFIG = {
  'description': 'Project configuration file',
  'packOptions': {
    'ignore': []
  },
  'setting': {
    'urlCheck': false,
    'es6': true,
    'enhance': false,
    'postcss': true,
    'minified': true,
    'newFeature': true,
    'coverView': true,
    'nodeModules': false,
    'autoAudits': true,
    'checkInvalidKey': true,
    'checkSiteMap': true,
    'uploadWithSourceMap': true,
    'babelSetting': {
      'ignore': [],
      'disablePlugins': [],
      'outputPath': ''
    }
  },
  'compileType': 'miniprogram',
  'libVersion': '2.7.5',
  'appid': 'wxd114989bd630c09b',
  'projectname': 'demo-app',
  'debugOptions': {
    'hidedInDevtools': []
  },
  'isGameTourist': false,
  'simulatorType': 'wechat',
  'simulatorPluginLibVersion': {},
  'condition': {
    'search': {
      'current': -1,
      'list': []
    },
    'conversation': {
      'current': -1,
      'list': []
    },
    'plugin': {
      'current': -1,
      'list': []
    },
    'game': {
      'currentL': -1,
      'list': []
    },
    'miniprogram': {
      'current': 2,
      'list': [
        {
          'id': -1,
          'name': 'UpdateManager',
          'pathName': 'pages/api/setTop/setTop',
          'query': '',
          'scene': 1022
        },
        {
          'id': -1,
          'name': 'pages/api/share/share',
          'pathName': 'pages/api/share/share',
          'query': '',
          'scene': 1044,
          'shareInfo': {
            'groupName': '测试模拟群1',
            'shareName': 'oAwh61N63i7Ha4JCwgshSwV0w8uh7abezY2FP2WZPE4@cr4dev',
            'shareKey': 'b0-8KDRyM8CYbodX8d1421C1M-Tu8Jxat5T5FNqeU7kQlAwQYqpdzwhIuoxv9IKcTTDdcYWwHKJZng1uiTHE5A~~'
          }
        },
        {
          'id': -1,
          'name': 'pages/api/request/request',
          'pathName': 'pages/api/request/request',
          'scene': 1036,
          'referrerInfo': {}
        }
      ]
    }
  }

};

module.exports = WX_PROJECT_CONFIG;
