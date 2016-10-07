# Wept (Wechat app page development tool)

WEPT 是一个微信小程序页面开发辅助工具，它的目标是为小程序页面开发提供更流畅的开发体验。

它的后台使用 node 提供服务完全动态生成小程序，前端实现了 view 层、service
层和控制层之间的相关通讯逻辑。

## 主要特性

* wxml 文件修改后热更新（使用 diff patch），无需刷新页面
* css 文件修改后页面自动刷新 css，无需刷新页面
* javscript 文件修改后相应对象，无需刷新页面
* 可使用 Chrome 移动页面调试，可在移动端体验
* 支持系统 notification 提示构建错误
* 没有官方工具构建时莫名奇妙的 bug
* 无需连接网络即可使用

## 缺点

本工具暂时仅支持少数几个 SDK 提供的 API，所以仅适合开发页面结构和样式, 后续会提供 mock 接口方便开发时模拟返回。

另一个问题是没有开发者工具提供的 wxml、data 和 storage 面板，后续会考虑提供 Chrome 插件。

## 安装方法

下载安装 [nodejs](https://nodejs.org), 请确保 node 版本 `> 6.0`， 执行：

    npm install wept -g

## 使用方法

到项目根目录下执行命令：

    wept -p 3000

使用 Chrome 访问 `http://localhost:3000` 打开开发者工具后启用移动页面调试模式（Mac 下快捷键为 `⌘ ⇧ M`）

## 可使用的 API 方法

* request 方法
* WebSocket 相关方法
* 页面导航相关方法
* 导航条相关方法
* 动画绘图相关方法
* 


## TODO

* 支持 tabbar 模块
*

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
