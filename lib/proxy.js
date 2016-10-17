'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var coRequest = require('co-request');
var parseUrl = require('url').parse;

var request = coRequest.defaults({ jar: true });
var options = {};

module.exports = _regenerator2.default.mark(function _callee(context) {
  var url, parsedBody, urlObj, port, opt, requestThunk, res, name;
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
          parsedBody = getParsedBody(context);

          delete context.header['x-remote'];

          urlObj = parseUrl(url);
          port = urlObj.port || urlObj.protocol == 'https:' ? 443 : null;
          opt = {
            url: url,
            host: urlObj.host,
            headers: context.header,
            encoding: null,
            method: context.method,
            body: parsedBody,
            port: port
          };

          opt.headers.host = urlObj.host;

          if (options.requestOptions) {
            if (typeof options.requestOptions === 'function') {
              opt = options.requestOptions(context.request, opt);
            } else {
              (0, _keys2.default)(options.requestOptions).forEach(function (option) {
                opt[option] = options.requestOptions[option];
              });
            }
          }

          requestThunk = request(opt);

          if (!parsedBody) {
            _context.next = 17;
            break;
          }

          _context.next = 14;
          return requestThunk;

        case 14:
          res = _context.sent;
          _context.next = 20;
          break;

        case 17:
          _context.next = 19;
          return pipeRequest(context.req, requestThunk);

        case 19:
          res = _context.sent;

        case 20:

          context.status = res.statusCode;
          _context.t0 = _regenerator2.default.keys(res.headers);

        case 22:
          if ((_context.t1 = _context.t0()).done) {
            _context.next = 29;
            break;
          }

          name = _context.t1.value;

          if (!(name === 'transfer-encoding')) {
            _context.next = 26;
            break;
          }

          return _context.abrupt('continue', 22);

        case 26:
          context.set(name, res.headers[name]);
          _context.next = 22;
          break;

        case 29:
          context.body = res.body;

        case 30:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, this);
});

function getParsedBody(ctx) {
  var body = ctx.request.body;
  if (body === undefined || body === null) {
    return undefined;
  }
  var contentType = ctx.request.header['content-type'];
  if (!Buffer.isBuffer(body) && typeof body !== 'string') {
    if (contentType && contentType.indexOf('json') !== -1) {
      body = (0, _stringify2.default)(body);
    } else {
      body = body + '';
    }
  }
  return body;
}

function pipeRequest(readable, requestThunk) {
  return function (cb) {
    readable.pipe(requestThunk(cb));
  };
}