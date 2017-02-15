import Bus from './bus'
import cx from 'classnames'
import React, {Component} from 'react'
import ReactDom from 'react-dom'
import actionSheet from 'actionsheet'
import {currentView} from './viewManage'
import qrcode from './component/qrcode'
import storage from './sdk/storage'
import toast from './component/toast'
import * as util from './util'

let isWechat = /MicroMessenger/i.test(navigator.userAgent)

class Header extends Component {
  constructor(props) {
    super(props)
    let win = window.__wxConfig__['window']
    this.state = {
      backgroundColor: win.navigationBarBackgroundColor,
      color: win.navigationBarTextStyle,
      title: win.navigationBarTitleText,
      loading: false,
      backText: '返回',
      back: false,
      sendText: false
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
    let tabBar = window.__wxConfig__.tabBar

    let top = tabBar && tabBar.position == 'top'
    let hide = top && util.isTabbar(curr.url)
    if (curr.isMap) {
      this.setState({
        hide: false,
        backgroundColor: 'rgb(0, 0, 0)',
        color: '#ffffff',
        title: '位置',
        loading: false,
        backText: '取消',
        sendText: true
      })
    } else {
      this.setState({
        hide,
        backgroundColor: winConfig.navigationBarBackgroundColor || d.backgroundColor,
        color: winConfig.navigationBarTextStyle || d.color,
        title: winConfig.navigationBarTitleText || d.title,
        loading: false,
        backText: '返回',
        sendText: false,
        back: curr.pid != null
      })
    }
  }
  onBack(e) {
    e.preventDefault()
    Bus.emit('back')
  }
  onSend(e) {
    // TODO send location
    e.stopPropagation()
    Bus.emit('location', currentView().location)
    this.onBack(e)
  }
  onOptions(e) {
    e.preventDefault()
    actionSheet({
      share: {
        text: '分享',
        callback: function () {
          Bus.emit('share')
        }
      },
      refresh: {
        text: '回主页',
        callback: function () {
          window.sessionStorage.removeItem('routes')
          util.navigateHome()
        }
      },
      qrcode: {
        text: '手机访问',
        callback: function () {
          qrcode.show()
        },
        hide: isWechat
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
  onHome() {
    util.navigateHome()
  }
  refresh() {
    Bus.emit('refresh')
  }
  render() {
    let state = this.state
    let iconStyle = {
      borderLeft: `1px solid ${state.color}`,
      borderBottom: `1px solid ${state.color}`
    }
    let homeClz = cx('head-home-icon', {
      'white': state.color == 'white'
    })

    return (
      <div style={{backgroundColor: state.backgroundColor, display: state.hide ? 'none' : 'flex'}}>
        <div onClick={this.onBack} className="head-back" style={{display: state.back ? 'flex' : 'none' }}>
          {do {
            if (!state.sendText) <i className="head-back-icon" style={iconStyle}></i>
          }}
          <span style={{color: state.color}}>{state.backText}</span>
        </div>
        <div onClick={this.onHome} className="head-home" style={{display: state.back ? 'none' : 'flex' }}>
          <i className={homeClz}></i>
        </div>
        <h3 className="head-title" style={{color: state.color}}>
          <i className="head-title-loading" style={{display: state.loading? 'inline-block' : 'none'}}></i>
          <span>{state.title}</span>
        </h3>
        <div className="head-option">
          {do {
            if (state.sendText) {
              <div onClick={this.onSend.bind(this)}>发送</div>
            } else {
              <div className="flex">
                <i className={cx('head-option-refresh', { 'white': state.color == 'white' })} 
                  onClick={this.refresh.bind(this)}></i>
                <i className={cx('head-option-more', { 'white': state.color == 'white' })} onClick={this.onOptions.bind(this)}></i>
              </div>
            }
          }}
        </div>
      </div>
    )
  }
}

let header = React.createElement(Header, null)
export default ReactDom.render(header, document.querySelector('.head'))
