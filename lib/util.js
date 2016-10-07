const fs = require('fs')
const glob = require('glob')

exports.globJSfiles = function () {
  return new Promise(function (resolve, reject) {
    glob('**/*.js', {}, function (err, files) {
      if (err) return reject(err)
      resolve(files)
    })
  })
}

let id = 1
exports.uid = function () {
  return id++
}

exports.exists = function (p) {
  return new Promise(function (resolve) {
    fs.stat(p, function (err, stats) {
      if (err) return resolve(false)
      if (stats.isFile()) {
        return resolve(true)
      }
      resolve(false)
    })
  })
}
