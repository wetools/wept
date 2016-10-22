/*global chrome*/
"use strict"


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

