'use strict';

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = require('path');
var chalk = require('chalk');
var et = require('et-improve');
var fs = require('fs');
var glob = require('glob');
var Parallel = require('node-parallel');

exports.globJSfiles = function () {
  return new _promise2.default(function (resolve, reject) {
    glob('**/*.js', {}, function (err, files) {
      if (err) return reject(err);
      resolve(files);
    });
  });
};

exports.loadJSONfiles = function (pages) {
  var p = new Parallel();
  var res = {};
  return function (done) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      var _loop = function _loop() {
        var page = _step.value;

        var file = page + '.json';
        p.add(function (cb) {
          fs.stat(file, function (err, stat) {
            if (stat && stat.isFile()) {
              fs.readFile(file, 'utf8', function (err, content) {
                if (err) return cb();
                try {
                  res[page] = JSON.parse(content);
                } catch (e) {
                  return cb(new Error(file + ' JSON 解析失败，请检查'));
                }
                cb();
              });
            } else {
              return cb();
            }
          });
        });
      };

      for (var _iterator = (0, _getIterator3.default)(pages), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        _loop();
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    p.done(function (err) {
      if (err) return done(err);
      done(null, res);
    });
  };
};

var id = 1;
exports.uid = function () {
  return id++;
};

exports.exists = function (p) {
  return new _promise2.default(function (resolve) {
    fs.stat(p, function (err, stats) {
      if (err) return resolve(false);
      if (stats.isFile()) {
        return resolve(true);
      }
      resolve(false);
    });
  });
};

exports.parseImports = function (xml) {
  var re = /<import\s+[^>]+?>/g;
  var res = [];
  var arr = [];
  while ((arr = re.exec(xml)) !== null) {
    var ms = arr[0].match(/src="([^"]+)"/);
    if (ms && ms[1]) {
      res.push(ms[1]);
    }
  }
  return res;
};

exports.loadTemplate = function (name) {
  return new _promise2.default(function (resolve, reject) {
    fs.readFile(path.resolve(__dirname, '../template/' + name + '.html'), 'utf8', function (err, content) {
      if (err) return reject(err);
      try {
        resolve(et.compile(content));
      } catch (e) {
        console.error(e.stack);
        reject(e);
      }
    });
  });
};

exports.groupFiles = function (files, config) {
  var pages = config.pages.map(function (page) {
    return page + '.js';
  });
  var utils = [];
  var routes = [];
  files.forEach(function (file) {
    if (pages.indexOf(file) == -1 && file !== 'app.js') {
      utils.push(file);
    }
  });
  pages.forEach(function (page) {
    if (files.indexOf(page) == -1) {
      console.log(chalk.red(' ✗ ' + page + ' not found'));
    } else {
      routes.push(page);
    }
  });
  return [utils, routes];
};