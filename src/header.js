import merge from 'merge'
import Bus from './bus'
import React, {Component} from 'react'
import ReactDom from 'react-dom'
import cx from 'classnames'

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
    let d = this.defaultState = merge.recursive(true, {}, this.state)
    Bus.on('route', (n, curr) => {
      let winConfig = window.__wxConfig__['window'].pages[curr.path] || {}
      let state = {
        backgroundColor: winConfig.navigationBarBackgroundColor || d.backgroundColor,
        color: winConfig.navigationBarTextStyle || d.color,
        title: winConfig.navigationBarTitleText || d.title,
        loading: false,
        back: curr.pid != null
      }
      console.log(state)
      this.setState(state)
    })
  }
  reset() {
    this.setState(this.defaultState)
  }
  onBack(e) {
    e.preventDefault()
    Bus.emit('back')
  }
  onRefresh(e) {
    e.preventDefault()
    window.history.replaceState({path: '/'}, '', '/')
    window.location.reload()
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
        <div className="head-option" onClick={this.onRefresh}>
          <i className={clz}></i>
        </div>
      </div>
    )
  }
}

let header = React.createElement(Header, null)
export default ReactDom.render(header, document.querySelector('.head'))
