import Emitter from 'emitter'
import domify from 'domify'
import events from 'events'
import Scrollable from './scrollable'

export default class Picker extends Emitter {
  constructor(opts) {
    super()
    this.opts = opts
    this.root = document.createElement('div')
    document.body.appendChild(this.root)
    this.events = events(this.root, this);
    this.events.bind('click .cancel', 'cancel');
    this.events.bind('click .confirm', 'confirm');
  }
  show() {
    this.root.appendChild(domify('<div class="wx-picker-mask"></div>'))
    const el = domify('<div class="wx-picker"></div>')
    this.root.appendChild(el)
    el.appendChild(domify(`
    <div class="wx-picker-hd">
      <a class="wx-picker-action cancel">取消</a>
      <a class="wx-picker-action confirm">确定</a>
    </div>`))
    el.appendChild(domify(`
      <div class="wx-picker-bd">
        <div class="wx-picker-group">
          <div class="wx-picker-mask2"></div>
          <div class="wx-picker-indicator"></div>
          <div class="wx-picker-content">
          </div>
        </div>
      </div>`))
    const container = this.root.querySelector('.wx-picker-content')
    this.opts.array.forEach(text => {
      container.appendChild(domify(`
        <div class="wx-picker-item">${text}</div>
      `))
    })
    this.scrollable = new Scrollable(container, this.opts)
  }
  hide() {
    this.events.unbind()
    this.scrollable.unbind()
    document.body.removeChild(this.root)
  }
  cancel(e) {
    e.preventDefault()
    this.hide()
    this.emit('cancel')
  }
  confirm(e) {
    let index = this.scrollable.current()
    e.preventDefault()
    this.hide()
    this.emit('select', index)
  }
}
