'use strict';
const os = require('os');
const fs = require('fs');
const path = require('path');
const babel = require('babel-core');
const logs = require('../logs');

const _compileJS = (projectConfig, sourceFile, targetFile, moduleName) => {
  logger.info(`转换文件： ${moduleName}`);
  const targetDir = path.dirname(targetFile);
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, {recursive: true});
  if (os.platform() === 'win32') moduleName = moduleName.replace(/\\/gm, '/');
  let content = `define("${moduleName}", `;
  content += `function(require, module, exports, window,document,frames,self,location,navigator,localStorage,history,Caches,screen,alert,confirm,prompt,fetch,XMLHttpRequest,WebSocket,webkit,WeixinJSCore,Reporter,print,URL,DOMParser,upload,preview,build,showDecryptedInfo,syncMessage,checkProxy,showSystemInfo,openVendor,openToolsLog,showRequestInfo,help,showDebugInfoTable,closeDebug,showDebugInfo,__global,WeixinJSBridge){\n`;

  if (projectConfig.setting.es6 && fs.statSync(sourceFile).size / 1024 < 500) {
    content += babel.transformFileSync(sourceFile, {presets: ['babel-preset-env', 'babel-preset-stage-0'].map(require.resolve)}).code;
  } else {
    content += fs.readFileSync(path.resolve(sourceFile), {encoding: 'utf8'});
  }
  content += '\n});';

  fs.writeFileSync(targetFile, content, {encoding: 'utf8'});
};

const compileAMDModules = (weptConfig) => {
    logs.info(`===== 开始将js文件转换AMD格式`);
  weptConfig.links.forEach(link => {
    _compileJS(weptConfig.wxProjectConfig, path.resolve(weptConfig.appletSources, link), path.resolve(weptConfig.compiledPath, link), link);
  });
  logs.success(`转换成功=====`);
};

module.exports = AMDJs;
