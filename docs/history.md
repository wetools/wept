## 0.9.0

* 升级官方依赖到 140900
* 修复 tabbar 页面 redirectTo 后无法显示的 bug [#84](https://github.com/chemzqm/wept/issues/84)

## 0.8.1

* 修复了 redirectTo、navigateTo 回调函数不起作用 bug [#82](https://github.com/chemzqm/wept/issues/82)
* 移除了多余的 babel-polyfill 模块依赖
* 升级 babel 相关模块到最新版

## 0.8.0

* 页面栈到达 5 个改为显示警告，不报错
* 使用 stack-source-map 修正 Chrome 中的错误堆栈信息
* 改进代理请求实现，便于 Chrome 下查看请求
* 重做了 wxml 刷新，使用页面重载，确保事件正确绑定

## 0.7.4

* 修复无法使用 switchTab 跳转不存在 tab 页的 bug

## 0.7.3

* 修复文件修改后自动刷新加载缓慢问题

## 0.7.2

* 支持 nomap 设置，禁止下载 map sdk
* 修复 downloadFile 缓存设置覆盖问题

## 0.7.1

* 修复 windows 上白屏幕问题

## 0.7.0

* 同步到微信 1 月 5 日版本： 130400
* BUG 修复：
  * `wx.canvasToTempFilePath` 无法正确保存图片
  * wxml 中支持 import/include 不使用 wxml 后缀
  * `wx.uploadFile` 返回 data 为服务端返回字符串
  * 切换为地图页面时显示 header

## 0.7.0-beta

* 使用 122100 官方代码，支持除 scanCode 外 API 调用

## 0.6.9

* 支持代理图片，支持代理时添加自定义 headers， 参考 [##61](https://github.com/chemzqm/wept/pull/61)

## 0.6.8

* 顶层菜单支持点击事件，方便 vscode 用户

## 0.6.7

* 使用 window.innerWidth 计算 rpx，修复做为 iframe 时渲染错误的 bug

## 0.6.6

* 添加了 Linux 支持，需要 wine 命令在当前 shell 下可用

## 0.6.5

* 修复绝对路径 import 无法正常工作的 bug

## 0.6.4

* 修复 import 解析 join 两次导致路径错误的 bug ＃54
* wxml 中 import 和 include 支持递归解析

## 0.6.2

* 修复无法支持递推 css import 解析的 bug

## 0.6.1

* 修复 babel 选项不起作用的 bug

## 0.6.0

* 支持设置 wept.json 关闭 babel 编译，默认开启

## 0.5.9
* 支持 DatePicker 和 TimePicker， 不支持 range 选项

## 0.5.8

重新实现了基础版的 picker

## 0.5.7

* 修复请求无法正确发出的 bug

## 0.5.6

* 修复请求无法正确发出的 bug

## 0.5.5

* 使用 112200 版本代码
* 去除了请求时验证

## 0.5.4

* 修复 undefined 错误提示

## 0.5.3

* 使用 in-publish 防止安装时运行 prepublish 脚本

## 0.5.2

* 改进 updateNotifier 使用方式

## 0.5.1

* 修复编译文件超过 200k 报错

## 0.5.0

* 添加 wxss 的 sourcemap 支持

## 0.4.5

* 修复 app.wxss 无法自动刷新
* 重做刷新方式，便于后期升级
* 支持 resize 发生后自动加载新的 css
* 启动服务时自动编译所有文件，尽早反馈错误

## 0.4.4

* 修复 wxss 中 @import 正则解析只能提取一次的 bug

## 0.4.3

* 添加了 import 方式引入 wxss 文件热更新支持
* 添加了可用端口自动查找功能，从 3000 开始

## 0.4.2

* 支持使用 `wept.json` 文件配置代理

## 0.4.1

* 添加 wxss import 支持，修复 ##43

## 0.4.0

* 使用最新版 103100 service 和 view 层代码，实现了全部新的接口
* 实现新的 wxss 生成方式
* 实现了 `wx.getSavedFileList` `wx.getSavedFileInfo` `wx.removeSavedFile` `wx.openDocument`
* 实现了 `wx.removeStorage` `wx.removeStorageSync` `wx.getStorageInfo` `wx.getStorageInfoSync`
* 实现了 `wx.showToast` `wx.showModal` `wx.hideModal` `wx.showActionSheet`
* 实现了 `wx.chooseLocation` `wx.getImageInfo` `wx.getSystemInfoSync` `wx.makePhoneCall`
* 实现了 `wx.canvasToTempFilePath`， 该 API 官方工具无法使用
* 实现了 `wx.checkSession`
* 实现了 `wx.navigateBack` 支持 delta 参数，支持多层级返回
* 实现了 `tabBar` 的 position 选项支持，支持使用 `top`
* 改进： `wx.navigateTo` 超过 5 层页面弹出错误提醒
* 改进： 返回首页功能，支持使用 history API 跳转
* 修复： `navigateBack` 调用没有清除对应 appData 的 bug

## 0.3.8

* 构建时忽略 `node_modules` 下文件

## 0.3.7

* 修复无法解析 wxml include 的 bug

## 0.3.6

* 重做 storage 面板功能，支持修改
* 修复 babel-runtime 模块找不到

## 0.3.5

* 支持 storage 面板 Chrome 开发者工具扩展

## 0.3.4

* 支持 appData 面板 Chrome 开发者工具扩展

## 0.3.3

* 移动前端依赖到 devDependencies

## 0.3.2

* 使用 updateNotifier 提示用户升级

## 0.3.1

* 添加 二维码扫码访问功能

## 0.3.0

* 添加 支持刷新后导航到之前页面
* 添加 支持 app.json 中 navagation 配置和 tabBar 配置热加载
* 添加 使用 babel es2015 编译小程序 JavaScript
* 添加 支持小程序根目录做为 wept 命令参数
* 添加 静态文件 http 缓存支持，降低加载等待时间
* 添加 使用 growl 桌面提醒文件重加载
* 修复 绝对路径的 wxml template 无法引入 bug ##26
* 修复 wcc 和 wcsc 路径上有空格时命令无法执行
* 改进 如果没有返回则显示 home 按钮方便刷新
* 改进 打包并且增量编译 service 层代码
* 改进 使用 gulp 执行前后端代码构建任务
* 改进 高亮显示 app.json 找不到提醒
* 修改 Mac 下使用 -o 参数时才执行 Chrome 相关脚本打开页面
* 修改 右上角菜单的刷新改为返回首页，刷新当前页使用浏览器刷新即可

## 0.2.9

* 修复 windows 上解析 wxml import 错误 ##15

## 0.2.8

* 修复 底部 tabbar 默认高度遮挡下方操作 ##12
* 修复 windows 下 chokidar 给出路径为反斜线导致路径判定错误
* 修复 wept 命令 -V 和 -h 也需要到项目目录下才能执行
* 改进 Chrome applescript 启动脚本为刷新页面到根目录

## 0.2.7

* 默认设置 debug 为 false，不输出调试信息（与官方一致）
* 重做了后端请求代理模块，支持豆瓣 https API

## 0.2.6

* 部分修复 https 请求 ##9，默认请求 method 为 GET （官方代码有误，根据文档默认应该是 GET）

## 0.2.5

* 修复 wx.request 报错：域名不合法
* 非页面模块 javscript 修改后自动刷新整个页面，而不是没响应
* 使用 babel 转换后端代码兼容 es5，支持 node 低版本

## 0.2.4

* 改进了 wx.getSystemInfo API 的返回，尽可能返回真实数据

## 0.2.3

* 修复 wxml 无法热更新 bug
* 页面 js 更新后执行页面 onReady 回调

## 0.2.2

* 支持支付接口（模拟返回）

## 0.2.1

* 支持图片预览 API

## 0.2.0

* 使用官方 101400 view 和 service 层代码
* 支持下拉刷新两个接口

## 0.1.3

* 使用 commander 支持 -V 和 -p 命令行选项

## 0.1.2

* 更多的编译时错误提示
* 使用 actionsheet 替换 refresh 按钮，支持刷新、清除数据缓存和问题反馈功能

## 0.1.1

* 修复了 storage API 无法正确获取数据类型的 bug

