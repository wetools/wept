'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [notifyError, staticFallback].map(_regenerator2.default.mark);

require("babel-polyfill");
var koa = require('koa');
var http = require('http');
var path = require('path');
var growl = require('growl');
var watcher = require('./watcher');
var socketBuilder = require('./socket');
var router = require('./router');
var util = require('./util');
var send = require('koa-send');
var logger = require('koa-logger');
var compress = require('koa-compress');
var app = koa();
var proxy = require('./proxy');

var socket = void 0;

app.use(logger());
app.use(compress({
  threshold: 2048,
  flush: require('zlib').Z_SYNC_FLUSH
}));
app.use(notifyError);
app.use(staticFallback);
app.use(_regenerator2.default.mark(function _callee(next) {
  var path;
  return _regenerator2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          path = this.request.path;

          if (!/^\/remoteProxy$/.test(path)) {
            _context.next = 6;
            break;
          }

          _context.next = 4;
          return proxy(this);

        case 4:
          _context.next = 8;
          break;

        case 6:
          _context.next = 8;
          return next;

        case 8:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, this);
}));
app.use(router.routes());
app.use(router.allowedMethods());
app.use(require('koa-static')(path.resolve(__dirname, '../public')));

var server = http.createServer(app.callback());
socket = socketBuilder(server);
watcher(socket);

//notify error to client side if possible
function notifyError(next) {
  var img;
  return _regenerator2.default.wrap(function notifyError$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (socket) {
            _context2.next = 4;
            break;
          }

          _context2.next = 3;
          return next;

        case 3:
          return _context2.abrupt('return', _context2.sent);

        case 4:
          _context2.prev = 4;
          _context2.next = 7;
          return next;

        case 7:
          _context2.next = 15;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2['catch'](4);

          console.error(_context2.t0.stack);
          img = path.resolve(__dirname, '../public/images/error.png');

          growl(_context2.t0.message, { image: img });
          socket.send({
            type: 'error',
            msg: _context2.t0.message
          });

        case 15:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked[0], this, [[4, 9]]);
}

// try to find file in current directory
function staticFallback(next) {
  var p, exists;
  return _regenerator2.default.wrap(function staticFallback$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return next;

        case 2:
          if (!(this.status == 404)) {
            _context3.next = 9;
            break;
          }

          //let p = path.resolve(process.cwd(), this.request.path)
          p = this.request.path.replace(/^\//, '');

          if (!p) {
            _context3.next = 9;
            break;
          }

          exists = util.exists(p);

          if (!exists) {
            _context3.next = 9;
            break;
          }

          _context3.next = 9;
          return send(this, p);

        case 9:
        case 'end':
          return _context3.stop();
      }
    }
  }, _marked[1], this);
}

if (!module.parent) {
  server.listen(3000);
  console.log('listening on port 3000');
} else {
  module.exports = server;
}