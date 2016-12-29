'use strict'
const fs = require('fs')
const path = require('path')
const send = require('koa-send')
const mkdir = require('mkdir-p')
const crypto = require('crypto')
const loadConfig = require('./config')
const util = require('./util')
const cache = require('./cache')
const parser = require('./parser')
const router = require('koa-router')()
const hash_dir = crypto.createHash('md5').update(process.cwd()).digest("hex")
const formidable = require('koa-formidable')
const osTmp = require('os').tmpdir()
const tmpDir = path.join(osTmp, hash_dir)
mkdir.sync(tmpDir)
const root = (require('os').platform == "win32") ? process.cwd().split(path.sep)[0] : "/"
const version = require('../package.json').version
const builder = require('./builder')
const api = require('./api')

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
  let pageConfig = yield util.loadJSONfiles(config.pages)
  config['window'].pages = pageConfig
  let tabBar = config.tabBar
  this.body = rootFn({
    config: JSON.stringify(config),
    root: config.root,
    ip: util.getIp(),
    topBar: tabBar && tabBar.position == 'top',
    version
  }, {}, escape)
  this.type = 'html'
  //yield next
})

router.get('/appservice', function *() {
  let [config, serviceFn] = yield [loadConfig(), util.loadTemplate('service')]
  this.body = serviceFn({
    version,
    config: JSON.stringify(config)
  }, {noext}, escape)
  this.type = 'html'
})

router.get('/generateFunc', function* () {
  this.body = yield loadFile(this.query.path + '.wxml')
  this.type = 'text'
})

router.get('/generateJavascript', function* () {
  this.body = yield loadFile(this.query.path)
  this.type = 'text'
})

router.get('/fileList', function* () {
  this.body = yield api.getFileList(tmpDir)
  this.type = 'json'
})

router.get('/fileInfo', function* () {
  this.body = yield api.getFileInfo(this.query.filePath)
  this.type = 'json'
})

router.post('/removeFile', function* () {
  this.body = yield api.removeFile(this.query.filePath)
  this.type = 'json'
})

router.get(tmpDir + '/(.*)', function* () {
  yield send(this, this.request.path, {root: root})
})

router.get('/service.js', function* () {
  this.body = yield builder.load()
  this.type = 'application/javascript'
})

router.get('/app/(.*)', function* () {
  let p = this.request.path
  let file = p.replace(/^\/app\//, '')
  if (/\.wxss/.test(file)) {
    let content = yield loadFile(file)
    this.body = util.parseCss(content, this.query.w, this.query.r)
    this.type ='css'
  } else if (/\.js$/.test(file)) {
    let content = yield loadFile(file)
    this.body = content
    this.type ='javascript'
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
      width: this.query.w,
      ratio: this.query.r,
      version,
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
  this.set('Cache-Control', 'max-age=0')
})

router.post('/upload', function* () {
  let form = yield formidable.parse({
    uploadDir: tmpDir,
    keepExtensions: true
  }, this)

  let file = form.files.file
  let file_path = path.normalize(file.path)
  this.body = {file_path: file_path}
  this.content = 'json'
})

module.exports = router
