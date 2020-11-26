'use strict';
const logs = require('../logs');
const trashCacheApplet = require('./trashCacheApplet');
const WeptAppletConfig= require('./weptAppletConfig');
const compileAMDJs = require('../compile/AMDJs');



class WeptApplet {
  constructor(options = {}) {
    this.weptConfig = new WeptAppletConfig(options);
  }

  async run() {
    // TODO 编译打包
    await trashCacheApplet(this.weptConfig);
    compileAMDJs(this.weptConfig);


    // TODO 运行打包构建环境
  }
};
module.exports = WeptApplet;
