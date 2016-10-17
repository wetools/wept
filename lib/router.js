'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');
var path = require('path');
var send = require('koa-send');
var mkdir = require('mkdir-p');
var crypto = require('crypto');
var loadConfig = require('./config');
var util = require('./util');
var cache = require('./cache');
var parser = require('./parser');
var router = require('koa-router')();
var hash_dir = crypto.createHash('md5').update(process.cwd()).digest("hex");
var formidable = require('koa-formidable');
var osTmp = require('os').tmpdir();
var tmpDir = path.join(osTmp, hash_dir);
mkdir.sync(tmpDir);
var root = require('os').platform == "win32" ? process.cwd().split(path.sep)[0] : "/";

function escape(x) {
  return x;
}

function noext(str) {
  return str.replace(/\.\w+$/, '');
}

function loadFile(p) {
  var throwErr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  if (/\.wxss$/.test(p)) throwErr = false;
  return new _promise2.default(function (resolve, reject) {
    fs.stat('./' + p, function (err, stats) {
      if (err) {
        if (throwErr) return reject(new Error('file ' + p + ' not found'));
        return resolve('');
      }
      if (stats && stats.isFile()) {
        var content = cache.get(p);
        if (content) {
          return resolve(content);
        } else {
          return parser('' + p).then(resolve, reject);
        }
      } else {
        return resolve('');
      }
    });
  });
}

router.get('/', _regenerator2.default.mark(function _callee() {
  var _ref, _ref2, config, rootFn, pageConfig;

  return _regenerator2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return [loadConfig(), util.loadTemplate('index')];

        case 2:
          _ref = _context.sent;
          _ref2 = (0, _slicedToArray3.default)(_ref, 2);
          config = _ref2[0];
          rootFn = _ref2[1];
          _context.next = 8;
          return util.loadJSONfiles(config.pages);

        case 8:
          pageConfig = _context.sent;

          config['window'].pages = pageConfig;
          this.body = rootFn({
            config: (0, _stringify2.default)(config),
            root: config.root
          }, {}, escape);
          this.type = 'html';
          //yield next

        case 12:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, this);
}));

router.get('/appservice', _regenerator2.default.mark(function _callee2() {
  var _ref3, _ref4, config, files, serviceFn, _util$groupFiles, _util$groupFiles2, utils, routes;

  return _regenerator2.default.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return [loadConfig(), util.globJSfiles(), util.loadTemplate('service')];

        case 2:
          _ref3 = _context2.sent;
          _ref4 = (0, _slicedToArray3.default)(_ref3, 3);
          config = _ref4[0];
          files = _ref4[1];
          serviceFn = _ref4[2];
          _util$groupFiles = util.groupFiles(files, config);
          _util$groupFiles2 = (0, _slicedToArray3.default)(_util$groupFiles, 2);
          utils = _util$groupFiles2[0];
          routes = _util$groupFiles2[1];

          this.body = serviceFn({
            utils: utils,
            routes: routes,
            config: (0, _stringify2.default)(config)
          }, { noext: noext }, escape);
          this.type = 'html';

        case 13:
        case 'end':
          return _context2.stop();
      }
    }
  }, _callee2, this);
}));

router.get('/generateFunc', _regenerator2.default.mark(function _callee3() {
  return _regenerator2.default.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return loadFile(this.query.path + '.wxml');

        case 2:
          this.body = _context3.sent;

          this.type = 'text';

        case 4:
        case 'end':
          return _context3.stop();
      }
    }
  }, _callee3, this);
}));

router.get('/generateJavascript', _regenerator2.default.mark(function _callee4() {
  return _regenerator2.default.wrap(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return loadFile(this.query.path);

        case 2:
          this.body = _context4.sent;

          this.type = 'text';

        case 4:
        case 'end':
          return _context4.stop();
      }
    }
  }, _callee4, this);
}));

router.get(tmpDir + '/(.*)', _regenerator2.default.mark(function _callee5() {
  return _regenerator2.default.wrap(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return send(this, this.request.path, { root: root });

        case 2:
        case 'end':
          return _context5.stop();
      }
    }
  }, _callee5, this);
}));

router.get('/app/(.*)', _regenerator2.default.mark(function _callee6() {
  var p, file, content, _ref5, _ref6, config, exists, _ref7, _ref8, _content, viewFn, _exists;

  return _regenerator2.default.wrap(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          p = this.request.path;
          file = p.replace(/^\/app\//, '');

          if (!/\.(wxss|js)$/.test(file)) {
            _context6.next = 10;
            break;
          }

          _context6.next = 5;
          return loadFile(file);

        case 5:
          content = _context6.sent;

          this.body = content;
          this.type = /\.js$/.test(file) ? 'javascript' : 'css';
          _context6.next = 40;
          break;

        case 10:
          if (!/\.wxml/.test(file)) {
            _context6.next = 32;
            break;
          }

          _context6.next = 13;
          return [loadConfig(), util.exists(file)];

        case 13:
          _ref5 = _context6.sent;
          _ref6 = (0, _slicedToArray3.default)(_ref5, 2);
          config = _ref6[0];
          exists = _ref6[1];

          if (exists) {
            _context6.next = 20;
            break;
          }

          this.status = 404;
          throw new Error('File: ' + file + ' not found');

        case 20:
          if (!(config.pages.indexOf(file.replace(/\.wxml/, '')) == -1)) {
            _context6.next = 22;
            break;
          }

          throw new Error('File: ' + file + ' not found in pages of app.json');

        case 22:
          _context6.next = 24;
          return [loadFile(file), util.loadTemplate('view')];

        case 24:
          _ref7 = _context6.sent;
          _ref8 = (0, _slicedToArray3.default)(_ref7, 2);
          _content = _ref8[0];
          viewFn = _ref8[1];

          this.body = viewFn({
            inject_js: _content,
            path: file.replace(/\.wxml/, '')
          }, {}, escape);
          this.type = 'html';
          _context6.next = 40;
          break;

        case 32:
          // support resource files with relative p
          _exists = util.exists(file);

          if (!_exists) {
            _context6.next = 38;
            break;
          }

          _context6.next = 36;
          return send(this, file);

        case 36:
          _context6.next = 40;
          break;

        case 38:
          this.status = 404;
          throw new Error('File: ' + file + ' not found');

        case 40:
        case 'end':
          return _context6.stop();
      }
    }
  }, _callee6, this);
}));

router.post('/upload', _regenerator2.default.mark(function _callee7() {
  var form, file, file_path;
  return _regenerator2.default.wrap(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return formidable.parse({
            uploadDir: tmpDir,
            keepExtensions: true
          }, this);

        case 2:
          form = _context7.sent;
          file = form.files.file;
          file_path = path.normalize(file.path);

          this.body = { file_path: file_path };
          this.content = 'json';

        case 7:
        case 'end':
          return _context7.stop();
      }
    }
  }, _callee7, this);
}));

module.exports = router;