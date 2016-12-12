const path = require('path')
const execFile = require('child_process').execFile
const exec = require('child_process').exec
const cache = require('./cache')
const config = require('./config')
const isWin = /^win/.test(process.platform)
const isLinux = /^linux/.test(process.platform)
const isMac = /^darwin/.test(process.platform)
const wcscMac = path.resolve(__dirname, '../bin/wcsc')
const wcscWin = wcscMac + '.exe'
const wcscLinux = 'wine ' + wcscWin
const wccMac = path.resolve(__dirname, '../bin/wcc')
const wccWin = wccMac + '.exe'
const wccLinux = 'wine ' + wccWin
const wcsc = isWin ? wcscWin : (isMac ? wcscMac : wcscLinux)
const wcc = isWin ? wccWin : (isMac ? wccMac : wccLinux)
const util = require('./util')
const wxssSourcemap = require('./wxss')
const wxml_args = ['-d']
const wxss_args = ['-lc', '-db']

const convert = require('convert-source-map')

function parseImports(file, wxss, cb) {
  let fn = wxss ? 'parseCssImports' : 'parseImports'
  let srcs = []
  util[fn](srcs, file, function (err) {
    if (err) return cb(err)
    srcs = srcs.map(src => {
      let p = /^\//.test(src) ? src.replace(/^\//, '') : src
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
        let execWcc = execFile.bind(null, wcc, wxml_args.concat(srcs))
        if (isLinux) {
          execWcc = exec.bind(null, [wcc].concat(wxml_args).concat(srcs).join(' '))
        }
        execWcc( {maxBuffer: 1024 * 600}, (err, stdout, stderr) => {
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
        let execWcsc = execFile.bind(null, wcsc, wxss_args.concat(srcs))
        if (isLinux) {
          execWcsc = exec.bind(null, [wcsc].concat(wxss_args).concat(srcs).join(' '))
        }
        execWcsc({maxBuffer: 1024 * 600}, (err, stdout, stderr) => {
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
        util.parseJavascript(obj, full_path, config.babel)
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
