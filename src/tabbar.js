import React, {Component} from 'react'
import ReactDom from 'react-dom'
import Emitter from 'emitter'

class Tabbar extends Component {
  constructor(props) {
    super(props)
    let tabBar = window.__wxConfig__.tabBar
    let list = this.list = tabBar && tabBar.list
    let shown = this.shown = list && list.length > 0
    if (!shown) {
      this.state = {
        shown: false
      }
    } else {
      this.state = {
        shown: true,
        hidden: false,
        activeIdx: 0,
        ...tabBar
      }
    }
  }
  show(path) {
    if (!this.shown) return
    path = path.replace(/\?(.*)$/, '')
    path = path.replace(/\.wxml$/, '')
    let activeIdx
    this.list.map((item, idx) => {
      if (item.pagePath == path) {
        activeIdx = idx
      }
    })
    if (activeIdx == this.state.activeIdx && this.state.hidden == false) return
    if (activeIdx != null) {
      this.setState({ activeIdx, hidden: false })
    } else {
      this.setState({ hidden: true })
    }
  }
  onItemTap(idx) {
    let item = this.list.find((item, index) => {
      return idx == index
    })
    if (idx == this.state.activeIdx) return
    this.emit('active', item.pagePath)
  }
  render() {
    let state = this.state
    let list = this.list
    let active = state.activeIdx
    if (!state.shown) return null
    return (
    <div className="tabbar" style={{
      backgroundColor: state.backgroundColor,
      display: state.hidden?'none':'flex',
      borderColor: state.borderStyle,
      height: 56
    }}>
      {list.map((item, idx) => {
        return (
        <div onClick={() => { this.onItemTap(idx) }} className="tabbar-item" key={idx}>
          <img className="tabbar-icon"
            src={active == idx ? item.selectedIconPath : item.iconPath}
            alt="" />
          <p className="tabbar-label"
            style={{color: active == idx ? state.selectedColor : state.color}}>
            {item.text}
          </p>
        </div>
        )
      })}
    </div>
    )
  }
}

Emitter(Tabbar.prototype)

export default ReactDom.render(<Tabbar />, document.querySelector('.tabbar-root'))
