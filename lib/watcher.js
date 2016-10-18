'use strict';

var chokidar = require('chokidar');
var cache = require('./cache');
var parser = require('./parser');
var chalk = require('chalk');
var path = require('path');
var fs = require('fs');
var util = require('./util');

module.exports = function (socket) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  chokidar.watch('.', { ignored: /[\/\\]\./ }).on('change', function (path) {
    path = util.normalizePath(path);
    if (path == 'app.json') {
      socket.send({ type: 'reload' });
    } else if (/\.json$/.test(path)) {
      fs.readFile(path, 'utf8', function (err, content) {
        if (err) return;
        var data = void 0;
        try {
          data = JSON.parse(content);
        } catch (e) {
          return socket.send({ type: 'error', msg: path + ' JSON 解析错误，请检查' });
        }
        socket.send({
          type: 'reload',
          path: path,
          content: data
        });
      });
    } else if (/\.(js|wxss|wxml)$/.test(path)) {
      cache.del(path);
      socket.send({ type: 'reload', path: path });
      parser(path).then(function (str) {
        if (opts.debug) console.log(str);
        console.log(chalk.green(' ✓ ' + path + ' rebuild success'));
      }, function (err) {
        console.log(chalk.red(' ✗ ' + path + ' rebuild)\n' + err.message + '\n        '));
      });
    }
  });

  chokidar.watch(path.resolve(__dirname, '../public/script/build.js')).on('change', function (path) {
    socket.send({ type: 'reload' });
  });
};