const chokidar = require('chokidar')
const growl = require('growl')
const cache = require('./cache')
const parser = require('./parser')
const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const util = require('./util')
const builder = require('./builder')
const config = require('./config')

module.exports = function (socket, opts = {}) {
  chokidar.watch('.', {ignored: /node_modules/}).on('change', path => {
    path = util.normalizePath(path)
    if(/\.json$/.test(path)) {
      fs.readFile(path, 'utf8', (err, content) => {
        if (err) return
        let data
        try {
          data = JSON.parse(content)
        } catch (e) {
          util.notifyError(e)
          return socket.send({ type: 'error', msg: `${path} 解析错误，请检查` })
        }
        growl(`Reloading ${path}`, { image: 'Safari', title: 'liveload' })
        socket.send({
          type: 'reload',
          path: path,
          content: data
        })
      })
    } else if(/\.js/.test(path)) {
      onReload(socket, path)
      builder.buildFile(path)
    } else if(/\.(wxss|wxml)$/.test(path)){
      config().then(conf => {
        let pages = conf.pages
        let isGlobal = pages.indexOf(path.replace(/\.\w+$/, '')) == -1
        if (/\.wxss$/.test(path) && isGlobal && 'app.wxss' !== path) {
          let files = cache.getRelatedWxssFiles(path)
          files.forEach(file => {
            wrapParser(socket, file.replace(/^\.\//, ''), opts.debug)
          })
        } else {
          wrapParser(socket, path, opts.debug)
        }
      }, e => {
        util.notifyError(e)
      })
    }
  })

  if (!/wept$/.test(process.argv[1])) {
    chokidar.watch(path.resolve(__dirname, '../public/script/build.js')).on('change', () => {
      growl('Reloading build.js', { image: 'Safari', title: 'liveload' })
      socket.send({type: 'reload'})
    })
  }
}

function wrapParser(socket, path, debug) {
  onReload(socket, path)
  parser(path).then((str) => {
    if (debug) console.log(str)
    console.log(chalk.green(` ✓ ${path} rebuild success`))
  }, err => {
    console.log(chalk.red(` ✗ ${path} rebuild error
${err.message}`))
    util.notifyError(err)
  })
}

function onReload(socket, path) {
  cache.del(path)
  socket.send({type: 'reload', path: path})
  growl(`Reloading ${path}`, { image: 'Safari', title: 'liveload' })
}
