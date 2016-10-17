'use strict'
var coRequest = require('co-request')

var request = coRequest.defaults({ jar: true })
var options = {}

module.exports = function* (context) {
  var url = context.request.header['x-remote']
  if (!url) throw new Error('header X-Remote required')

  var parsedBody = getParsedBody(context)
  delete context.header['x-remote']

  var opt = {
    url: url,
    headers: context.header,
    encoding: null,
    method: context.method,
    body: parsedBody
  }


  if (options.requestOptions) {
    if (typeof options.requestOptions === 'function') {
      opt = options.requestOptions(context.request, opt)
    } else {
      Object.keys(options.requestOptions).forEach(function (option) { opt[option] = options.requestOptions[option]; })
    }
  }

  var requestThunk = request(opt)
  var res

  if (parsedBody) {
    res = yield requestThunk
  } else {
    // Is there a better way?
    // https://github.com/leukhin/co-request/issues/11
    res = yield pipeRequest(context.req, requestThunk)
  }

  context.status = res.statusCode
  for (var name in res.headers) {
    // http://stackoverflow.com/questions/35525715/http-get-parse-error-code-hpe-unexpected-content-length
    if (name === 'transfer-encoding') {
      continue
    }
    context.set(name, res.headers[name])
  }

  context.body = res.body
}

function getParsedBody(ctx){
  var body = ctx.request.body
  if (body === undefined || body === null){
    return undefined
  }
  var contentType = ctx.request.header['content-type']
  if (!Buffer.isBuffer(body) && typeof body !== 'string'){
    if (contentType && contentType.indexOf('json') !== -1){
      body = JSON.stringify(body)
    } else {
      body = body + ''
    }
  }
  return body
}

function pipeRequest(readable, requestThunk){
  return function(cb){
    readable.pipe(requestThunk(cb))
  }
}
