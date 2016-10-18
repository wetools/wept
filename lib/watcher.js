const chokidar = require('chokidar')
const cache = require('./cache')
const parser = require('./parser')
const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const util = require('./util')

module.exports = function (socket, opts = {}) {
  chokidar.watch('.', {ignored: /[\/\\]\./}).on('change', path => {
    path = util.normalizePath(path)
    if (path == 'app.json') {
      socket.send({type: 'reload'})
    } else if(/\.json$/.test(path)){
      fs.readFile(path, 'utf8', (err, content) => {
        if (err) return
        let data
        try {
          data = JSON.parse(content)
        } catch (e) {
          return socket.send({ type: 'error', msg: `${path} JSON 解析错误，请检查` })
        }
        socket.send({
          type: 'reload',
          path: path,
          content: data
        })
      })
    } else if(/\.(js|wxss|wxml)$/.test(path)){
      cache.del(path)
      socket.send({type: 'reload', path: path})
      parser(path).then((str) => {
        if (opts.debug) console.log(str)
        console.log(chalk.green(` ✓ ${path} rebuild success`))
      }, err => {
        console.log(chalk.red(` ✗ ${path} rebuild)
${err.message}
        `))
      })
    }
  })

  if (!/wept$/.test(process.argv[1])) {
    chokidar.watch(path.resolve(__dirname, '../public/script/build.js')).on('change', path => {
      socket.send({type: 'reload'})
    })
  }
}
