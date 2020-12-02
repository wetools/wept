'use strict';
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const components = (wxConfig, absoluteProjectPath, dist) => {
  const ignore = [];

  ignore.push(path.resolve(absoluteProjectPath, 'app.js'));
  ignore.push(path.resolve(absoluteProjectPath, 'app.json'));
  ignore.push(path.resolve(absoluteProjectPath, 'app.wxss'));
  ignore.push(path.resolve(absoluteProjectPath, 'sitemap.json'));
  ignore.push(path.resolve(absoluteProjectPath, 'project.config.json'));

  ignore.push(path.resolve(absoluteProjectPath, '**', '*.wxss'));

  ignore.push(path.resolve(absoluteProjectPath, '**', 'node_modules', '*'));
  ignore.push(path.resolve(absoluteProjectPath, '**', '.git', '*'));
  ignore.push(path.resolve(absoluteProjectPath, '**', '.gitignore'));
  ignore.push(path.resolve(absoluteProjectPath, '**', '.DS_Store'));

  ignore.push(path.resolve(dist, '**'));

  ignore.push(...wxConfig.pages.map((x) => path.resolve(absoluteProjectPath, `${x}.wxml`)));
  let files = glob.sync(path.resolve(absoluteProjectPath, '**'), {
    ignore,
    nodir: true
  });

  return files.filter(file => {
    const baseName = file.substring(0, file.length - 5);
    if (path.extname(file).toLowerCase() === '.wxml' && fs.existsSync(`${baseName}.js`) && fs.existsSync(`${baseName}.json`)) {
      return true;
    } else {
      return false;
    }
  }).map(file => file.substring(absoluteProjectPath.length + 1, file.length - 5));
};

module.exports = components;
