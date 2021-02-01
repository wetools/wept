'use strict';
const DEVTOOLS_CONFIG = require('../constantFile/DEVTOOLS_CONFIG');

const buildDevToolsConfig = () => {
  return Object.assign({}, DEVTOOLS_CONFIG);
};

module.exports = buildDevToolsConfig;
