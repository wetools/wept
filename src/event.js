
export function once(el, name, listener) {
  let fn = function (e) {
    el.removeEventListener(name, fn, false)
    listener.call(el, e)
  }
  el.addEventListener(name, fn, false)
}
