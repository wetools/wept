const koa = require('koa')
const http = require('http')
const path = require('path')
const growl = require('growl')
const watcher = require('./watcher')
const socketBuilder = require('./socket')
const router = require('./router')
const util = require('./util')
const send = require('koa-send')
const app = koa()

let socket

app.use(notifyError)
app.use(staticFallback)
app.use(router())
app.use(require('koa-static')(path.resolve(__dirname, '../public')))

let server = http.createServer(app.callback())
socket = socketBuilder(server)
watcher(socket)

//notify error to client side if possible
function *notifyError(next) {
  if (!socket) return yield next
  try {
    yield next
  } catch(e) {
    console.error(e.stack)
    let img = path.resolve(__dirname, '../public/images/error.png')
    growl(e.message, {image: img})
    socket.send({
      type: 'error',
      msg: e.message
    })
  }
}

// try to find file in current directory
function *staticFallback(next) {
  yield next
  if (this.status == 404) {
    //let p = path.resolve(process.cwd(), this.request.path)
    let p = this.request.path.replace(/^\//, '')
    let exists = util.exists(p)
    if (exists) yield send(this, p)
  }
}

if (!module.parent) {
  server.listen(3000)
  console.log(`listening on port 3000`);
} else {
  module.exports = server
}
