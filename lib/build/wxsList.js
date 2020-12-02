const fs = require('fs');
const path = require('path');

const findWxsList = (dir, wxsList) => {
  const fdList = fs.readdirSync(dir);
  fdList.forEach(fd => {
    const fdPath = path.resolve(dir, fd);
    const stat = fs.statSync(fdPath);
    if (stat.isFile() && path.extname(fd).toLowerCase() === '.wxs') {
      wxsList.push(fdPath);
    } else if (stat.isDirectory()) {
      findWxsList(fdPath, wxsList);
    }
  });
};

const wxsList = (absoluteProjectPath) => {
  let wxsList = [];
  findWxsList(absoluteProjectPath, wxsList);
  return wxsList.map(file => `./${file.substring(absoluteProjectPath.length + 1)}`);
};

module.exports = wxsList;
