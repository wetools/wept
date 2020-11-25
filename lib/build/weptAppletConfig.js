'use strict';
class WeptAppletConfig {
  constructor (options = {}) {
    this.appletSources = options.appletSources;
    this.compiledPath = options.compiledPath;
  }

};

module.exports = WeptAppletConfig;
