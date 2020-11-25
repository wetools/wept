'use strict';
const chalk = require('chalk');

module.exports = {
  info: function (msg) {
    console.log('%s %s %s', `[${(new Date()).toUTCString()}]`, '[INFO]', msg);
  },
  warn: function (msg) {
    console.log('%s %s %s', chalk.yellow(`[${(new Date()).toUTCString()}]`), chalk.yellow('[WARN]'), chalk.yellow(msg));
  },
  success: function (msg) {
    console.log('%s %s %s', chalk.green(`[${(new Date()).toUTCString()}]`), chalk.green('[SUCCESS]'), chalk.green(msg));
  },
  error: function (msg) {
    if (msg instanceof Error) {
      console.log('%s %s %s', chalk.red(`[${(new Date()).toUTCString()}]`), chalk.red('[ERROR]'), chalk.red(msg.stack));
    } else {
      console.log('%s %s %s', chalk.red(`[${(new Date()).toUTCString()}]`), chalk.red('[ERROR]'), chalk.red(msg));
    }
  }
};
