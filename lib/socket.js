let WebSocket = require('faye-websocket')
let sockets = []

// socket connected to main page
module.exports = function (server) {
  server.on('upgrade', function (request, socket, body) {
    if (WebSocket.isWebSocket(request)) {
      let wsSocket = new WebSocket(request, socket, body);
      sockets.push(wsSocket)
      
      wsSocket.on('close', function(event) {
        //console.log('websocket close', event.code, event.reason);
        let idx = sockets.indexOf(wsSocket)
        sockets.splice(idx, 1)
        wsSocket = null;
      })
    }
  })

  return {
    send: function (data) {
      sockets.forEach(function (socket) {
        socket.send(JSON.stringify(data))
      })
    },
    onMessage: function (fn) {
      sockets.forEach(function (socket) {
        socket.on('message', fn)
      })
    }
  }
}
