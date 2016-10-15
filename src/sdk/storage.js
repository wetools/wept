let directory = window.__wxConfig__.directory

if (window.localStorage) {
}

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
  clear: function () {
    if (window.localStorage == null) return console.error('localStorage not supported')
    localStorage.removeItem(directory)
    localStorage.removeItem(directory + '_type')
  }
}

window.__storage = storage

export default storage
