# Wept (Wechat app page development tool)

WEPT 是一个微信小程序页面开发工具，它的目标是为小程序开发提供更流畅的开发体验。

它的后台使用 node 提供服务完全动态生成小程序，前端实现了 view 层、service
层和控制层之间的相关通讯逻辑。

该项目暂时处于开发初级阶段，暂定本周内发布 0.1 稳定版本。

## 主要特性

* wxml 文件修改后自动热更新（使用 diff patch），无需刷新页面
* javscript 文件修改后自动热更新，无需刷新页面
* wxss 文件修改后页面自动刷新 css，无需刷新页面
* 可使用 Chrome 移动页面调试，可在移动端体验
* 支持系统 notification 提示构建错误
* 没有官方工具构建时莫名奇妙的 bug
* 无需连网络即可使用

## 缺点

本工具暂时仅支持部分 SDK 提供的 API，所以比较适合开发页面结构和样式, 后续会完善这一部分与官方工具一致。

另一个不足是没有开发者工具提供的 wxml、data 和 storage 面板，后续会考虑提供 Chrome 插件。

## 安装 & 使用方法

下载安装 [nodejs](https://nodejs.org), 请确保 node 版本 `> 6.0`， 执行：

    npm install wept -g

到小程序项目根目录下执行命令：

    wept

使用 Chrome 访问 `http://localhost:3000` 打开开发者工具后启用移动页面调试模式（Mac 下快捷键为 `⌘ ⇧ M`）

## API 接口实现状态

* ✓ app.json window 设置
* ✓ app.json tabbar 设置
* ✓ 微信登录：目前返回同官方工具无 appid 状态一致，为模拟返回
* ✓ 获取用户信息接口：返回测试用数据
* ✗ 发起支付：同官方工具无 appid 状态，无法使用
* ✓ 设置界面标题
* ✓ 标题栏加载动画
* ✓ 页面跳转
* ✓ 下拉刷新
* ✓ 创建动画
* ✓ 创建 Canvas 绘画
* ✓ 获取手机网络状态：默认返回 `WIFI`
* ✓ 获取手机系统信息：同官方工具，返回为模拟返回
* ✓ 监听重力感应数据：支持 Safari mobile 等移动浏览器调试 (官方工具不支持)
* ✓ 监听罗盘数据：支持 Safari mobile 等移动浏览器调试 (官方工具不支持)
* ✓ request 发送请求
* ✓ websocket 接口
* ✓ 上传文件：WIP
* ✓ 选择/预览图片：WIP
* ✓ 录音：WIP
* ✓ 背景音乐：暂不支持
* ✓ 保存文件：WIP
* ✓ 获取当前位置
* ✓ 使用原生地图查看位置：没有官方工具仅显示当前位置的 bug
* ✓ storage 同步 API
* ✓ storage 异步 API

## TODO

* 支持页面 pull to refresh
* 支持针对页面的 json 配置
* 支持更多的 API
* wxml，storage，appData 面板支持
* 可视化代理模式支持

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
