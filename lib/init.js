const fs = require('fs')
const builder = require('./builder')
const chalk = require('chalk')
const util = require('./util')
const parser = require('./parser')

// build service file
builder.build().then(res => {
  return res
}, err => {
  onError(err)
  process.exit()
})

// parse wxml and wxss files
setImmediate(() => {
  let currConfig = JSON.parse(fs.readFileSync('./app.json', 'utf8'))
  let pages = currConfig.pages
  pages.forEach(p => {
    let wxml = `${p}.wxml`
    let wxss = `${p}.wxss`
    fs.stat(wxml, (err, stats) => {
      if (err || !stats.isFile()) return onError(new Error(`${wxml} 未找到，请检查`))
      parser(wxml).catch(onError)
    })
    fs.stat(wxss, (err) => {
      // should be fine
      if (err) return
      parser(wxss).catch(onError)
    })
  })
})

function onError(err) {
  console.log(chalk.red(err.message))
  util.notifyError(err)
}
