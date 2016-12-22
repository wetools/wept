import et from 'et-improve'
import domify from 'domify'
import classes from 'classes'

const tmpl = `
<div class="wx-modal">
  <div class="wx-modal-mask"></div>
  <div class="wx-modal-dialog">
    <div class="wx-modal-dialog-hd">
      <strong>{{= _.title}}</strong>
    </div>
    <div class="wx-modal-dialog-bd">
      {{if _.imgUrl}}
        <img src="{{= _.imgurl}}" class="wx-modal-dialog-img"/>
      {{/}}
      {{= _.content}}
    </div>
    <div class="wx-modal-dialog-ft">
    {{if _.showCancel}}
        <a class="wx-modal-btn-default cancel-btn" style="color: {{=_.cancelColor}};">{{= _.cancelText}}</a>
    {{/}}
    <a class="wx-modal-btn-primary confirm-btn" style="color: {{= _.confirmColor}};">{{= _.confirmText}}</a></div>
  </div>
</div>
`
const fn = et.compile(tmpl)

let el = null

export default function ({title = '', content = '', imgUrl, showCancel = true, cancelText = '取消', cancelColor = '#000000', confirmText = '确定', confirmColor = '#3CC51F'}) {
  if (el && el.parentNode) el.parentNode.removeChild(el)

  el = domify(fn({
    imgUrl,
    title,
    content,
    showCancel,
    cancelText,
    cancelColor,
    confirmText,
    confirmColor
  }))
  document.body.appendChild(el)
  let called = false
  return new Promise(resolve => {
    el.addEventListener('click', (e) => {
      if (called) return
      if (classes(e.target).has('confirm-btn')) {
        called = true
        resolve(true)
      } else if (classes(e.target).has('cancel-btn')) {
        called = true
        resolve(false)
      }
      if (called && el && el.parentNode) el.parentNode.removeChild(el)
    }, false)
  })
}
