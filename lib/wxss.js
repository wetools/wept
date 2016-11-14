const fs = require('fs')
const sourceMap = require('source-map')
const Parallel = require('node-parallel')
const convert = require('convert-source-map')

module.exports = function (file, content) {
  let generator = new sourceMap.SourceMapGenerator({
    file: file
  })
  let results = []
  let files = []
  content.split('\n').forEach((line, i) => {
    let lnum = i + 1
    line = line.replace(/;wxcs_style[^;]+;/g, '')
    line = line.replace(/;wxcs_fileinfo:\s([^\s]+)\s(\d+)\s(\d+);/, function (match, file, lineNum, colNum) {
      file = file.replace(/^\.?\//, '')
      if (files.indexOf(file) == -1) files.push(file)
      generator.addMapping({
        source: file,
        original: {line: lineNum, column: colNum},
        generated: {line: lnum, column: 0}
      })
      return ''
    })
    results.push(line)
  })

  return new Promise((resolve, reject) => {
    let p = new Parallel()
    files.forEach(path => {
      p.add(done => {
        fs.readFile(`./${path}`, 'utf8', (err, content) => {
          if (err) return done(err)
          generator.setSourceContent(path, content)
          done()
        })
      })
    })
    p.done(err => {
      if (err) return reject(err)
      let res = results.join('\n')
      res = res + convert.fromJSON(generator.toString()).toComment({
        multiline: true
      })
      resolve(res)
    })
  })
}
