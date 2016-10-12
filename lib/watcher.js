const chokidar = require('chokidar')
const cache = require('./cache')
const parser = require('./parser')
const chalk = require('chalk')
const path = require('path')
const fs = require('fs')

module.exports = function (socket, opts = {}) {
  chokidar.watch('.', {ignored: /[\/\\]\./}).on('change', path => {
    if (path == 'app.json') {
      socket.send({type: 'reload'})
    } else if(/\.json$/.test(path)){
      fs.readFile(path, 'utf8', (err, content) => {
        if (err) return
        let data
        try {
          data = JSON.parse(content)
        } catch (e) {
          return socket.send({ type: 'error', msg: `JSON parse error of ${path}` })
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
        console.log(chalk.green(` ✓ ${path} rebuild`))
      }, err => {
        console.log(chalk.red(` ✗ ${path} rebuild)
${err.message}
        `))
      })
    }
  })

  chokidar.watch(path.resolve(__dirname, '../public/script/build.js')).on('change', path => {
    socket.send({type: 'reload'})
  })
}
