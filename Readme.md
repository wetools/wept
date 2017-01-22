# WEPT (Wechat app page development tool)

[![Join the chat at https://gitter.im/we-wept/Lobby](https://badges.gitter.im/we-wept/Lobby.svg)](https://gitter.im/we-wept/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![NPM version](https://img.shields.io/npm/v/wept.svg)](https://www.npmjs.com/package/wept)
[![Average time to resolve an issue](http://isitmaintained.com/badge/resolution/chemzqm/wept.svg)](http://isitmaintained.com/project/chemzqm/wept "Average time to resolve an issue")
[![Percentage of issues still open](http://isitmaintained.com/badge/open/chemzqm/wept.svg)](http://isitmaintained.com/project/chemzqm/wept "Percentage of issues still open")

WEPT 是一个微信小程序实时开发环境，它的目标是为小程序开发提供高效、稳定、友好、无限制的运行环境。

项目后台使用 node 提供服务完全动态生成小程序，前端实现了 view 层、service 层和控制层之间的相关通讯逻辑。

支持 Mac, Window 以及 Linux

* [详细文档](https://chemzqm.github.io/wept/#/home)
* [更新日志](https://chemzqm.github.io/wept/#/history)
* [API 支持情况](https://chemzqm.github.io/wept/#/api)
* [小技巧](https://chemzqm.github.io/wept/#/tips)
* [相关工具](https://chemzqm.github.io/wept/#/tools)

## 主要特性

* 支持 wxml, wxss, javascript 和 json 保存后热更新
* 支持系统 notification 更早提示构建和请求错误
* 使用后台转发 XMLHttpRequest 请求，无需配置 CORS, 可 [配置代理](https://github.com/chemzqm/wept/wiki/wept-%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6)
* 支持 [所有小程序公开 API](https://github.com/chemzqm/wept/wiki/API-%E6%8E%A5%E5%8F%A3%E5%AE%9E%E7%8E%B0%E7%8A%B6%E6%80%81)
* 可使用 Chrome 移动页面调试，可在移动端体验
* 支持 appData 和 storage 面板，需下载 [Chrome 插件](https://chrome.google.com/webstore/detail/wechat-devtools-extension/cmpjfobofbhbghjodehbohchlghacmll)

![one](https://cloud.githubusercontent.com/assets/251450/19413094/f46273d6-9356-11e6-9216-06ef2e2e3888.gif)

## 安装 & 使用方法


    npm i wept -g

如安装较慢，可使用 [cnpm](http://npm.taobao.org/)

到小程序项目根目录下执行命令：

    wept

使用 Chrome 访问 `http://localhost:3000` 打开开发者工具后启用移动页面调试模式（Mac 下快捷键为 `⌘ ⇧ M`）

## 感谢

[匠物](https://www.jiangwoo.com/) 对于本工具开发给予的大力支持❤️

* [lizzyliuye](https://github.com/lizzyliuye) 帮忙测试反馈
* [davedavehong](https://github.com/davedavehong) 反馈 windows 上的严重 bug
* [f111fei](https://github.com/f111fei) 贡献 PR

## LICENSE

Copyright 2016 chemzqm@gmail.com

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
