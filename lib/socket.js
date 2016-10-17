'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WebSocket = require('faye-websocket');
var sockets = [];

// socket connected to main page
module.exports = function (server) {
  server.on('upgrade', function (request, socket, body) {
    if (WebSocket.isWebSocket(request)) {
      (function () {
        var wsSocket = new WebSocket(request, socket, body);
        sockets.push(wsSocket);

        wsSocket.on('close', function (event) {
          //console.log('websocket close', event.code, event.reason);
          var idx = sockets.indexOf(wsSocket);
          sockets.splice(idx, 1);
          wsSocket = null;
        });
      })();
    }
  });

  return {
    send: function send(data) {
      sockets.forEach(function (socket) {
        socket.send((0, _stringify2.default)(data));
      });
    },
    onMessage: function onMessage(fn) {
      sockets.forEach(function (socket) {
        socket.on('message', fn);
      });
    }
  };
};