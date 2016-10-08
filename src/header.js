import classes from 'classes'
import domify from 'domify'
import event from 'event'
import headerFn from './header.et'
import tap from 'tap-event'
import Emitter from 'emitter'
import closest from 'closest'

class Header extends Emitter {
  constructor() {
    super()
    let p = document.querySelector('.head')
    let win = window.__wxConfig__['window']
    let config = this.config = {
      backgroundColor: win.navigationBarBackgroundColor,
      color: win.navigationBarTextStyle,
      title: win.navigationBarTitleText,
      back: false
    }
    this.defaultTitle = win.navigationBarTitleText || window.__wxConfig__.appname
    let el = this.el = domify(headerFn(config))
    if (config.color == 'white') {
      classes(el.querySelector('.head-option-icon')).add('white')
    }
    p.appendChild(el)
    event.bind(el, 'touchstart', tap(this.ontap.bind(this)))
  }
  backStatus(show = false) {
    let backEl = this.el.querySelector('.head-back')
    if (show) {
      backEl.style.visibility = 'visible'
    } else {
      backEl.style.visibility = 'hidden'
    }
  }
  resetTitle() {
    this.setTitle(this.defaultTitle)
    this.hideLoading()
  }
  setTitle(title) {
    let titleEl = this.el.querySelector('.head-title > span')
    titleEl.textContent = title
  }
  ontap(e) {
    let el = closest(e.target, '.head-back', this.el)
    if (el) {
      e.preventDefault()
      this.emit('back')
    }
    el = closest(e.target, '.head-option', this.el)
    if (el) {
      e.preventDefault()
      window.history.replaceState({path: '/'}, '', '/')
      window.location.reload()
    }
  }
  showLoading() {
    let el = this.el.querySelector('.head-title-loading')
    el.style.display = 'inline-block'
  }
  hideLoading() {
    let el = this.el.querySelector('.head-title-loading')
    el.style.display = 'none'
  }
}

export default new Header()
