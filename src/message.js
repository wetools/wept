import Nprogress from 'nprogress'
import * as command from './command'
import {toAppService} from './service'
import sdk from './sdk'

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
  } else {
    console.warn(`Command ${cmd} not recognized!`)
  }
})
