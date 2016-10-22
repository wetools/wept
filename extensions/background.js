/*global chrome*/
'use strict'

let webviewPorts = {}
let panelPorts = {}

chrome.runtime.onConnect.addListener(function(port) {
  let tid
  if (port.name == 'webview') {
    tid =  port.sender.tab.id
    webviewPorts[tid] = port
  } else {
    try {
      tid = parseInt(port.name.match(/\/(\d+$)/)[1])
    } catch(e) {
      console.warn('Port tab id not found on ' + port.name)
      return
    }
    panelPorts[port.name] = port
  }

  // assign the listener function to a variable so we can remove it later
  let listener = function(message, sender, sendResponse) {
    if (port.name == 'webview') {
      let to = message.to
      let portObj
      // not send to devtools
      if (!to || !/^devtools-/.test(to)) return
      let panel_name = to.replace(/^devtools-/, '') + '/' + tid
      let port = panelPorts[panel_name]
      // could be closed
      if (port) port.postMessage(message)
    } else {
      let cmd = message.command
      if (cmd == null || message.data == null)
        throw new Error('Command or data not found on message')
      let viewPort = webviewPorts[tid]
      let name = port.name.replace(/\/(\d+$)/, '')
      if (viewPort) {
        viewPort.postMessage({
          to: 'backgroundjs',
          comefrom: 'devtools-' + name,
          command: 'COMMAND_FROM_ASJS',
          data: message.data,
          sdkName: cmd
        })
      }
    }
  }

  port.postMessage({
    to: 'contentscript',
    command: "SHAKE_HANDS"
  })

  // add the listener
  port.onMessage.addListener(listener)

  port.onDisconnect.addListener(function() {
    if (port.sender.tab.id !== -1) {
      delete webviewPorts[tid]
    } else {
      delete panelPorts[tid]
    }
    port.onMessage.removeListener(listener)
  })
})
