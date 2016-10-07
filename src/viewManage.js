import Bus from './bus'
import View from './view'

let curr = null

let views = {}

export function redirectTo(path) {
  path = normalize(path)
  if (curr) {
    curr.destroy()
    delete views[curr.id]
  }
  let v = curr = new View(path)
  views[curr.id] = v
  window.location.hash = path
  Bus.emit('route', getViewIds().length)
}

export function navigateTo(path) {
  path = normalize(path)
  Object.keys(views).forEach(key => {
    if (views[key].path == path) throw new Error('Not allowed navigateTo exists page')
  })
  if (curr) curr.hide()
  let v = curr = new View(path)
  views[curr.id] = v
  window.location.hash = path
  Bus.emit('route', getViewIds().length)
}

export function navigateBack() {
  let keys = Object.keys(views)
  if (!curr || keys.length <= 1) return redirectTo(window.__root__)
  let idx = keys.indexOf(curr.id)
  keys.splice(idx, 1)
  let max = Math.max.apply(null, keys)
  curr.destroy()
  delete views[curr.id]
  curr = views[max]
  curr.show()
  window.location.hash = curr.path
  Bus.emit('route', getViewIds().length)
}

export function currentView() {
  return curr
}

export function getViewById(id) {
  return views[id]
}

export function getViewIds() {
  let ids = Object.keys(views).map(id => Number(id))
  return ids
}

export function eachView(fn) {
  let ids = getViewIds()
  ids.forEach(id => {
    fn.call(null, views[id])
  })
}

export function notifyViews(msg) {
  let keys = Object.keys(views)
  keys.forEach(key => {
    let view =views[key]
    view.postMessage({
      msg: msg,
      command: 'CUSTOM'
    })
  })
}

function normalize(p) {
  return p.replace(/\.html/, '').replace(/^\.?\//, '')
}
