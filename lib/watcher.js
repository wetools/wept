const chokidar = require('chokidar')
const growl = require('growl')
const cache = require('./cache')
const parser = require('./parser')
const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const util = require('./util')
const config = require('./config')

module.exports = function (socket, opts = {}) {
  chokidar.watch('.', {ignored: /[\/\\]\./, cwd: config.cwd()}).on('change', path => {
    path = util.normalizePath(path)
    if(/\.json$/.test(path)){
      fs.readFile(path, 'utf8', (err, content) => {
        if (err) return
        let data
        try {
          data = JSON.parse(content)
        } catch (e) {
          return socket.send({ type: 'error', msg: `${path} 解析错误，请检查` })
        }
        growl(`Reloading ${path}`, { image: 'Safari', title: 'liveload' })
        socket.send({
          type: 'reload',
          path: path,
          content: data
        })
      })
    } else if(/\.(js|wxss|wxml)$/.test(path)){
      cache.del(path)
      socket.send({type: 'reload', path: path})
      growl(`Reloading ${path}`, { image: 'Safari', title: 'liveload' })
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
      growl('Reloading build.js', { image: 'Safari', title: 'liveload' })
      socket.send({type: 'reload'})
    })
  }
}
