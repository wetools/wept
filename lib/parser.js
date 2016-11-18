const fs = require('fs')
const path = require('path')
const execFile = require('child_process').execFile
const cache = require('./cache')
const config = require('./config')
const isWin = /^win/.test(process.platform)
const wcsc = path.resolve(__dirname, '../bin/wcsc' + (isWin ? '.exe' : ''))
const wcc = path.resolve(__dirname, '../bin/wcc' + (isWin ? '.exe' : ''))
const util = require('./util')
const wxssSourcemap = require('./wxss')
const wxml_args = ['-d']
const wxss_args = ['-lc', '-db']
const convert = require('convert-source-map')

function parseImports(file, wxss, cb) {
  fs.readFile(file, 'utf8', function (err, content) {
    if (err) return cb(err)
    let srcs = wxss ? util.parseCssImports(content) : util.parseImports(content)
    let root = path.dirname(file)
    srcs = srcs.map(src => {
      let p = /^\//.test(src) ? src.replace(/^\//, '') : path.join(root, src)
      return util.normalizePath(p)
    })
    srcs.unshift(file)
    return cb(null, srcs.map(src => `./${src}`))
  })
}

module.exports = function (full_path) {
  full_path = full_path.replace(/^\.?\//, '')
  return new Promise(function (resolve, reject) {
    if (/\.wxml$/.test(full_path)) {
      parseImports(full_path, false, (err, srcs) => {
        if (err) return reject(err)
        execFile(wcc, wxml_args.concat(srcs), {maxBuffer: 1024 * 600}, (err, stdout, stderr) => {
          if (err) {
            console.error(err.stack)
            return reject(new Error(`${full_path} 编译失败，请检查`))
          }
          if (stderr) return reject(new Error(stderr))
          cache[full_path] = stdout
          resolve(stdout)
        })
      })
    } else if (/\.wxss$/.test(full_path)) {
      parseImports(full_path, true, (err, srcs) => {
        if (err) return reject(err)
        cache.setWxssMap(srcs)
        execFile(wcsc, wxss_args.concat(srcs), {maxBuffer: 1024 * 600}, (err, stdout, stderr) => {
          if (err) {
            console.error(err.stack)
            return reject(new Error(`${full_path} 编译失败，请检查`))
          }
          if (stderr) return reject(new Error(stderr))
          wxssSourcemap(full_path, stdout).then(content => {
            cache[full_path] = content
            resolve(content)
          }, reject)
        })
      })
    } else if (/\.js$/.test(full_path)) {
      config().then(function (obj) {
        util.parseJavascript(obj, full_path)
          .then(function ({code, map}) {
            code = code + "\n" + convert.fromJSON(map).toComment()
            cache[full_path] = code
            resolve(code)
          }, function (err) {
            console.error(err.stack)
            return reject(new Error(`${full_path} 编译失败，请检查`))
          })
      }, reject)
    } else {
      resolve()
    }
  })
}
