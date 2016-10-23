import Emitter from 'emitter'

let directory = window.__wxConfig__.directory

function getType(key) {
  let str= localStorage.getItem(directory + '_type')
  if (!str) return
  let obj = JSON.parse(str)
  return obj[key]
}

function getTypes() {
  let str= localStorage.getItem(directory + '_type')
  if (!str) return {}
  return JSON.parse(str)
}

let storage = {
  set: function (key, value, dataType) {
    if (window.localStorage == null) return console.error('localStorage not supported')
    let str = localStorage.getItem(directory)
    let obj
    obj = str ? JSON.parse(str) : {}
    obj[key] = value
    localStorage.setItem(directory, JSON.stringify(obj))
    let types = getTypes()
    types[key] = dataType
    localStorage.setItem(directory + '_type', JSON.stringify(types))
    this.emit('change')
  },
  get: function (key) {
    if (window.localStorage == null) return console.error('localStorage not supported')
    let str = localStorage.getItem(directory)
    let obj
    obj = str ? JSON.parse(str) : {}
    return {
      data: obj[key],
      dataType: getType(key)
    }
  },
  remove: function (key) {
    if (window.localStorage == null) return console.error('localStorage not supported')
    let str = localStorage.getItem(directory)
    if (!str) return
    let obj =JSON.parse(str)
    delete obj[key]
    localStorage.setItem(directory, JSON.stringify(obj))
    let types = getTypes()
    delete types[key]
    localStorage.setItem(directory + '_type', JSON.stringify(types))
    this.emit('change')
  },
  clear: function () {
    if (window.localStorage == null) return console.error('localStorage not supported')
    localStorage.removeItem(directory)
    localStorage.removeItem(directory + '_type')
    this.emit('change')
  },
  getAll: function () {
    if (window.localStorage == null) return console.error('localStorage not supported')
    let str = localStorage.getItem(directory)
    let obj = str ? JSON.parse(str) : {}
    let res = {}
    Object.keys(obj).forEach(function (key) {
      res[key] = {
        data: obj[key],
        dataType: getType(key)
      }
    })
    return res
  }
}

Emitter(storage)

window.__storage = storage

export default storage
