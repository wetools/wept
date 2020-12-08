# WEPT (Wechat app page development tool)

[![Join the chat at https://gitter.im/we-wept/Lobby](https://badges.gitter.im/we-wept/Lobby.svg)](https://gitter.im/we-wept/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![NPM version](https://img.shields.io/npm/v/wept.svg)](https://www.npmjs.com/package/wept)
[![Average time to resolve an issue](http://isitmaintained.com/badge/resolution/chemzqm/wept.svg)](http://isitmaintained.com/project/chemzqm/wept "Average time to resolve an issue")
[![Percentage of issues still open](http://isitmaintained.com/badge/open/chemzqm/wept.svg)](http://isitmaintained.com/project/chemzqm/wept "Percentage of issues still open")

**由于chemzqm不在参与维护，后续维护人员更替**

**本项目从最近到后续即将升级WEPT2.0版本，支持运行微信小程序 小游戏基础库2.9后版本功能，同时支持实现ios Android三端统一运行环境，欢迎大家持续关注**



WEPT 是一个微信小程序实时开发环境，它的目标是为小程序开发提供高效、稳定、友好、无限制的运行环境。

项目后台使用 node 提供服务完全动态生成小程序，前端实现了 view 层、service 层和控制层之间的相关通讯逻辑。

支持iOS Android Mac, Window 以及 Linux 

## 文档与工具
### web
+ [实现web微信小程序运行环境系列文档解析](https://github.com/gongmw/blog/issues)

### ios
* [逆向WeApp-准备工作](https://github.com/wetools/wept/blob/master/docs/ios/逆向WeApp准备工作.md)
+ [逆向研究ios端微信小程序框架-1.窥探service的实现](https://github.com/lionvoom/WeAppCrack)
### android


## 浏览器效果预览
![weptwdeb](https://applet-doc.oss-cn-zhangjiakou.aliyuncs.com/jingo/weptweb.gif)



## IOS效果预览

![weptios](https://applet-doc.oss-cn-zhangjiakou.aliyuncs.com/jingo/weptios.gif)

## 安装 & 使用方法
### Web

    npm i wept -g

如安装较慢，可使用 [cnpm](http://npm.taobao.org/)

到小程序项目根目录下执行命令：

    cd case && wept

使用 Chrome 访问 `http://localhost:3000` 打开开发者工具后启用移动页面调试模式（Mac 下快捷键为 `⌘ ⇧ M`）


### iOS
```js
cd ios
```

```js
pod install
```

## 感谢

[匠物](https://www.jiangwoo.com/) 对于本工具开发给予的大力支持❤️

* [lizzyliuye](https://github.com/lizzyliuye) 帮忙测试反馈
* [davedavehong](https://github.com/davedavehong) 反馈 windows 上的严重 bug
* [f111fei](https://github.com/f111fei) 贡献 PR

## LICENSE

Copyright 2020 gongmw08@163.com

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
