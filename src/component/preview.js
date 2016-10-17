import radio from 'radio-component'
import query  from 'query'
import event from 'event'
import raf from 'raf'
import Tween from 'tween'
import Emitter from 'emitter'
import tap from 'tap-event'
import PinchZoom from 'pinch-zoom'
import assign from 'object-assign'
import domify from 'domify'
import closest from 'closest'
import events from 'events'
import spin from './spin'
import {has3d, transform, transition, transitionend} from 'prop-detect'

const doc = document
const body = doc.body

class ImagesPreview extends Emitter {
  /**
   * Constructor
   *
   * @public
   * @param {Array|DomCollection} imgs
   * @param {Object} opts
   */
  constructor(imgs, opts = {}) {
    super()
    this.opts = opts
    // maximun duration in ms for fast swipe
    this.threshold = opts.threshold || 200
    // minimum moved distance for fast swipe
    this.fastThreshold = opts.fastThreshold || 30
    this.imgs = imgs
    this._containerTap = tap(this.hide.bind(this))
    this.status = []
    this.loaded = []
    this.tx = 0
    if (opts.bind !== false) event.bind(doc, 'touchstart', this._ontap)
  }
  /**
   * Show container
   *
   * @public
   */
  show() {
    let div = this.container = doc.createElement('div')
    div.id = 'images-preview'
    let vw = viewportWidth()
    div.style.width = (vw*this.imgs.length + 40) + 'px'
    this.setTransform(-20)
    body.appendChild(div)
    let dots = this.dots = domify(`<div class="imgs-preview-dots"><ul></ul></div>`)
    body.appendChild(dots)
    let ul = query('ul', dots)
    let fragment = doc.createDocumentFragment()
    for (let i = 0, l = this.imgs.length; i < l; i++) {
      ul.appendChild(doc.createElement('li'))
      let el = doc.createElement('div')
      el.style.width = `${vw}px`
      let wrapper = doc.createElement('div')
      let src = this.imgs[i]
      wrapper.className = 'wrapper'
      let img = this.createImage(wrapper, src)
      img.style.display = 'block'
      this.positionWrapper(wrapper, img)
      el.appendChild(wrapper)
      fragment.appendChild(el)
    }
    div.appendChild(fragment)
    this.zooms = []
    this.emit('hide')

    this.events = events(div, this)
    this.docEvents = events(document, this);
    this.events.bind('touchstart')
    this.events.bind('touchmove')
    this.events.bind('touchend')
    this.docEvents.bind('touchend', 'ontouchend')
    event.bind(div, 'touchstart', this._containerTap)
    event.bind(doc, 'touchmove', preventDefault)
  }

  ontouchstart(e) {
    if (this.animating) this.tween.stop()
    let wrapper = closest(e.target, '.wrapper')
    if (e.touches.length > 1 || wrapper) return
    let t = e.touches[0]
    let sx = t.clientX
    this.down = {x: sx, at: Date.now()}
    let tx = this.tx
    let vw = viewportWidth()
    this.move = (e, touch) => {
      let x = tx + touch.clientX - sx
      x = this.limit(x, vw)
      if (isNaN(x)) return
      this.setTransform(x)
    }
  }

  ontouchmove(e) {
    if (e.touches.length > 1 || this.move == null) return
    e.preventDefault()
    e.stopPropagation()
    let touch = e.touches[0]
    this.move(e, touch)
  }

  ontouchend(e) {
    if (this.move == null) return
    if (this.animating) this.tween.stop()
    let down = this.down
    this.move = this.down = null
    let touch = e.changedTouches[0]
    let x = touch.clientX
    let t = Date.now()
    if ( Math.abs(x - down.x) > this.fastThreshold &&
        (t - down.at) < this.threshold ) {
      let dir = down.x > x ? 'left' : 'right'
      this.onswipe(dir)
    } else {
      this.restore()
    }
  }

