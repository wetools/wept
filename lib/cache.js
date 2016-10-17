"use strict";

var cache = {};

module.exports = {
  set: function set(path, str) {
    cache[path] = str;
  },
  del: function del(path) {
    delete cache[path];
  },
  get: function get(path) {
    return cache[path];
  }
};