import {transition} from 'prop-detect'
import assign from 'object-assign'
import spin from './spin'

const body = document.body

module.exports = {
  show: function () {
    let overlay = this.overlay = document.createElement('div')
    let middle = document.createElement('div')
    assign(middle.style, {
      height: '48px',
      width: '48px'
    })
    overlay.appendChild(middle)
    assign(overlay.style, {
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      zIndex: 9999999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0)',
      [transition]: 'background-color 200ms linear'
    })
    body.appendChild(overlay)
    this.stop = spin(middle, {})
    setTimeout(() => {
      overlay.style.backgroundColor = 'rgba(0,0,0,0.3)'
    }, 20)
  },
  hide: function () {
    this.overlay.style.backgroundColor = 'rgba(0,0,0,0.0)'
    setTimeout(() => {
      this.stop()
      body.removeChild(this.overlay)
    })
  }
}
