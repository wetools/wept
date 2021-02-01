'use strict';
const fs = require('fs');
const path = require('path');
const buildComponents= require('../build/components');
const buildDevtoolsConfig= require('../build/devToolsConfig');
const buildWxsList = require('./wxsList');
const buildNonWeChatFiles= require('./nonWeChatFiles');

const DEFAULT_WX_CONFIG = require('../constantFile/WX_CONFIG');

const buildWxProjectConfig = (absoluteProjectPath) => {
  const projectConfigJson = JSON.parse(fs.readFileSync(path.resolve(absoluteProjectPath, 'project.config.json'), {encoding: 'utf8'}));
  const wxProjectConfig = Object.assign({}, DEFAULT_WX_PROJECT_CONFIG);
  wxProjectConfig.setting = projectConfigJson.setting;
  return wxProjectConfig;
};

const buildWxConfig = (absoluteProjectPath) => {
  const appJson = JSON.parse(fs.readFileSync(path.resolve(absoluteProjectPath, 'app.json'), {encoding: 'utf8'}));
  const wxConfig = Object.assign({}, DEFAULT_WX_CONFIG);
  wxConfig.pages = appJson.pages;
  wxConfig.resizable = appJson.resizable;
  wxConfig.debug = appJson.debug;
  wxConfig.workers = appJson.workers;
  wxConfig.navigateToWeptAppletAppIdList = appJson.navigateToWeptAppletAppIdList;
  wxConfig.cloud = appJson.cloud;
  wxConfig.global = {window: appJson.window};
  wxConfig.networkTimeout = appJson.networkTimeout;
  wxConfig.tabBar = appJson.tabBar;
  wxConfig.page = {};
  appJson.pages.forEach(p => {
    wxConfig.page[`${p}.html`] = {window: JSON.parse(fs.readFileSync(path.resolve(absoluteProjectPath, `${p}.json`), {encoding: 'utf8'}))};
  });
  wxConfig.entryPagePath = `${appJson.pages[0]}.html`;
  wxConfig.appLaunchInfo = {
    scene: 1001,
    path: appJson.pages[0],
    query: {}
  };

  return wxConfig;
};

const buildPageDevtoolsConfig = () => {
  return {coverView: true, navigationBarHeight: 44, statusBarHeight: 20};
};


class WeptAppletConfig {
  constructor (options = {}) {
    this.appletSources = options.appletSources;
    this.compiledPath = options.compiledPath;

    this.wxProjectConfig = buildWxProjectConfig(this.appletSources);
    this.wxConfig = buildWxConfig(this.appletSources);

    this.components = buildComponents(this.wxConfig, this.appletSources, this.compiledPath);
    this.wxsList = buildWxsList(this.appletSources);

    this.devtoolsConfig = buildDevtoolsConfig();
    this.nonWeChatFiles = buildNonWeChatFiles(this.appletSources, this.compiledPath);
    this.pageDevtoolsConfig = buildPageDevtoolsConfig();


  }

  getWxConfigAsScript () {
    return `var __wxConfig=${JSON.stringify(this.wxConfig)}`;
  }

  getDevtoolsConfig () {
    return `var __devtoolsConfig=${JSON.stringify(this.devtoolsConfig)}`;
  }

  getPageDevtoolsConfigAsScript () {
    return `var __devtoolsConfig=${JSON.stringify(this.pageDevtoolsConfig)}`;
  }


  getInnerScript () {
    const resources = [].concat(this.wxConfig.pages).concat(this.components).sort();

    let innerScript = 'require("app.js");\n';
    innerScript += resources.reduce((acc, curr) => {
      const json = JSON.parse(fs.readFileSync(path.resolve(this.appletSources, `${curr}.json`), { encoding: 'utf8' }));
      acc += `var decodePathName = decodeURI("${curr}");\n`;
      acc += `__wxAppCode__[decodePathName + ".json"]=${JSON.stringify(json)};\n`;
      acc += `__wxAppCode__[decodePathName + ".wxml"]=$gwx("./" + decodePathName + ".wxml");\n`;
      return acc;
    }, '');

    innerScript += resources.reduce((acc, curr) => {
      acc += `var decodePathName = decodeURI("${curr}");\n`;
      acc += `__wxRoute = decodePathName;\n`;
      acc += `__wxRouteBegin = true;\n`;
      acc += `__wxAppCurrentFile__ = decodePathName + ".js";\n`;
      acc += `require(decodePathName + ".js");\n`;
      return acc;
    }, '');

    return innerScript;
  }


};

module.exports = WeptAppletConfig;
