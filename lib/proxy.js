'use strict'
const parseUrl = require('url').parse
const http = require('http')
const https = require('https')
const assign = require('object-assign')
const tunnel = require('tunnel')
const config = require('./config')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

module.exports = function* (context, remote) {
  let url = remote || context.request.header['x-remote'] || context.request.query.url
  if (!url) throw new Error('Unknown remote url for ' + context.request.url)
  let conf = yield config()
  let headers = assign({}, context.header, conf.headers)
  delete headers['x-remote']
  delete headers['host']
  let urlObj = parseUrl(url)
  let port = urlObj.port || (urlObj.protocol == 'https:' ? 443 : 80)
  let isHttps  = /^https/.test(urlObj.protocol)
  let requestClient =  isHttps ? https : http
  let timeout = conf.networkTimeout ? conf.networkTimeout.request : 30000
  timeout = timeout || 30000
  headers['host'] =urlObj.hostname
  let opt = {
    path: urlObj.path,
    protocol: urlObj.protocol,
    host: urlObj.hostname,
    hostname: urlObj.hostname,
    port: port,
    method: context.method.toUpperCase(),
    headers,
    timeout
  }
  if (conf.proxy) {
    let proxyMethod = isHttps ? 'httpsOverHttp' : 'httpOverHttp'
    opt.agent = tunnel[proxyMethod]({proxy: conf.proxy})
  }
  let req = requestClient.request(opt)
  let res = yield pipeRequest(context.req, req)
  for (var name in res.headers) {
      // http://stackoverflow.com/questions/35525715/http-get-parse-error-code-hpe-unexpected-content-length
    if (name === 'transfer-encoding') {
      continue;
    }
    context.set(name, res.headers[name]);
  }
  context.status = res.statusCode
  context.body = res
}

function pipeRequest(readable, request) {
  return function (cb) {
    readable.on('data', buf => {
      request.write(buf)
    })
    readable.on('end', buf => {
      request.end(buf)
    })
    readable.on('error', err => {
      console.error(err.stack)
      request.end()
      cb(err)
    })
    request.on('error', err => {
      cb(err)
    })
    request.on('response', res => {
      cb(null, res)
    })
  }
}
