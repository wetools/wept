const growl = require('growl')
const path = require('path')
const chalk = require('chalk')
const et = require('et-improve')
const fs = require('fs')
const glob = require('glob')
const Parallel = require('node-parallel')
const babel = require('babel-core')
const isWin = /^win/.test(process.platform);
const Concat = require('concat-with-sourcemaps')
const ni = require('os').networkInterfaces()

const BASE_DEVICE_WIDTH = 750
const EPS = 0.0001
const RPXRE = /%%\?[+-]?\d+(\.\d+)?rpx\?%%/g


exports.globJSfiles = function() {
  return new Promise(function(resolve, reject) {
    glob('**/*.js', {
      ignore: 'node_modules/**/*.js'
    }, function(err, files) {
      if (err) return reject(err)
      resolve(files)
    })
  })
}

exports.loadJSONfiles = function(pages) {
  let p = new Parallel()
  let res = {}
  return function(done) {
    for (let page of pages) {
      let file = page + '.json'
      p.add(cb => {
        fs.stat(file, function(err, stat) {
          if (stat && stat.isFile()) {
            fs.readFile(file, 'utf8', (err, content) => {
              if (err) return cb()
              try {
                res[page] = JSON.parse(content)
              } catch (e) {
                return cb(new Error(`${file} JSON 解析失败，请检查`))
              }
              cb()
            })
          } else {
            return cb()
          }
        })
      })
    }
    p.done(err => {
      if (err) return done(err)
      done(null, res)
    })
  }
}

let id = 1
exports.uid = function() {
  return id++
}

exports.exists = function(p) {
  return new Promise(function(resolve) {
    fs.stat(p, function(err, stats) {
      if (err) return resolve(false)
      if (stats.isFile()) {
        return resolve(true)
      }
      resolve(false)
    })
  })
}

exports.parseImports = function parseImports(res, file, cb) {
  fs.readFile(file, 'utf8', (err, xml) => {
    if (err) return cb(err)
    let re = /<(import|include)\s+[^>]+?>/g
    let arr = []
    let p = new Parallel()
    while ((arr = re.exec(xml)) !== null) {
      let ms = arr[0].match(/src="([^"]+)"/)
      if (ms && ms[1]) {
        let f = /^\//.test(ms[1]) ? 
                ms[1].replace(/^\//, '')
                : path.join(path.dirname(file), ms[1])
        f = /\.wxml/.test(f) ? f : `${f}.wxml`
        if (res.indexOf(f) == -1) {
          res.push(f)
          p.add(done => {
            parseImports(res, f, done)
          })
        }
      }
    }
    p.done(cb)
  })
}

exports.parseCssImports = function parseCssImports(res, file, cb) {
  let re = /\s*@import\s+[^;]+?;/g
  fs.readFile(file, 'utf8', (err, content) => {
    if (err) return cb(err)
    let arr = []
    let p = new Parallel()
    while ((arr = re.exec(content)) !== null) {
      let ms = arr[0].match(/(['"])([^\1]+)\1/)
      if (ms && ms[2]) {
        let f = /^\//.test(ms[2]) ? 
                  ms[2].replace(/^\//, '')
                : path.join(path.dirname(file), ms[2])
        if (res.indexOf(f) == -1) {
          res.push(f)
          p.add(done => {
            parseCssImports(res, f, done)
          })
        }
      }
    }
    p.done(cb)
  })
}

exports.loadTemplate = function(name) {
  return new Promise(function(resolve, reject) {
    fs.readFile(path.resolve(__dirname, `../template/${name}.html`), 'utf8', (err, content) => {
      if (err) return reject(err)
      try {
        resolve(et.compile(content))
      } catch (e) {
        console.error(e.stack)
        reject(e)
      }
    })
  })
}

exports.groupFiles = function(files, config) {
  let pages = config.pages.map(page => {
    return page + '.js'
  })
  let utils = []
  let routes = []
  files.forEach(function(file) {
    if (pages.indexOf(file) == -1 && file !== 'app.js') {
      utils.push(file)
    }
  })
  pages.forEach(function(page) {
    if (files.indexOf(page) == -1) {
      console.log(chalk.red(` ✗ ${page} not found`))
    } else {
      routes.push(page)
    }
  })
  return [utils, routes]
}

exports.normalizePath = function(p) {
  if (isWin) return p.replace(/\\/g, '/')
  return p
}

exports.parseJavascript = function(config, full_path) {
  return new Promise(function(resolve, reject) {
    let isModule = full_path != 'app.js' && config.pages.indexOf(full_path.replace(/\.js$/, '')) == -1
    loadJavascript(full_path, config.babel, function (err, result) {
      if (err) return reject(err)
      let concat = new Concat(true, full_path, '\n')
      concat.add(null, `define("${full_path}", function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,fetch,XMLHttpRequest,WebSocket,webkit,WeixinJSCore,WeixinJSBridge,Reporter){`)
      concat.add(full_path, result.code, result.map)
      concat.add(null, '});' + (isModule ? '' : `require("${full_path}")`))
      return resolve({
        code: concat.content,
        map: concat.sourceMap
      })
    })
  })
}

function loadJavascript(full_path, useBabel, cb) {
  if (useBabel) {
    babel.transformFile(full_path, {
      presets: ['babel-preset-es2015'].map(require.resolve),
      sourceMaps: true,
      sourceFileName: full_path,
      babelrc: false,
      ast: false,
      resolveModuleSource: false
    }, function(err, result) {
      if (err) return cb(err)
      cb(null, result)
    })
  } else {
    fs.readFile(full_path, 'utf8', function (err, content) {
      if (err) return cb(err)
      cb(null, {
        code: content,
        map: null
      })
    })
  }
}

exports.notifyError = function(err) {
  console.error(err.stack)
  let img = path.resolve(__dirname, '../public/images/error.png')
  growl(err.message, {
    image: img
  })
}

exports.getIp = function() {
  let ipAddress = [];
  for (let key in ni) {
    for (let index in ni[key]) {
      if (ni[key][index].family === 'IPv4' && !ni[key][index].internal) {
        ipAddress.push(ni[key][index].address);
      }
    }
  }
  if (ipAddress.length >= 1) {
    return ipAddress[0]
  } else {
    return '127.0.0.1'
  }
}

exports.parseCss = function (content, width, ratio) {
  var b
  b = content.match(RPXRE)
  if (b) {
    b.forEach(function(c) {
      var d = getNumber(c, width, ratio)
      var e = d + "px"
      content = content.replace(c, e)
    })
  }
  return content
}

function transformByDPR(a, width, dpr) {
  a = a / BASE_DEVICE_WIDTH * width
  a = Math.floor(a + EPS)
  if (a === 0) {
    if (dpr === 1) {
      return 1
    } else {
      return 0.5
    }
  }
  return a
}

function getNumber(e, width, ratio) {
  var g = 0
  var d = 1
  var a = false
  var f = false
  for (var b = 0; b < e.length; ++b) {
    var h = e[b]
    if (h >= "0" && h <= "9") {
      if (a) {
        d *= 0.1
        g += (h - "0") * d
      } else {
        g = g * 10 + (h - "0")
      }
    } else {
      if (h === ".") {
        a = true
      } else {
        if (h === "-") {
          f = true
        }
      }
    }
  }
  if (f) {
    g = -g
  }
  return transformByDPR(g, width, ratio)
}
