import Emitter from 'emitter'
import domify from 'domify'
import events from 'events'
import Scrollable from './scrollable'
import tmplFn from './picker.et'

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
    const items = this.opts.array.map(text => {
      return {text, value: text}
    })
    const el = domify(tmplFn({group: [items]}))
    this.root.appendChild(el)
    const container = this.root.querySelector('.wx-picker-content')
    this.scrollable = new Scrollable(container, this.opts.current)
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
