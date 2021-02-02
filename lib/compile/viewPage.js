'use strict';
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const logs = require('../logs');

const _buildPageCode = (weptAppletConfiguration, page) => {
  logs.info(`构建文件： ${page}.html`);
  const targetFile = path.resolve(weptAppletConfiguration.compiledPath, `${page}.html`);
  const targetDir = path.dirname(targetFile);

  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, {recursive: true});
  fs.writeFileSync(targetFile, weptAppletConfiguration.getPageHtml(page), {encoding: 'utf8'});
};

const _buildTemplate = (weptAppletConfiguration) => {

  const targetFile = path.resolve(weptAppletConfiguration.compiledPath, `view.html`);
  const targetDir = path.dirname(targetFile);
  
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, {recursive: true});

  const data = {
    __wxConfig: weptAppletConfiguration.getWxConfigAsScript(),
    __devtoolsConfig: weptAppletConfiguration.getPageDevtoolsConfigAsScript(),
    baseUrl: "/" || '',
    wxmlCode: weptAppletConfiguration.getWxmlCode(false),
  };

  const template = fs.readFileSync(path.resolve(__dirname, '..', '..', 'template', 'view.html'), {encoding: 'utf8'});
  fs.writeFileSync(targetFile, ejs.render(template, data), {encoding: 'utf8'});
};

const viewPage = (weptAppletConfiguration) => {
  logs.info(`=====开始构建视图层页面=====`);
  _buildTemplate(weptAppletConfiguration);

  weptAppletConfiguration.wxConfig.pages.forEach(page => {
    _buildPageCode(weptAppletConfiguration, page);
  });
  logs.success(`构建成功=====`);
};

module.exports = viewPage;
