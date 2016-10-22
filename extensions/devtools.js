/*global chrome*/
"use strict"

chrome.devtools.inspectedWindow.eval(`window.__wxConfig__`, (res, isErr) => {
  if (isErr) return
  if (res.appid && res.directory) {
    init()
  }
})

function init() {
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
}
