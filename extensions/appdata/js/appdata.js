/*global define, chrome, JSONEditor*/
"use strict";

!function () {
  let editor, timeout
  let root = document.getElementById("jsoneditor")
  let option = {
    onChange: function() {
      clearTimeout(timeout), timeout = setTimeout(function() {
        bgConnection.postMessage({
          data: editor.get(),
          command: "WRITE_APP_DATA"
        })
      }, 1e3 / 60)
    }
  }

  let bgConnection = chrome.runtime.connect({
    name: "appdata/" + chrome.devtools.inspectedWindow.tabId,
  })

  bgConnection.onMessage.addListener(function(e) {
    let t = e.command;
    if ("SHAKE_HANDS" === t) {
      bgConnection.postMessage({
        data: {},
        command: "GET_APP_DATA"
      }) 
    } else if ("SEND_APP_DATA" === t) {
      if (editor) {
        editor.set(e.msg.appData)
      } else {
        editor = new JSONEditor(root, option, e.msg.appData)
      }
    }
  })
}()
