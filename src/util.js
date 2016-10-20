import qs from 'querystring'

let id = 0
export function uid () {
  return id++
}

export function createFrame(id, src, hidden, parent = document.body) {
  let el = document.createElement('iframe')
  el.setAttribute('src', src)
  el.setAttribute('id', id)
  el.setAttribute('seamless', "seamless")
  el.setAttribute('sandbox', "allow-scripts allow-same-origin allow-forms allow-modals")
  el.setAttribute('frameborder', "0")
  el.setAttribute('width', hidden ? "0": "100%")
  el.setAttribute('height', hidden ? "0": `${document.body.clientHeight - 42}`)
  if (hidden) {
    el.setAttribute('style', 'width:0;height:0;border:0; display:none;')
  }
  parent.appendChild(el)
  return el
}

export function parsePath(path) {
  let parts = path.split(/\?/)
  return {
    path: parts[0],
    query: qs.parse(parts[1])
  }
}

export function isTabbar(url) {
  let list = window.__wxConfig__.tabBar && window.__wxConfig__.tabBar.list
  if (!list) return
  let pages = list.map(o => o.pagePath)
  return pages.indexOf(url) !== -1
}

export function reload() {
  let home = `${location.protocol}//${location.host}`
  if (typeof location.replace !== 'function') return window.location.reload()
  location.replace(home)
}

export function redirectTo(url) {
  let home = `${location.protocol}//${location.host}`
  if (typeof history.replaceState == 'function') {
    history.replaceState({}, '', `${home}?!${url}`)
  }
}
