'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var parseUrl = require('url').parse;
var http = require('http');
var https = require('https');
var assign = require('object-assign');
var fs = require('fs');
var config = require('./config');

module.exports = _regenerator2.default.mark(function _callee(context) {
  var url, headers, conf, urlObj, port, requestClient, timeout, opt, body, req, res, name;
  return _regenerator2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          url = context.request.header['x-remote'];

          if (url) {
            _context.next = 3;
            break;
          }

          throw new Error('header X-Remote required');

        case 3:
          headers = assign({}, context.header);
          _context.next = 6;
          return config();

        case 6:
          conf = _context.sent;

          delete headers['x-remote'];
          delete headers['host'];
          urlObj = parseUrl(url);
          port = urlObj.port || (urlObj.protocol == 'https:' ? 443 : 80);
          requestClient = /^https/.test(urlObj.protocol) ? https : http;
          timeout = conf.networkTimeout ? conf.networkTimeout.request : 30000;

          timeout = timeout || 30000;
          headers['host'] = urlObj.hostname;
          opt = {
            path: urlObj.path,
            protocol: urlObj.protocol,
            host: urlObj.hostname,
            hostname: urlObj.hostname,
            port: port,
            method: context.method.toUpperCase(),
            headers: headers,
            timeout: timeout
          };
          body = context.request.body;
          req = requestClient.request(opt);
          res = void 0;

          if (!body) {
            _context.next = 27;
            break;
          }

          req.write(body);
          req.end();
          _context.next = 24;
          return getResponse(req);

        case 24:
          res = _context.sent;
          _context.next = 30;
          break;

        case 27:
          _context.next = 29;
          return pipeRequest(context.req, req);

        case 29:
          res = _context.sent;

        case 30:
          _context.t0 = _regenerator2.default.keys(res.headers);

        case 31:
          if ((_context.t1 = _context.t0()).done) {
            _context.next = 38;
            break;
          }

          name = _context.t1.value;

          if (!(name === 'transfer-encoding')) {
            _context.next = 35;
            break;
          }

          return _context.abrupt('continue', 31);

        case 35:
          context.set(name, res.headers[name]);
          _context.next = 31;
          break;

        case 38:
          context.status = res.statusCode;
          context.body = res;

        case 40:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, this);
});

function pipeRequest(readable, request) {
  return function (cb) {
    readable.on('data', function (buf) {
      request.write(buf);
    });
    readable.on('end', function (buf) {
      request.end(buf);
    });
    readable.on('error', function (err) {
      console.error(err.stack);
      request.end();
      cb(err);
    });
    request.on('error', function (err) {
      cb(err);
    });
    request.on('response', function (res) {
      cb(null, res);
    });
  };
}

function getResponse(request) {
  return function (cb) {
    request.on('error', function (err) {
      cb(err);
    });
    request.on('response', function (res) {
      cb(null, res);
    });
  };
}