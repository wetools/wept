import {currentView} from '../viewManage'

export default function (data) {
  let msg = data.msg
  if (msg) {
    let n = msg.sdkName
    if (n == 'onKeyboardComplete') {
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
