const fs = require('fs')
const path = require('path')
const exec = require('child_process').exec
const cache = require('./cache')
const config = require('./config')
const wcsc = path.resolve(__dirname, '../bin/wcsc')
const wcc = path.resolve(__dirname, '../bin/wcc')
const xmldoc = require('node-xml-lite')
const wxml_cmd = `${wcc} -d `
const wxss_cmd = `${wcsc} -lc `

function parseImports(file, cb) {
  fs.readFile(file, 'utf8', function (err, content) {
    if (err) return cb(err)
    let xml = `
<?xml version="1.0" encoding="UTF-8"?>
<root>
  ${content}
</root>
`
    let srcs = []
    try {
      let doc = xmldoc.parseString(xml)
      let imports = doc.childs.filter(node => node.name == 'import')
      srcs = imports.map(node => path.join(path.dirname(file), node.attrib.src))
    } catch (e) {
      if (e) return cb(e)
    }
    srcs.push(file)
    return cb(null, srcs.map(src => `./${src}`))
  })
}

module.exports = function (full_path) {
  full_path = full_path.replace(/^\.?\//, '')
  return new Promise(function (resolve, reject) {
    if (/\.wxml$/.test(full_path)) {
      parseImports(full_path, (err, srcs) => {
        if (err) return reject(err)
        let args = srcs.join(' ')
        exec(`${wxml_cmd}${args}`, (err, stdout, stderr) => {
          if (err) return reject(err)
          if (stderr) return reject(new Error(stderr))
          cache[full_path] = stdout
          resolve(stdout)
        })
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
