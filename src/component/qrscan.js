import query from 'query'
import domify from 'domify'
import event from 'event'
import classes from 'classes'

export default function Prompt() {
  let tmpl = `
  <div class="cd-popup is-visible" role="prompt">
    <div class="cd-popup-container">
      <p>
        <input type="text" placeholder="请输入扫码结果"/>
      </p>
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
    let btn = el.querySelector('.cd-buttons')
    event.bind(query('.yes', el), 'click', e => {
      if (removed) return
      e.preventDefault()
      let v = el.querySelector('input').value
      if (!v.trim()) return
      dismiss()
      resolve(v.trim())
    })
    event.bind(query('.no', el), 'click', e => {
      if (removed) return
      e.preventDefault()
      dismiss()
      reject(new Error('canceled'))
    })
  })
}
