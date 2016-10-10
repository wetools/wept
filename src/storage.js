let directory = window.__wxConfig__.directory

let storage = {
  set: function (key, value) {
    if (window.localStorage == null) return console.error('localStorage not supported')
    let str = localStorage.getItem(directory)
    let obj
    obj = str ? JSON.parse(str) : {}
    obj[key] = value
    localStorage.setItem(directory, JSON.stringify(obj))
  },
  get: function (key) {
    if (window.localStorage == null) return console.error('localStorage not supported')
    let str = localStorage.getItem(directory)
    let obj
    obj = str ? JSON.parse(str) : {}
    return obj[key]
  },
  clear: function () {
    if (window.localStorage == null) return console.error('localStorage not supported')
    localStorage.removeItem(directory)
  }
}

window.__storage = storage

export default storage
