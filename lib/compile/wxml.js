'use strict';
const path = require('path');
const _ = require('lodash');
const childProcess = require('child_process');
const isWin = /^win/.test(process.platform);
const isMac = /^darwin/.test(process.platform);
const wccMac = path.resolve(__dirname, '../../bin', 'wcc');
const wccWin = wccMac + '.exe';
const wccLinux = 'wine ' + wccWin;
const wcc = isWin ? wccWin : isMac ? wccMac : wccLinux;

let componentItems = null;
let wxmls = null;

const addComponents = (items, projectPath, relPath) => {
  relPath = relPath.replace(/\\/gm, '/');
  if (items[relPath] != null) return;
  let windowConfig;
  let jsonfile = path.join(projectPath, relPath).replace(/\.wxml$/, '.json');
  if (fs.existsSync(jsonfile)) {
    windowConfig = JSON.parse(fs.readFileSync(jsonfile, {encoding: 'utf8'}));
  } else {
    windowConfig = {};
  }
  let {usingComponents, component} = windowConfig;
  if (component) {
    items[relPath] = [`./${relPath}`, 0];
  }
  if (usingComponents) {
    let keys = Object.keys(usingComponents);
    if (keys.length) {
      items[relPath] = [`./${relPath}`, keys.length, ...keys];
      let dir = path.dirname(path.join(projectPath, relPath));
      let vals = Object.values(usingComponents);
      for (let val of vals) {
        let filepath = path.resolve(dir, val);
        if (!filepath.endsWith('.wxml')) {
          filepath += '.wxml';
        }
        if (fs.existsSync(filepath)) {
          let rel = path.relative(projectPath, filepath);
          addComponents(items, projectPath, rel);
        }
      }
    } else {
      items[relPath] = [`./${relPath}`, 0];
    }
  }
};

const buildWxmlJoinCode = (absoluteProjectPath, wxConfig, components = []) => {
  let pages = Object.keys(wxConfig.page).map(p => p.replace(/\.html$/, '.wxml'));
  pages = pages.concat(components.map(item => `${item}.wxml`));

  if (componentItems == null) {
    componentItems = {};
    for (let page of pages) {
      addComponents(componentItems, absoluteProjectPath, page);
    }
  }
  wxmls = pages.map(s => `./${s}`);
  let arr = Object.values(componentItems);
  let componentArgs = [];

  arr.sort((a, b) => a[1] - b[1]);
  let len = arr.length;
  let split = `>_<${Math.random().toString().slice(2, 6)}`;
  let componentList = arr.reduce((p, c) => {
    return p.concat(c);
  }, [len]);
  componentArgs = [componentList.join(split), '--split', split];
  wxmls.push(...arr.map(o => o[0]));

  return {
    componentArgs,
    wxmls
  };
};

const generateWxmlCode = function (absoluteProjectPath, wxConfig, templateWxmls = [], wxsList = [], components = [],isService) {
  const wxmlFiles = buildWxmlJoinCode(absoluteProjectPath, wxConfig, components);
  const currentDir = process.cwd();
  process.chdir(absoluteProjectPath);
  const args = ['-d', '-ds', isService ? '-xc' : '-cc', ...wxmlFiles.componentArgs, ..._.uniq(wxmlFiles.wxmls), ...templateWxmls, ...wxsList];
  const wxmlCode = childProcess.execFileSync(wcc, args, {encoding: 'utf8'});
  process.chdir(currentDir);
  return wxmlCode;
};

module.exports = generateAppWxmlCode;
