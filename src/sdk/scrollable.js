import Emitter from 'emitter'
import Tween from 'tween'
import raf from 'raf'
import events from 'events'
import {touchAction, transform} from 'prop-detect'

export default class Scrollable extends Emitter {
  constructor(root, curr) {
    super()
    if (root.firstElementChild) {
      this.el = root
      this.touchAction('none')
      this.itemHeight = root.firstElementChild.clientHeight
      this.events = events(root.parentNode.querySelector('.wx-picker-mask2'), this)
      this.events.bind('touchstart')
      this.events.bind('touchmove')
      this.events.bind('touchend')
      this.docEvents = events(document, this)
      this.docEvents.bind('touchend')
      this.maxY = this.itemHeight*3
      this.minY = (4 - root.children.length)*this.itemHeight
      const n = 3 - (curr || 0)
      this.translate(n*this.itemHeight)
    }
  }
  current() {
    return 3 - Math.floor(this.y/this.itemHeight)
  }
  currentValue() {
    const n = this.current()
    const el =this.el.children[n]
    return el.getAttribute('data-value')
  }
  unbind() {
    if (!this.el) return
    this.events.unbind()
    this.docEvents.unbind()
  }
  ontouchstart(e) {
    if (this.tween) this.tween.stop()
    e.preventDefault()
    let touch = this.getTouch(e)
    this.down = {
      sy: this.y,
      x: touch.clientX,
      y: touch.clientY,
      at: Date.now()
    }
  }
  ontouchmove(e) {
    if (!this.down || this.tween) return
    e.preventDefault()
    let touch = this.getTouch(e)
    let y = touch.clientY
    let down = this.down
    let dy =  y - down.y
    let dest = down.sy + dy
    this.translate(dest)
  }
  ontouchend(e) {
    if (!this.down) return
    this.down = null
    e.preventDefault()
    let n = Math.round(this.y/this.itemHeight)
    this.select(n)
  }
  select(index) {
    let y = index*this.itemHeight
    this.scrollTo(y, 200, 'inQuad')
  }
    /**
   * Scroll to potions y with optional duration and ease function
   *
   * @param {Number} y
   * @param {Number} duration
   * @param {String} easing
   * @api public
   */
  scrollTo(y, duration, easing) {
    if (this.tween) this.tween.stop()
    let transition = (duration > 0 && y !== this.y)
    if (!transition) {
      this.direction = 0
      this.translate(y)
      return
    }

    this.direction = y > this.y ? -1 : 1

    easing = easing || 'out-circ'
    let tween = this.tween = Tween({
        y: this.y
      })
      .ease(easing)
      .to({
        y
      })
      .duration(duration)

    let self = this
    tween.update(o => {
      self.translate(o.y)
    })
    let promise = new Promise(resolve => {
      tween.on('end', () => {
        this.emit('end')
        resolve()
        self.tween = null
        self.animating = false
        animate = () => {} // eslint-disable-line
      })
    })

    function animate() {
      raf(animate)
      tween.update()
    }

    animate()
    this.animating = true
    return promise
  }
  getTouch(e) {
    // "mouse" and "Pointer" events just use the event object itself
    let touch = e
    if (e.changedTouches && e.changedTouches.length > 0) {
      // W3C "touch" events use the `changedTouches` array
      touch = e.changedTouches[0]
    }
    return touch
  }

  /**
   * Translate to `y`.
   *
   *
   * @api private
   */

  translate(y) {
    let s = this.el.style
    if (isNaN(y)) return
    y = Math.min(y, this.maxY)
    y = Math.max(y, this.minY)
    this.y = y
    s[transform] = `translate3d(0, ${y}px, 0)`
  }
    /**
   * Sets the "touchAction" CSS style property to `value`.
   *
   * @api private
   */

  touchAction(value) {
    let s = this.el.style
    if (touchAction) {
      s[touchAction] = value
    }
  }
}
