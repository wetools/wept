import React, {Component} from 'react'
import ReactDom from 'react-dom'
import Emitter from 'emitter'
import {currentView} from './viewManage'

class Tabbar extends Component {
  constructor(props) {
    super(props)
    let tabBar = window.__wxConfig__.tabBar || {}
    this.state = {
      activeIdx: 0,
      ...tabBar
    }
    this.scrollable = document.querySelector('.scrollable')
  }
  reset() {
    let tabBar = window.__wxConfig__.tabBar
    let list = tabBar && tabBar.list
    let p = currentView().path

    this.setState({
      ...tabBar,
      activeIdx: (list || []).findIndex(item => item.pagePath === p)
    })
  }
  show(path) {
    let list = this.state.list
    let p = path.replace(/\?(.*)$/, '').replace(/\.wxml$/, '')
    this.setState({
      activeIdx: (list || []).findIndex(item => item.pagePath === p)
    })
  }
  onItemTap(idx) {
    if (idx == this.state.activeIdx) return
    let item = this.state.list.find((item, index) => {
      return idx == index
    })
    this.emit('active', item.pagePath)
  }
  componentDidUpdate() {
    let state = this.state
    if (state.activeIdx == -1 || state.activeIdx == null || state.position == 'top') {
      this.scrollable.style.bottom = '0px'
    } else {
      this.scrollable.style.bottom = '56px'
    }
    if (state.position == 'top' && state.activeIdx != -1) {
      this.scrollable.style.top = '47px'
    } else {
      this.scrollable.style.top = '42px'
    }
  }
  render() {
    let state = this.state
    let list = state.list
    let active = state.activeIdx
    let shown = list && list.length > 0
    if (!shown) return null
    let hidden = active == -1 || active == null
    let top = state.position == 'top'
    return (
    <div className="tabbar" style={{
      backgroundColor: state.backgroundColor,
      display: hidden ? 'none' : 'flex',
      borderColor: state.borderStyle,
      height: top ? 47 : 56
    }}>
      {list.map((item, idx) => {
        return (
        <div onClick={() => { this.onItemTap(idx) }} className="tabbar-item" key={idx}>
          {do {
            if (!top)
              <img className="tabbar-icon"
                src={active == idx ? item.selectedIconPath : item.iconPath}
                alt="" />
          }}
          <p className="tabbar-label"
            style={{color: active == idx ? state.selectedColor : state.color}}>
            {item.text}
            {do {
              if (top && active == idx)
                <i className="tabbar-label-indicator"
                  style={{borderColor: state.selectedColor}}></i>
            }}
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
