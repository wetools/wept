import qs from 'querystring'

let id = 0
export function uid () {
  return id++
}

export function loadCss(href) {
  let doc = document
  let ss = doc.createElement( "link" )
  ss.rel = "stylesheet"
  ss.href = href
  ss.media = "all"
  document.head.appendChild(ss)
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

export function reloadCss(href) {
  let links = document.getElementsByTagName("link");
  for (let i = 0, l = links.length; i < l; i++) {
    let link = links[i];

    if (link.getAttribute("href").indexOf(href) !== 0) {
      link.href = link.href.replace(/(\?id=\d+)?$/, "?id=" + Date.now())
    }
  }
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
  if (typeof location.replace !== 'function') throw new Error('location.replace not supported')
  location.replace(home)
}
