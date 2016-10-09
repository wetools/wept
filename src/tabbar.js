import domify from 'domify'
import tap from 'tap-event'
import event from 'event'
import closest from 'closest'
import Emitter from 'emitter'
import tabFn from './tabbar.et'

class Tabbar extends Emitter {
  constructor() {
    super()
    let list = window.__wxConfig__.tabBar && window.__wxConfig__.tabBar.list
    let shown = this.shown = list && list.length > 0
    this.list = list ? list.map(o => {
      return {
        path: o.pagePath,
        icon: o.iconPath,
        selectedIcon: o.selectedIconPath,
        text: o.text
      }
    }) : []
    if (shown) {
      let o = window.__wxConfig__.tabBar
      this.style = `background-color: ${o.backgroundColor}; border-color: ${o.borderStyle}; color: rgb(221, 221, 221); visibility: visible;`
      this.color = o.color
      this.selectedColor = o.selectedColor
    }
    this.root = document.querySelector('.tabbar-root')
    if (!shown) this.root.style.display = 'none'
    if (shown) {
      event.bind(this.root, 'touchstart', tap(this.ontap.bind(this)))
    }
    this.scrollable = document.querySelector('.scrollable')
  }
  show(path) {
    if (!this.shown) return
    this.root.style.display = 'block';
    let paths = this.list.map(o => o.path)
    if (paths.indexOf(path) == -1) throw new Error(`${path} not defined in tabbar list`)
    let data = {
      style: this.style,
      items: this.list.map(item => {
        let active = item.path == path 
        return {
          path: item.path,
          icon: active ? item.selectedIcon : item.icon, 
          color: active ? this.selectedColor : this.color,
          text: item.text
        }
      })
    }
    if (this.root.firstElementChild) this.root.removeChild(this.root.firstElementChild)
    let el = domify(tabFn(data))
    this.root.appendChild(el)
    this.scrollable.style.bottom = '56px'
  }
  hide() {
    this.root.style.display = 'none';
    this.scrollable.style.bottom = '0'
  }
  ontap(e) {
    e.preventDefault()
    let itemEl = closest(e.target, '.tabbar-item', this.root)
    if (itemEl) {
      let path =  itemEl.dataset.path
      this.emit('active', path)
    }
  }
}

export default new Tabbar
