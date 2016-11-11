import et from 'et-improve'
import domify from 'domify'

const tmpl = `
<div>
  <div class="wx-toast-mask"></div>
  <div class="wx-toast">
    {{if _.icon}}
      <i class="wx-toast-icon wx-icon-{{= _.icon}}" style="font-size: 55px; color: rgb(255, 255, 255);display: block;">
    {{/}}
    </i><p class="wx-toast-content">{{= _.title}}</p>
  </div>
</div>
`
const fn = et.compile(tmpl)

export default {
  show: function ({duration = 1500, icon, title}) {
    this.hide()
    duration = Math.min(duration, 10000)
    let el = domify(fn({
      title,
      icon
    }))
    this.el = el
    document.body.appendChild(el)
    this.timeout = setTimeout(() => {
      if (el.parentNode) document.body.removeChild(el)
      this.el = null
    }, duration)
  },
  hide: function () {
    window.clearTimeout(this.timeout)
    if (this.el) {
      this.el.parentNode.removeChild(this.el)
      this.el = null
    }
  }
}
