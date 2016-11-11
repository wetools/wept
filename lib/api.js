const fs = require('fs')
const path = require('path')
const Parallel = require('node-parallel')

var getFileList = exports.getFileList = function (dir) { //eslint-disable-line
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if (err) return reject(err)
      let p = new Parallel()
      let res = []
      files.forEach(f => {
        let file = path.join(dir, f)
        p.add(done => {
          fs.stat(file, (err, stats) => {
            if (err) return done()
            if (stats.isFile()) {
              res.push({
                size: stats.size,
                filePath: file,
                createTime: Math.round(stats.ctime.getTime()/1000)
              })
            }
            done()
          })
        })
      })
      p.done(() => {
        resolve(res)
      })
    })
  })
}

var getFileInfo = exports.getFileInfo = function (filePath) { //eslint-disable-line
  return new Promise((resolve, reject) => {
    fs.stat(filePath, (err, stats) => {
      if (err) return reject(err)
      if (!stats.isFile()) return reject(new Error(`Not a file: ${filePath}`))
      return resolve({
        size: stats.size,
        createTime: Math.round(stats.ctime.getTime()/1000)
      })
    })
  })
}

var removeFile = exports.removeFile = function (filePath) { //eslint-disable-line
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, err => {
      if (err) return reject(err)
      resolve(null)
    })
  })
}
