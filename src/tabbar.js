import React, {Component} from 'react'
import ReactDom from 'react-dom'
import Emitter from 'emitter'
import {currentView} from './viewManage'

class Tabbar extends Component {
  constructor(props) {
    super(props)
    let tabBar = window.__wxConfig__.tabBar
    let list = tabBar && tabBar.list
    let shown = this.shown = list && list.length > 0
    if (!shown) {
      this.state = {
        shown: false
      }
    } else {
      this.state = {
        list: list,
        shown: true,
        hidden: true,
        activeIdx: 0,
        ...tabBar
      }
    }
    this.scrollable = document.querySelector('.scrollable')
  }
  reset() {
    let tabBar = window.__wxConfig__.tabBar
    let list = this.list = tabBar && tabBar.list
    let shown = this.shown = list && list.length > 0
    if (!shown) {
      this.setState({
        shown: false
      })
    } else {
      this.show(currentView().path)
    }
  }
  show(path) {
    if (!this.shown || !path) return
    path = path.replace(/\?(.*)$/, '')
    path = path.replace(/\.wxml$/, '')
    let activeIdx
    let tabBar = window.__wxConfig__.tabBar
    tabBar.list.map((item, idx) => {
      if (item.pagePath == path) {
        activeIdx = idx
      }
    })
    if (activeIdx != null) {
      this.scrollable.style.bottom = '56px'
      this.setState({ activeIdx, hidden: false, list: tabBar.list })
    } else {
      this.scrollable.style.bottom = '0px'
      this.setState({ hidden: true, list: tabBar.list})
    }
  }
  onItemTap(idx) {
    let item = this.state.list.find((item, index) => {
      return idx == index
    })
    if (idx == this.state.activeIdx) return
    this.emit('active', item.pagePath)
  }
  render() {
    let state = this.state
    let list = state.list
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
