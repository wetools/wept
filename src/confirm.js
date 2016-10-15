import query from 'query'
import domify from 'domify'
import {once} from './event'
import classes from 'classes'

export default function Confirm(message) {
  let tmpl = `
  <div class="cd-popup is-visible" role="alert">
    <div class="cd-popup-container">
      <p>${message}</p>
      <ul class="cd-buttons">
        <li class="yes"><a href="javascript:">是</a></li>
        <li class="no"><a href="javascript:">否</a></li>
      </ul>
    </div> <!-- cd-popup-container -->
  </div>
  `
  let el = domify(tmpl)
  document.body.appendChild(el)

  function dismiss() {
    classes(el).remove('is-visible')
    setTimeout(() => {
      el.parentNode.removeChild(el)
    }, 200)
  }

  return new Promise(function (resolve, reject) {
    once(query('.yes', el), 'click', e => {
      e.preventDefault()
      dismiss()
      resolve()
    })
    once(query('.no', el), 'click', e => {
      e.preventDefault()
      dismiss()
      reject(new Error('canceled'))
    })
  })
}
