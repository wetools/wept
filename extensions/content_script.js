/*global define, chrome, JSONEditor*/
"use strict";

function postMessageToBg(e) {
  return portInit ? void port.postMessage(e) : void portMsgQuery.push(e)
}

function postMessageToWebPage(e) {
  return postMessageInit ? window.postMessage(e, "*"): postMessageQuery.push(e)
}


var portInit = false
var portMsgQuery = []
var postMessageInit = false
var postMessageQuery = []


var port = chrome.runtime.connect("", {
  name: "webview"
})

// message from devtools
port.onMessage.addListener(function(e) {
  var o = e.to;
  if (e.to == 'contentscript' && e.command == 'SHAKE_HANDS') {
    // background connected
    portInit = true
    portMsgQuery.forEach(function (e) {
      postMessageToBg(e)
    })
    portMsgQuery = []
  } else if (e.to == 'backgroundjs') {
    postMessageToWebPage(e)
  }
})

// message from webpage
window.addEventListener('message', function (e) {
  var o = e.data;
  if (typeof o !== 'object' || o === null || !o.to) return
  if (o.to == 'contentscript' && o.command == 'SHAKE_HANDS') {
    // app connected
    postMessageInit = true
    postMessageQuery.forEach(function (e) {
      postMessageToWebPage(e)
    })
    postMessageQuery = []
  } else if (/^devtools/.test(o.to)) {
    postMessageToBg(o)
  }
})
