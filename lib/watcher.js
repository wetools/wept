let chokidar = require('chokidar')
let cache = require('./cache')
let parser = require('./parser')
let chalk = require('chalk')
let path = require('path')

module.exports = function (socket, opts = {}) {
  chokidar.watch('.', {ignored: /[\/\\]\./}).on('change', path => {
    if (path == 'app.json') {
      socket.send({type: 'reload'})
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
