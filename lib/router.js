'use strict'
const et = require('et-improve')
const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const send = require('koa-send')
const loadConfig = require('./config')
const cache = require('./cache')
const parser = require('./parser')
const util = require('./util')

function escape(x) { return x}

function loadTemplate(name) {
  return new Promise(function (resolve, reject) {
    fs.readFile(path.resolve(__dirname, `../template/${name}.html`), 'utf8', (err, content) => {
      if (err) return reject(err)
      try {
        resolve(et.compile(content))
      } catch(e) {
        console.error(e.stack)
        reject(e)
      }
    })
  })
}

module.exports = function () {
  return function* (next) {
    let path = this.request.path
    if ('/' == path) {
      let [config, rootFn] = yield [loadConfig(), loadTemplate('index')]
      this.body = rootFn({
        config: JSON.stringify(config),
        root: config.root
      }, {}, escape)
      this.type = 'html'
    } else if (path == '/appservice') {
      //config 
      let [config, files, serviceFn] = yield [loadConfig(), util.globJSfiles(), loadTemplate('service')]
      let [utils, routes] = groupFiles(files, config)
      this.body = serviceFn({
        utils,
        routes,
        config: JSON.stringify(config)
      }, {noext}, escape)
      this.type = 'html'
    } else if (path == '/generateFunc'){
      this.body = yield loadFile(this.query.path + '.wxml')
      this.type = 'text'
    } else if (path == '/generateJavascript'){
      this.body = yield loadFile(this.query.path)
      this.type = 'text'
    } else if (/^\/app\//.test(path)) {
      let file = path.replace(/^\/app\//, '')
      if (/\.(wxss|js)$/.test(file)) {
        let content = yield loadFile(file)
        this.body = content
        this.type = /\.js$/.test(file) ? 'javascript' : 'css'
      } else if (/\.wxml/.test(file)) {
        // load config && check if wxml exists
        let [config, exists] = yield [loadConfig(), util.exists(file)]
        if (!exists) {
          this.status = 404
          throw new Error(`File: ${file} not found`)
        }
        if (config.pages.indexOf(file.replace(/\.wxml/, '')) == -1) {
          throw new Error(`File: ${file} not found in pages of app.json`)
        }
        let [content, viewFn] = yield [loadFile(file), loadTemplate('view')]
        this.body = viewFn({
          inject_js: content,
          path: file.replace(/\.wxml/, '')
        }, {}, escape)
        this.type = 'html'
      } else {
        // support resource files
        let exists = util.exists(file)
        if (exists) {
          yield send(this, file)
        } else {
          this.status = 404
          throw new Error(`File: ${file} not found`)
        }
      }
    } else {
      yield next
    }
  }
}

function noext(str) {
  return str.replace(/\.\w+$/, '')
}

function groupFiles(files, config) {
  let pages = config.pages.map(page => {
    return page + '.js'
  })
  let utils = []
  let routes = []
  files.forEach(function (file) {
    if (pages.indexOf(file) == -1 && file !== 'app.js') {
      utils.push(file)
    }
  })
  pages.forEach(function (page) {
    if (files.indexOf(page) == -1) {
      console.log(chalk.red(` ✗ ${page} not found`))
    } else {
      routes.push(page)
    }
  })
  return [utils, routes]
}

function loadFile(p, throwErr = true) {
  if (/\.wxss$/.test(p)) throwErr = false
  return new Promise((resolve, reject) => {
    fs.stat(`./${p}`, (err, stats) => {
      if (err) {
        if (throwErr) return reject(new Error(`file ${p} not found`))
        return resolve('')
      }
      if (stats && stats.isFile()) {
        let css = cache.get(p)
        if (css) {
          return resolve(css)
        } else {
          return parser(`${p}`).then(resolve, reject)
        }
      } else {
        return resolve('')
      }
    })
  })
}
