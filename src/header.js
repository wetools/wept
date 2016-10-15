import Bus from './bus'
import React, {Component} from 'react'
import ReactDom from 'react-dom'
import cx from 'classnames'
import {currentView} from './viewManage'
import actionSheet from 'actionsheet'
import storage from './sdk/storage'
import toast from './toast'

class Header extends Component {
  constructor(props) {
    super(props)
    let win = window.__wxConfig__['window']
    this.state = {
      backgroundColor: win.navigationBarBackgroundColor,
      color: win.navigationBarTextStyle,
      title: win.navigationBarTitleText,
      loading: false,
      back: false
    }
    Bus.on('route', this.reset.bind(this))
  }
  reset() {
    let win = window.__wxConfig__['window']
    let d = {
      backgroundColor: win.navigationBarBackgroundColor,
      color: win.navigationBarTextStyle,
      title: win.navigationBarTitleText,
      loading: false,
      back: false
    }
    let curr = currentView()
    let winConfig = win.pages[curr.path] || {}
    let state = {
      backgroundColor: winConfig.navigationBarBackgroundColor || d.backgroundColor,
      color: winConfig.navigationBarTextStyle || d.color,
      title: winConfig.navigationBarTitleText || d.title,
      loading: false,
      back: curr.pid != null
    }
    this.setState(state)
  }
  onBack(e) {
    e.preventDefault()
    Bus.emit('back')
  }
  onOptions(e) {
    e.preventDefault()
    actionSheet({
      refresh: {
        text: '刷新',
        callback: function () {
          window.history.replaceState({path: '/'}, '', '/')
          window.location.reload()
        }
      },
      clear: {
        text: '清除数据缓存',
        callback: function () {
          if (window.localStorage != null) {
            storage.clear()
            toast('数据缓存已清除', {type: 'success'})
          }
        }
      },
      feedback: {
        text: '问题反馈',
        callback: function () {
          window.location.href = 'https://github.com/chemzqm/wept/issues'
        }
      },
      cancel: {
        text: '取消'
      }
    }).then(() => {
      this.sheetShown = true
    })
  }
  setTitle(title) {
    this.setState({title})
  }
  showLoading() {
    this.setState({
      loading: true
    })
  }
  hideLoading() {
    this.setState({
      loading: false
    })
  }
  render() {
    let state = this.state
    let iconStyle = {
      borderLeft: `1px solid ${state.color}`,
      borderBottom: `1px solid ${state.color}`
    }
    let clz = cx('head-option-icon', {
      'white': state.color == 'white'
    })
    return (
      <div style={{backgroundColor: state.backgroundColor}}>
        <div onClick={this.onBack} className="head-back" style={{visibility: state.back ? 'visible' : 'hidden' }}>
          <i className="head-back-icon" style={iconStyle}></i>
          <span style={{color: state.color}}>返回</span>
        </div>
        <h3 className="head-title" style={{color: state.color}}>
          <i className="head-title-loading" style={{display: state.loading? 'inline-block' : 'none'}}></i>
          <span>{state.title}</span>
        </h3>
        <div className="head-option" onClick={this.onOptions.bind(this)}>
          <i className={clz}></i>
        </div>
      </div>
    )
  }
}

let header = React.createElement(Header, null)
export default ReactDom.render(header, document.querySelector('.head'))
