let fs = require('fs')
let path = require('path')
let exec = require('child_process').exec
let cache = require('./cache')
let config = require('./config')
let wcsc = path.resolve(__dirname, '../bin/wcsc')
let wcc = path.resolve(__dirname, '../bin/wcc')
let wxml_cmd = `${wcc} -d ./`
let wxss_cmd = `${wcsc} -lc `

module.exports = function (full_path) {
  full_path = full_path.replace(/^\.?\//, '')
  return new Promise(function (resolve, reject) {
    if (/\.wxml$/.test(full_path)) {
      exec(`${wxml_cmd}${full_path}`, (err, stdout, stderr) => {
        if (err) return reject(err)
        if (stderr) return reject(new Error(stderr))
        cache[full_path] = stdout
        resolve(stdout)
      })
    } else if (/\.wxss$/.test(full_path)) {
      exec(`${wxss_cmd}${full_path}`, (err, stdout, stderr) => {
        if (err) return reject(err)
        if (stderr) return reject(new Error(stderr))
        cache[full_path] = stdout
        resolve(stdout)
      })
    } else if (/\.js$/.test(full_path)) {
      config().then(function (obj) {
        let isModule = full_path != 'app.js' && obj.pages.indexOf(full_path.replace(/\.js$/, '')) == -1
        fs.readFile(full_path, 'utf8', (err, data) => {
          if (err) return reject(err)
          let str = `define("${full_path}", function(require, module){let window={Math:Math}/*兼容babel*/,location,document,navigator,self,localStorage,history,Caches;\n${data}\n});`
          str = isModule ? str : str + `require("${full_path}")`
          return resolve(str)
        })
      }, reject)
    } else {
      resolve()
    }
  })
}
