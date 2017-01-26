import Bus from './bus'
import Nprogress from 'nprogress'
import * as command from './command'
import {toAppService} from './service'
import {currentView} from './viewManage'
import {warn} from './util'

window.addEventListener('message', function (e) {
  let data = e.data || {}
  let cmd = data.command
  let msg = data.msg
  // location picker of map
  if (data.module == 'locationPicker') {
    currentView().setLocation(data)
    return
  }
  // no need for contentscript
  if (data.to == null || data.to == 'contentscript' || /^devtools/.test(data.to)) return
  if (data.command == 'EXEC_JSSDK') {
    sdk(data)
  } else if (cmd == 'TO_APP_SERVICE') {
    delete data.command
    if (msg && msg.eventName == 'publish_DOMContentLoaded') {
      Bus.emit('ready', data.webviewID)
      Nprogress.done()
    }
    toAppService(data)
  } else if (cmd == 'COMMAND_FROM_ASJS') {
    let sdkName = data.sdkName
    if (command.hasOwnProperty(sdkName)) {
      command[sdkName](data)
    } else {
      warn(`Method ${sdkName} not implemented for command!`)
    }
  } else if (cmd == 'PULLDOWN_REFRESH') {
    command['PULLDOWN_REFRESH'](data)
  } else if (cmd == 'WEBVIEW_READY') {
    // TODO figure out WTF is this
  } else {
    warn(`Command ${cmd} not recognized!`)
  }
})

function sdk(data) {
  let msg = data.msg
  if (msg) {
    let n = msg.sdkName
    if (n == 'showPickerView') {
      command.showPickerView(data, msg.args)
    } else if (n == 'showDatePickerView') {
      command.showDatePickerView(data, msg.args)
    } else if (n == 'onKeyboardComplete') {
      showConsole(msg.sdkName, 'REGISTER_SDK')
    } else if (n == 'getPublicLibVersion'
            || n == 'onKeyboardConfirm'
            || n == 'disableScrollBounce'
            || n == 'onTextAreaHeightChange'
            || n == 'onKeyboardShow') {
      //do nothing
    } else {
      warn(`Ignored EXEC_JSSDK ${JSON.stringify(data.msg)}`)
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
