
'use strict';
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const logs = require('../logs');

const compileAppService = (weptConfig) => {
  logs.info('=====开始构建逻辑层页面=====');
  logs.info('构建文件： service.html');

  const data = {
    __wxConfig: weptConfig.getWxConfigAsScript(),
    __devtoolsConfig: weptConfig.getDevtoolsConfig(),
    links: JSON.stringify(weptConfig.links),
    innerScript: weptConfig.getInnerScript(),
    wxmlCode: weptConfig.getWxmlCode(true),
  };


  const targetFile = path.resolve(weptConfig.compiledPath, 'appservice.html');
  const template = fs.readFileSync(path.resolve(__dirname, '..', '..', 'template', 'service.html'), {encoding: 'utf8'});
  fs.writeFileSync(targetFile, ejs.render(template, data), {encoding: 'utf8'});
  logs.success(`构建成功=====`);
};

module.exports = compileAppService;
