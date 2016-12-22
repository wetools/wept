import {eachView} from './viewManage'
import {reload} from './service'
import header from './header'
import assign from 'object-assign'
import tabbar from './tabbar'
import * as util from './util'

const jsondiffpatch = require('jsondiffpatch').create({
  cloneDiffValues: false
})

export function onReloadJson(p, isGlobal, content) {
  let config = window.__wxConfig__
  let win = config['window']
  if (!isGlobal || p == 'app.json') {
    if (p == 'app.json') {
      let curr = {
        pages: config.pages,
        window: config.window,
        tabBar: config.tabBar,
        networkTimeout: config.networkTimeout,
        debug: config.debug
      }
      let delta = jsondiffpatch.diff(curr, content)
      if (delta.pages || delta.debug || delta.networkTimeout ||
          (delta.tabBar && delta.tabBar.position)||
          delta.window.backgroundColor || delta.window.enablePullDownRefresh) {
            // have to reload
            return util.reload()
      }
      assign(win, {
        navigationBarTextStyle: content.window.navigationBarTextStyle,
        navigationBarTitleText: content.window.navigationBarTitleText,
        navigationBarBackgroundColor: content.window.navigationBarBackgroundColor
      })
      if(delta.tabBar) {
        let o = {tabBar: delta.tabBar}
        jsondiffpatch.patch(window.__wxConfig__, o)
        tabbar.reset()
      }
    } else {
      win.pages[p.replace(/\.json$/, '')] = content
    }
    header.reset()
    console.info(`Reset header for ${p.replace(/\.json$/, '')}`)
  }
}

export function onReloadJavascript(path, isGlobal) {
  // just reload, HOT fix sucks
  return window.location.reload()
}
