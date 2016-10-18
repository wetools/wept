'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;
var cache = require('./cache');
var config = require('./config');
var isWin = /^win/.test(process.platform);
var wcsc = path.resolve(__dirname, '../bin/wcsc' + (isWin ? '.exe' : ''));
var wcc = path.resolve(__dirname, '../bin/wcc' + (isWin ? '.exe' : ''));
var util = require('./util');
var wxml_cmd = wcc + ' -d ';
var wxss_cmd = wcsc + ' -lc ';

function parseImports(file, cb) {
  fs.readFile(file, 'utf8', function (err, content) {
    if (err) return cb(err);
    var srcs = util.parseImports(content);
    var root = path.dirname(file);
    srcs = srcs.map(function (src) {
      return util.normalizePath(path.join(root, src));
    });
    srcs.push(file);
    return cb(null, srcs.map(function (src) {
      return './' + src;
    }));
  });
}

module.exports = function (full_path) {
  full_path = full_path.replace(/^\.?\//, '');
  return new _promise2.default(function (resolve, reject) {
    if (/\.wxml$/.test(full_path)) {
      parseImports(full_path, function (err, srcs) {
        if (err) return reject(err);
        var args = srcs.join(' ');
        exec('' + wxml_cmd + args, function (err, stdout, stderr) {
          if (err) {
            console.error(err.stack);
            return reject(new Error(full_path + ' 编译失败，请检查'));
          }
          if (stderr) return reject(new Error(stderr));
          cache[full_path] = stdout;
          resolve(stdout);
        });
      });
    } else if (/\.wxss$/.test(full_path)) {
      exec('' + wxss_cmd + full_path, function (err, stdout, stderr) {
        if (err) {
          console.error(err.stack);
          return reject(new Error(full_path + ' 编译失败，请检查'));
        }
        if (stderr) return reject(new Error(stderr));
        cache[full_path] = stdout;
        resolve(stdout);
      });
    } else if (/\.js$/.test(full_path)) {
      config().then(function (obj) {
        var isModule = full_path != 'app.js' && obj.pages.indexOf(full_path.replace(/\.js$/, '')) == -1;
        fs.readFile(full_path, 'utf8', function (err, data) {
          if (err) return reject(err);
          var str = 'define("' + full_path + '", function(require, module){let window={Math:Math}/*兼容babel*/,location,document,navigator,self,localStorage,history,Caches;\n' + data + '\n});';
          str = isModule ? str : str + ('require("' + full_path + '")');
          return resolve(str);
        });
      }, reject);
    } else {
      resolve();
    }
  });
};