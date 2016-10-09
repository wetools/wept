# Wept (Wechat app page development tool)

WEPT 是一个微信小程序页面开发工具，它的目标是为小程序开发提供更流畅的开发体验。

它的后台使用 node 提供服务完全动态生成小程序，前端实现了 view 层、service
层和控制层之间的相关通讯逻辑。

## 主要特性

* wxml 文件修改后热更新（使用 diff patch），无需刷新页面
* css 文件修改后页面自动刷新 css，无需刷新页面
* javscript 文件修改后重加载相应页面，无需刷新页面
* 可使用 Chrome 移动页面调试，可在移动端体验
* 支持系统 notification 提示构建错误
* 没有官方工具构建时莫名奇妙的 bug
* 无需连网络即可使用

## 缺点

本工具暂时仅支持部分 SDK 提供的 API，所以比较适合开发页面结构和样式, 后续会完善这一部分与官方工具一致。

另一个不足是没有开发者工具提供的 wxml、data 和 storage 面板，后续会考虑提供 Chrome 插件。

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
* 页面导航条相关配置和方法
* 导航条相关方法
* 动画绘图相关方法
* tabbar 相关配置

## API 接口实现状态

* ✓ app.json window 设置：已支持
* ✓ app.json tabbar 设置：已支持
* ✓ 微信登录：目前返回同官方开发者工具无 appid 状态一致，为模拟返回
* ✓ 获取用户信息接口：返回测试用数据
* ✗ 发起支付：同官方开发者工具无 appid 状态，无法使用
* ✓ 设置界面标题：已支持
* ✓ 标题栏加载动画：已支持
* ✓ 页面跳转：已支持
* ✓ 下拉刷新：可调用，同官方开发者工具无任何效果
* ✓ 创建动画：已支持
* ✓ 创建 Canvas 绘画：已支持
* ✓ 获取手机网络状态：
* ✓ 获取手机系统信息：
* ✗ 监听重力感应数据：同官方开发者工具，不支持
* ✗ 监听罗盘数据：同官方开发者工具，不支持
* ✓ request 发送请求：已支持
* ✓ websocket：已支持
* ✓ 上传文件：
* ✓ 选择/预览图片：
* ✓ 录音：
* ✓ 背景音乐
* ✗ 保存文件：
* ✓ 获取当前位置：
* ✓ 使用原生地图查看位置：
* ✓ 获取数据：
* ✓ 存储数据：
* ✓ 清理数据：

## TODO

* 支持更多的 API
* wxml，storage，appData Chrome 插件支持
* 可视化代理模式支持
* Mock API 支持

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
