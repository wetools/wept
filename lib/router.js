'use strict'
const path = require('path')
const send = require('koa-send')
const uuid = require('uuid')
const mkdir = require('mkdir-p')
const loadConfig = require('./config')
const util = require('./util')
const crypto = require('crypto')
const hash_dir = crypto.createHash('md5').update(process.cwd()).digest("hex")
const router = require('koa-router')()
const parser = require('./parser')
const fs = require('fs')
const cache = require('./cache')

mkdir.sync(path.join(require('os').tmpdir(), hash_dir))

function escape(x) { return x}

function noext(str) {
  return str.replace(/\.\w+$/, '')
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
        let content = cache.get(p)
        if (content) {
          return resolve(content)
        } else {
          return parser(`${p}`).then(resolve, reject)
        }
      } else {
        return resolve('')
      }
    })
  })
}

router.get('/', function *() {
  let [config, rootFn] = yield [loadConfig(), util.loadTemplate('index')]
  this.body = rootFn({
    config: JSON.stringify(config),
    root: config.root
  }, {}, escape)
  this.type = 'html'
  //yield next
})

router.get('/appservice', function *() {
  let [config, files, serviceFn] = yield [loadConfig(), util.globJSfiles(), util.loadTemplate('service')]
  let [utils, routes] = util.groupFiles(files, config)
  this.body = serviceFn({
    utils,
    routes,
    config: JSON.stringify(config)
  }, {noext}, escape)
  this.type = 'html'
})

router.post('/upload', function* () {
  let filename = uuid.v1()
  let file_path = path.join(hash_dir, filename)
  let full_path = path.join(require('os').tmpdir(), file_path)
  yield this.saveToFile(full_path)
  this.body = {file_path: '/' + file_path}
  this.content = 'json'
})

router.get('/generateFunc', function* () {
  this.body = yield loadFile(this.query.path + '.wxml')
  this.type = 'text'
})

router.get('/generateJavascript', function* () {
  this.body = yield loadFile(this.query.path)
  this.type = 'text'
})

router.get('/app/(.*)', function* () {
  let p = this.request.path
  let file = p.replace(/^\/app\//, '')
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
    let [content, viewFn] = yield [loadFile(file), util.loadTemplate('view')]
    this.body = viewFn({
      inject_js: content,
      path: file.replace(/\.wxml/, '')
    }, {}, escape)
    this.type = 'html'
  } else {
    // support resource files with relative p
    let exists = util.exists(file)
    if (exists) {
      yield send(this, file)
    } else {
      this.status = 404
      throw new Error(`File: ${file} not found`)
    }
  }
})

module.exports = router
