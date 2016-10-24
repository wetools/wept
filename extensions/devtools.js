/*global chrome*/
"use strict"

var panelCreated = false

function createPanelIfWeappLoaded() {
  if (panelCreated) return
  checkWeapp(function (isWeapp) {
    if (!isWeapp || panelCreated) return
    panelCreated = true
    clearInterval(loadCheckInterval)

    // 添加appdata pannel
    chrome.devtools.panels.create("AppData",
      "",
      "appdata/index.html",
      function(panel) {
        //console.log(panel)
      }
    )

    chrome.devtools.panels.create("Storage",
      "",
      "storage/index.html",
      function(panel) {
        //console.log(panel)
      }
    )
  })
}


function checkWeapp(cb) {
  chrome.devtools.inspectedWindow.eval(`window.__wxConfig__`, (res, isErr) => {
    if (res && res.appid && res.directory) {
      return cb(true)
    }
    cb(false)
  })
}

chrome.devtools.network.onNavigated.addListener(function() {
  setTimeout(function () {
    createPanelIfWeappLoaded()
  }, 1000)
})

var loadCheckInterval = setInterval(function() {
  createPanelIfWeappLoaded()
}, 1000)

createPanelIfWeappLoaded()
