import {eachView} from './viewManage'
import {reload} from './service'

let pages = window.__wxConfig__.pages


export function onReload (path) {
  let ext = path.match(/\.(\w+)$/)[1]
  let p = path.replace(/\.(\w+)$/, '')
  let isGlobal = pages.indexOf(p) == -1
  if (ext == 'wxml' || ext == 'wxss') {
    eachView(view => {
      if (isGlobal) {
        view.reload(path)
      } else if (view.path == p) {
        view.reload(path)
      }
    })
  }
  if (ext == 'js') {
    if (isGlobal) return window.location.reload()
    reload(path)
  }
}