  /**
   * Active a specfic image
   *
   * @public
   * @param {String} src
   * @param {Number} idx
   */
  active(src, idx) {
    idx = idx == null ? this.imgs.indexOf(src) : idx
    if (idx == -1) return
    let vw = viewportWidth()
    let state = this.status[idx]
    this.idx = idx
    let wrapper =  this.container.querySelectorAll('.wrapper')[idx]
    radio(this.dots.querySelectorAll('li')[idx])
    this.emit('active', idx)
    let tx = idx*vw
    this.setTransform(- tx - 20)
    // not loaded
    if (!state) {
      this.status[idx] = 'loading'
      let image = this.createImage(wrapper, src)
      image.style.display = 'block'

      let pz = this.pz = new PinchZoom(wrapper, {
        threshold: this.threshold,
        fastThreshold: this.fastThreshold,
        padding: 5,
        tapreset: false,
        draggable: true,
        maxScale: 4
      })
      pz.on('swipe', this.onswipe.bind(this))
      pz.on('move', dx => {
        let x = - 20 - tx - dx
        x = this.limit(x, vw)
        this.setTransform(x)
      })
      //pz.on('tap', this.hide.bind(this))
      pz.on('end', this.restore.bind(this))
      this.zooms.push(pz)
      this.loadImage(image, wrapper).then(() => {
        this.loaded.push(idx)
      }, () => {
      })
    }
  }
  onswipe(dir) {
    let vw = viewportWidth()
    let i = dir == 'left' ? this.idx + 1 : this.idx - 1
    i = Math.max(0, i)
    i = Math.min(this.imgs.length - 1 , i)
    this.animate(- i*vw - 20).then(() => {
      if (i == this.idx) return
      let src = this.imgs[i]
      this.active(src, i)
    })
  }
  limit(x, vw) {
    x = Math.min(0, x)
    x = Math.max(-40 - (this.imgs.length - 1)*vw, x)
    return x
  }
  /**
   * Restore container transform to sane position
   *
   * @private
   */
  restore() {
    let vw = viewportWidth()
    let idx = Math.round((- this.tx - 20)/vw)
    this.animate(- idx*vw - 20).then(() => {
      if (idx == this.idx) return
      let src = this.imgs[idx]
      this.active(src, idx)
    })
  }
  /**
   * Load image inside wrapper
   *
   * @private
   * @param {Element} image
   * @param {Element} wrapper
   */
  loadImage(image, wrapper) {
    if (image.complete) {
      this.positionWrapper(wrapper, image)
      return this.positionHolder(wrapper, image.src, false).then(() => {
        image.style.display = 'block'
      })
    } else {
      return this.positionHolder(wrapper).then(() => {
        image.style.display = 'block'
        let spinEl = domify(`<div class="spin"></div>`)
        if (wrapper.clientHeight > this.container.clientHeight) {
          spinEl.style.top = `${this.container.clientHeight/2}px`
        }
        wrapper.appendChild(spinEl)
        let stop = spin(spinEl, {
          color: '#ffffff',
          duration: 1000,
          width: 4
        })
        let self = this
        return new Promise((resolve, reject) => {
          function onload() {
            stop()
            if (spinEl.parentNode) wrapper.removeChild(spinEl)
            self.positionWrapper(wrapper, image)
            resolve()
          }
          if (image.complete) return onload()
          image.onload = onload
          image.onerror = e => {
            stop()
            reject(e)
          }
        })
      })
    }
  }
  positionWrapper(wrapper, image) {
    let vw = Math.max(doc.documentElement.clientWidth, window.innerWidth || 0)
    let dims = imgDimension(image)
    let h = (vw - 10)*dims.height/dims.width
    let top = Math.min(this.container.clientHeight - 10, h)/2

    assign(wrapper.style, {
      left: '5px',
      width: `${vw - 10}px`,
      height: `${h}px`,
      marginTop: `-${top}px`
    })
  }
  createImage(wrapper, src) {
    let img = query('.image', wrapper)
    if (img) return img
    img = doc.createElement('img')
    img.className = 'image'
    img.src = src
    wrapper.appendChild(img)
    return img
  }
  /**
   * Set translateX of container
   *
   * @private
   * @param {Number} x
   */
  setTransform(x) {
    let el = this.container
    this.tx = x
    if (has3d) {
      el.style[transform] = `translate3d(${x}px,0,0)`
    } else {
      el.style[transform] = `translate(${x}px)`
    }
  }
  /**
   * Animate container for active image
   *
   * @private
   * @param {Number} x
   * @param {Number} duration = 200
   * @param {String} ease = 'out-circ'
   * @returns {Promise}
   */
  animate(x, duration = 200, ease = 'out-circ') {
    if (x == this.tx) return Promise.resolve(null)
    this.animating = true
    let tween = this.tween = Tween({x: this.tx})
      .ease(ease)
      .to({x: x})
      .duration(duration)

    tween.update(function(o) {
      self.setTransform(o.x)
    })
    let self = this
    let promise = new Promise(function (resolve) {
      tween.on('end', function(){
        animate = function(){} // eslint-disable-line
        self.animating = false
        resolve()
      })
    })

    function animate() {
      raf(animate)
      tween.update()
    }

    animate()
    return promise
  }
  /**
   * Animate holder to match wrapper
   *
   * @private
   * @param {Element} wrapper
   * @param {String} src optional new src
   * @returns {undefined}
   */
  positionHolder(wrapper, src, opacity = true) {
    let el = this.holder
    if (!el) return Promise.resolve(null)
    if (src) el.style.backgroundImage = `url('${src}')`
    let tween = Tween({
      width: parseInt(el.style.width, 10),
      height: parseInt(el.style.height, 10),
      left: parseInt(el.style.left, 10),
      top: parseInt(el.style.top, 10),
      opacity: 0.3
    })
    .ease('out-cube')
    .to({
      width: parseInt(wrapper.style.width, 10),
      height: parseInt(wrapper.style.height, 10),
      left: parseInt(wrapper.style.left, 10),
      top: this.container.clientHeight/2 + parseInt(wrapper.style.marginTop, 10),
      opacity: 1
    })
    .duration(300)

    tween.update(function(o) {
      let n = opacity ? o.opacity : 1
      assign(el.style, {
        width: `${o.width}px`,
        height: `${o.height}px`,
        left: `${o.left}px`,
        top: `${o.top}px`,
        opacity: n
      })
    })

    let self = this
    let promise = new Promise(function (resolve) {
      tween.on('end', function(){
        if (el.parentNode) el.parentNode.removeChild(el)
        self.holder = null
        animate = function(){} // eslint-disable-line
        resolve()
      })
    })

    function animate() {
      raf(animate)
      tween.update()
    }

    animate()
    return promise
  }
  /**
   * hide container and unbind events
   *
   * @public
   */
  hide() {
    if (this.dots) body.removeChild(this.dots)
    this.zooms.forEach(pz => {
      pz.unbind()
    })
    this.zooms = []
    this.status = []
    this.container.style.backgroundColor = 'rgba(0,0,0,0)'
    this.emit('hide')
    body.removeChild(this.container)
    this.unbind()
  }
  /**
   * unbind tap event
   *
   * @public
   */
  unbind() {
    this.docEvents.unbind()
    this.events.unbind()
    if (this.pz) this.pz.unbind()
    event.unbind(this.container, 'touchstart', this._containerTap)
    event.unbind(doc, 'touchmove', preventDefault)
  }
}

function imgDimension(image) {
  if (image.naturalWidth) {
    return {
      height: image.naturalHeight,
      width: image.naturalWidth
    }
  } else {
    let i = new Image()
    i.src = image.src
    return {
      height: i.height,
      width: i.width
    }
  }
}

function viewportWidth() {
  return Math.max(doc.documentElement.clientWidth, window.innerWidth || 0)
}

function preventDefault(e) {
  e.preventDefault()
}
export default ImagesPreview
