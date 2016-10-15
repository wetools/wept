# Wept (Wechat app page development tool)

WEPT 是一个微信小程序实时开发环境，它的目标是为小程序开发提供高效、稳定、友好、无限制的运行环境。

项目后台使用 node 提供服务完全动态生成小程序，前端实现了 view 层、service
层和控制层之间的相关通讯逻辑。

项目已支持几乎所有小程序 API，已测试可在 Mac 和 Win7 上正常使用。

详细原理介绍参考：

* [微信小程序架构分析（上）](https://zhuanlan.zhihu.com/p/22754296)
* [微信小程序架构分析（中）](https://zhuanlan.zhihu.com/p/22765476)
* [微信小程序架构分析（下）](https://zhuanlan.zhihu.com/p/22932309)


[更新日志](https://github.com/chemzqm/wept/blob/master/history.md)

## 主要特性

* 支持 wxml, wxss, javascript 和页面 json 自动重加载
* 使用系统 notification 更早的提示构建和请求错误
* 使用后台转发 XMLHttpRequest 请求，无需配置 CORS
* 没有官方工具构建时莫名奇妙的 bug
* Mac 上启动后执行 apple script 打开 Chrome 到当前页面
* 可使用 Chrome 移动页面调试，可在移动端体验
* 无需网络连接

## 安装 & 使用方法

下载安装 [nodejs](https://nodejs.org), 请确保 node 版本 `> 6.0`， 执行：

    npm install wept -g

到小程序项目根目录下执行命令：

    wept

使用 Chrome 访问 `http://localhost:3000` 打开开发者工具后启用移动页面调试模式（Mac 下快捷键为 `⌘ ⇧ M`）

使用 `wept -h` 命令查看更多选项

## API 接口实现状态

* ✓ app.json window 设置
* ✓ app.json tabbar 设置
* ✓ 微信登录：目前返回同官方工具无 appid 状态一致，为模拟返回
* ✓ 获取用户信息接口：返回测试用数据
* ✗ 发起支付：同官方工具无 appid 状态，无法使用
* ✓ 设置界面标题
* ✓ 标题栏加载动画
* ✓ 页面跳转
* ✓ 下拉刷新 onPullDownRefresh & stopPullDownRefresh
* ✓ 创建动画
* ✓ 创建 Canvas 绘画
* ✓ 获取手机网络状态：默认返回 `WIFI`
* ✓ 获取手机系统信息：同官方工具，返回为模拟返回
* ✓ 监听重力感应数据：支持 Safari mobile 等移动浏览器调试
* ✓ 监听罗盘数据：支持 Safari mobile 等移动浏览器调试
* ✓ request 请求接口
* ✓ websocket 接口
* ✓ 上传、下载文件
* ✓ 保存文件
* ✓ 选择/预览图片
* ✓ 选择视频
* ✓ 录音 API
* ✓ 音频播放控制
* ✓ 背景音乐控制
* ✓ 获取当前位置
* ✓ 使用原生地图查看位置
* ✓ storage 同步 API
* ✓ storage 异步 API

## TODO

* 支持图片预览
* 支持页面 pull to refresh
* wxml，storage，appData 面板支持

## 感谢

[匠物](https://www.jiangwoo.com/) 对于本工具开发给予的大力支持❤️

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
