var cache = {}

module.exports = {
  set: function (path, str) {
    cache[path] = str
  },
  del: function (path) {
    delete cache[path]
  },
  get: function (path) {
    return cache[path]
  }
}
