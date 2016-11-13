const cache = {}

const wxss_map = {}

module.exports = {
  set: function (path, str) {
    cache[path] = str
  },
  del: function (path) {
    delete cache[path]
  },
  get: function (path) {
    return cache[path]
  },
  setWxssMap: function (files) {
    var arr = files.map(f => f)
    wxss_map[arr.shift()] = arr
  },
  getRelatedWxssFiles: function (file) {
    file = /^\.\//.test(file) ? file : `./${file}`
    let res = []
    Object.keys(wxss_map).forEach(key => {
      let files = wxss_map[key]
      if (files.indexOf(file) !== -1) res.push(key)
    })
    return res
  }
}
