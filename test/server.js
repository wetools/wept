const koa = require('koa')
const http = require('http')
const path = require('path')
const logger = require('koa-logger')
const formidable = require('koa-formidable')
const router = require('koa-router')()
const app = koa()

router.post('/upload', function* () {
  let form = yield formidable.parse({
    uploadDir: '/tmp',
    keepExtensions: true
  }, this)
  let file = form.files.file
  this.body = {file_path: file.path}
  this.content = 'json'
})

app.use(function* (next) {
  yield next
})
app.use(logger())
app.use(router.routes())
app.use(router.allowedMethods())
app.use(require('koa-static')(__dirname))

let server = http.createServer(app.callback())

server.listen(4000)
console.log(`listening on port 4000`);
