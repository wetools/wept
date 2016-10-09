import Nprogress from 'nprogress'
import * as command from './command'
import {toAppService} from './service'

window.addEventListener('message', function (e) {
  let data = e.data
  let sdkName = data.sdkName
  let cmd = data.command
  // no need for contentscript
  if (data.to == 'contentscript') return
  if (data.command == 'EXEC_JSSDK') {
    if (data.msg && data.msg.sdkName == 'onKeyboardComplete') return
    return console.log(`Ignored EXEC_JSSDK ${JSON.stringify(data.msg)}`)
  }
  if (cmd == 'TO_APP_SERVICE') {
    data.msg && data.msg.eventName == 'DOMContentLoaded' && Nprogress.done()
    toAppService(data)
    return
  }
  console.log(cmd)
  if (sdkName) {
    if (command.hasOwnProperty(sdkName)) {
      command[sdkName](data)
    } else {
      console.warn(`Method ${sdkName} not implemented!`)
    }
    return
  }
  console.warn(JSON.stringify(data))
})
