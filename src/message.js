import Bus from './bus'
import Nprogress from 'nprogress'
import * as command from './command'
import {toAppService} from './service'
import {currentView} from './viewManage'

window.addEventListener('message', function (e) {
  let data = e.data
  let cmd = data.command
  let msg = data.msg
  // no need for contentscript
  if (data.to == 'contentscript') return
  if (data.command == 'EXEC_JSSDK') {
    sdk(data)
  } else if (cmd == 'TO_APP_SERVICE') {
    delete data.command
    if (msg && msg.eventName == 'DOMContentLoaded') {
      Bus.emit('ready', data.webviewID)
      Nprogress.done()
    }
    toAppService(data)
  } else if (cmd == 'COMMAND_FROM_ASJS') {
    let sdkName = data.sdkName
    if (command.hasOwnProperty(sdkName)) {
      command[sdkName](data)
    } else {
      console.warn(`Method ${sdkName} not implemented for command!`)
    }
  } else if (cmd == 'PULLDOWN_REFRESH') {
    command['PULLDOWN_REFRESH'](data)
  } else {
    console.warn(`Command ${cmd} not recognized!`)
  }
})

function sdk(data) {
  let msg = data.msg
  if (msg) {
    let n = msg.sdkName
    if (n == 'onKeyboardComplete') {
      showConsole(msg.sdkName, 'REGISTER_SDK')
    } else if (n == 'getPublicLibVersion') {
      //do nothing
    } else {
      console.warn(`Ignored EXEC_JSSDK ${JSON.stringify(data.msg)}`)
    }
  }
}

function showConsole(sdkName, type) {
  let view = currentView()
  view.postMessage({
    msg: {
      act: "JSSDKLOG",
      isErr: false,
      sdkName: sdkName,
      type: type,
      inputArgs: {},
      sdkRes: {}
    },
    command: "SHOW_CONSOLE_LOG"
  })
}
