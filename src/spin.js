import autoscale from 'autoscale-canvas'
import raf from 'raf'

function createCtx(node) {
  let canvas = document.createElement('canvas')
  node.appendChild(canvas)
  let rect = node.getBoundingClientRect()
  let ctx = canvas.getContext('2d')
  canvas.height = rect.height
  canvas.width = rect.width
  autoscale(canvas)
  return ctx
}

const hex_reg = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i
function torgb(hex) {
  if (hex.length == 4) hex = hex.replace(/[^#]/g, function (p) {
    return p + p
  })
  let result = hex_reg.exec(hex)
  return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
  } : null
}

export default function (node, opts) {
  opts = opts || []
  let ctx = createCtx(node)
  let h = node.clientHeight || 32
  let w = node.clientWidth || 32
  let duration = opts.duration || 1000
  let color = opts.color || '#ffffff'
  let rgb = torgb(color)
  let x = h/2
  let y = w/2
  let r = Math.min(h, w)/2 - 4
  let stop
  let start
  function step(timestamp) {
    ctx.clearRect(0, 0, w, h)
    if (stop) return
    if (!start) start = timestamp
    if (!node.parentNode) stop = true
    let ts = (timestamp - start)%duration
    ctx.beginPath()
    ctx.strokeStyle = 'rgba(' + rgb.r +', ' + rgb.g + ', ' + rgb.b+ ', 0.4)'
    ctx.arc(x, y, r, 0, Math.PI*2)
    ctx.lineWidth = opts.width || 4
    ctx.lineCap = 'round'
    ctx.stroke()
    let a = -Math.PI/2 + Math.PI*2*ts/duration
    let e = a + Math.PI/2
    ctx.beginPath()
    ctx.strokeStyle = 'rgba(' + rgb.r +', ' + rgb.g + ', ' + rgb.b+ ', 1)'
    ctx.arc(x, y, r, a, e)
    ctx.stroke()
    raf(step)
  }
  raf(step)
  return function () {
    stop = true
  }
}
