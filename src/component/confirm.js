import query from 'query'
import domify from 'domify'
import event from 'event'
import classes from 'classes'

export default function Confirm(message, nobtns = false) {
  let tmpl = `
  <div class="cd-popup is-visible" role="alert">
    <div class="cd-popup-container">
      <p>${message}</p>
      <ul class="cd-buttons">
        <li class="yes"><a href="javascript:">确认</a></li>
        <li class="no"><a href="javascript:">取消</a></li>
      </ul>
    </div> <!-- cd-popup-container -->
  </div>
  `
  let el = domify(tmpl)
  document.body.appendChild(el)
  let removed = false
  function dismiss() {
    removed = true
    classes(el).remove('is-visible')
    setTimeout(() => {
      el.parentNode.removeChild(el)
    }, 200)
  }

  return new Promise(function (resolve, reject) {
    if (nobtns) {
      let btn = el.querySelector('.cd-buttons')
      btn.style.display = 'none'
      event.bind(el, 'click', () => {
        dismiss()
        resolve()
      })
    }
    event.bind(query('.yes', el), 'click', e => {
      if (removed) return
      e.preventDefault()
      dismiss()
      resolve()
    })
    event.bind(query('.no', el), 'click', e => {
      if (removed) return
      e.preventDefault()
      dismiss()
      reject(new Error('canceled'))
    })
  })
}
