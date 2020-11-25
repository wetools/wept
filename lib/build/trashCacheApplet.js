'use strict';
const fs = require('fs');
const path = require('path');
const trash = require('trash');

const trashCacheApplet = async (weptConfig) => {
  const dir = weptConfig.compiledPath
  if (!path.isAbsolute(dir)) throw new Error(`小程序缓存编译包 ${dir} 必须为绝对路径`);
  if (!fs.existsSync(dir)) return;
  await trash(dir);
};
module.exports = trashCacheApplet;
