'use strict';
const fs = require('fs');
const path = require('path');
const buildComponents= require('../build/components');
const buildWxsList = require('./build/wxsList');


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


class WeptAppletConfig {
  constructor (options = {}) {
    this.appletSources = options.appletSources;
    this.compiledPath = options.compiledPath;
    this.wxProjectConfig = buildWxProjectConfig(this.appletSources);
    this.wxConfig = buildWxConfig(this.appletSources);

    this.components = buildComponents(this.wxConfig, this.appletSources, this.compiledPath);
    this.wxsList = buildWxsList(this.appletSources);

  }

  getWxConfigAsScript () {
    return `var __wxConfig=${JSON.stringify(this.wxConfig)}`;
  }


};

module.exports = WeptAppletConfig;
