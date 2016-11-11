// send XMR request to server
const request = require('request')

export default function api({method = 'get', headers = {}, url, data = null, query = {}}) {
  return new Promise((resolve, reject) => {
    let req = request(method, url)
    req.accept('json').type('json')
    req.query(query)
    if (data) req.send(data)

    for (let key in headers) {
      req.set(key, headers[key])
    }
    req.end(res => {
      if (res.ok) return resolve(res.body)
      reject(new Error(res.text))
    })
  })
}
