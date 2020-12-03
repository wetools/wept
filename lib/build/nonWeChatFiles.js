'use strict';
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const nonWeChatFiles = function (absoluteProjectPath, dist) {
    const ignore = [];
    ignore.push(path.resolve(absoluteProjectPath, 'app.js'));
    ignore.push(path.resolve(absoluteProjectPath, 'app.json'));
    ignore.push(path.resolve(absoluteProjectPath, 'app.wxss'));
    ignore.push(path.resolve(absoluteProjectPath, 'sitemap.json'));
    ignore.push(path.resolve(absoluteProjectPath, 'project.config.json'));

    ignore.push(path.resolve(absoluteProjectPath, '**', '*.js'));
    ignore.push(path.resolve(absoluteProjectPath, '**', '*.wxml'));
    ignore.push(path.resolve(absoluteProjectPath, '**', '*.wxss'));

    ignore.push(path.resolve(absoluteProjectPath, '**', 'node_modules', '*'));
    ignore.push(path.resolve(absoluteProjectPath, '**', '.git', '*'));
    ignore.push(path.resolve(absoluteProjectPath, '**', '.gitignore'));
    ignore.push(path.resolve(absoluteProjectPath, '**', '.DS_Store'));

    ignore.push(path.resolve(dist, '**'));
    let files = glob.sync(path.resolve(absoluteProjectPath, '**'), {
        ignore,
        nodir: true
    });

    return files.filter(file => {
        if (path.extname(file).toLowerCase() !== '.json') {
            return true;
        } else {
            const baseName = file.substring(0, file.length - 5);
            if (fs.existsSync(`${baseName}.wxml`)) {
                return false;
            } else {
                return true;
            }
        }
    }).map(file => path.relative(absoluteProjectPath, file));
};

module.exports = nonWeChatFiles;
