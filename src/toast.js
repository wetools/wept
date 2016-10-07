import domify from 'domify'
import Tween from 'tween'
import raf from 'raf'
import classes from 'classes'
import {has3d, transform} from 'prop-detect'
import event from 'event'
import tap from 'tap-event'

let parentEl
let tween

function dismiss(el) {
  if (classes(el).has('fadeout')) return
  if (el != parentEl.children[0]) {
    classes(el).add('fadeout')
    setTimeout(() => {
      if (el.parentNode) parentEl.removeChild(el)
    }, 200)
    return
  }
  if (tween) {
    tween.on('end', () => {
      dismiss(el)
    })
    return
  }
  classes(el).add('fadeout')
  tween = Tween({y: 0})
    .ease('in-expo')
    .to({y: -40})
    .duration(200)

  tween.update(o => {
    setTransform(o.y)
  })

  tween.on('end', () => {
    animate = () => {} //eslint-disable-line
    tween = null
    if (el.parentNode) parentEl.removeChild(el)
    setTransform(0)
  })

  function animate() {
    raf(animate)
    if (tween) tween.update()
  }
  animate()
}

function setTransform(y) {
  if (typeof transform === 'string') {
    if (has3d) {
      parentEl.style[transform] = `translate3d(0, ${y}px, 0) `
    } else {
      parentEl.style[transform] = `translateY(${y}px)`
    }
  } else {
    parentEl.style.top = `${y}px`
  }
}

function Toast(msg, {duration, type, sticky} = {}) {
  if (!parentEl) {
    parentEl = domify('<div id="toast-container"></div>')
    document.body.appendChild(parentEl)
  }
  const el = domify(`<div>${msg}</div>`)
  el.className = `toast ${type}` || ''
  parentEl.appendChild(el)
  let ontap = tap(() => {
    event.unbind(el, 'touchstart', ontap)
    dismiss(el)
  })
  event.bind(el, 'touchstart', ontap) 
  if (type == 'error' && !sticky && !duration) duration = 5000
  if (duration) {
    setTimeout(() => {
      if (el.parentNode) dismiss(el)
    }, duration)
  } else if (type !== 'error' && !sticky) {
    setTimeout(() => {
      if (el.parentNode) dismiss(el)
    }, 3000)
  }
  return () => {
    dismiss(el)
  }
}

export default Toast
