/*global chrome*/
"use strict"
const ua = navigator.userAgent
  //const webviewID = parseInt(ua.match(/webview\/(\d*)/)[1])
  //const chromeRuntimeID =ua.match(/chromeRuntimeID\/(.*)\s?/)[1]
  //const isAppserviceDevtools = ua.indexOf('asviewdevtools') !== -1

function addAppserviceDevtools() {
  //chrome.devtools.panels.create("Storage",
  //  "",
  //  "storage/index.html",
  //  function(panel) {
  //    //console.log(panel)
  //  }
  //)
  //chrome.devtools.panels.create("Wxml",
  //  "",
  //  "wxml/index.html",
  //  function(panel) {
  //    window.panel = panel
  //    var panelWindow
  //    panel.onShown.addListener(function(win){
  //      panelWindow = win
  //      win.onShown()
  //    })
  //    panel.onHidden.addListener(function(win){
  //      panelWindow.onHidden()
  //    })
  //    panel.onSearch.addListener(function(win){
  //      panelWindow.onSearch()
  //    })
  //  }
  //)


  // 添加appdata pannel
  chrome.devtools.panels.create("AppData",
    "",
    "appdata/index.html",
    function(panel) {
      //console.log(panel)
    }
  )

}

addAppserviceDevtools()
