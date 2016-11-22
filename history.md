# 0.5.5

* 使用 112200 版本代码
* 去除了请求时验证

# 0.5.4

* 修复 undefined 错误提示

# 0.5.3

* 使用 in-publish 防止安装时运行 prepublish 脚本

# 0.5.2

* 改进 updateNotifier 使用方式

# 0.5.1

* 修复编译文件超过 200k 报错

# 0.5.0

* 添加 wxss 的 sourcemap 支持

# 0.4.5

* 修复 app.wxss 无法自动刷新
* 重做刷新方式，便于后期升级
* 支持 resize 发生后自动加载新的 css
* 启动服务时自动编译所有文件，尽早反馈错误

# 0.4.4

* 修复 wxss 中 @import 正则解析只能提取一次的 bug

# 0.4.3

* 添加了 import 方式引入 wxss 文件热更新支持
* 添加了可用端口自动查找功能，从 3000 开始

# 0.4.2

* 支持使用 `wept.json` 文件配置代理

# 0.4.1

* 添加 wxss import 支持，修复 #43

# 0.4.0

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

# 0.3.8

* 构建时忽略 `node_modules` 下文件

# 0.3.7

* 修复无法解析 wxml include 的 bug

# 0.3.6

* 重做 storage 面板功能，支持修改
* 修复 babel-runtime 模块找不到

# 0.3.5

* 支持 storage 面板 Chrome 开发者工具扩展

# 0.3.4

* 支持 appData 面板 Chrome 开发者工具扩展

# 0.3.3

* 移动前端依赖到 devDependencies

# 0.3.2

* 使用 updateNotifier 提示用户升级

# 0.3.1

* 添加 二维码扫码访问功能

# 0.3.0

* 添加 支持刷新后导航到之前页面
* 添加 支持 app.json 中 navagation 配置和 tabBar 配置热加载
* 添加 使用 babel es2015 编译小程序 JavaScript
* 添加 支持小程序根目录做为 wept 命令参数
* 添加 静态文件 http 缓存支持，降低加载等待时间
* 添加 使用 growl 桌面提醒文件重加载
* 修复 绝对路径的 wxml template 无法引入 bug #26
* 修复 wcc 和 wcsc 路径上有空格时命令无法执行
* 改进 如果没有返回则显示 home 按钮方便刷新
* 改进 打包并且增量编译 service 层代码
* 改进 使用 gulp 执行前后端代码构建任务
* 改进 高亮显示 app.json 找不到提醒
* 修改 Mac 下使用 -o 参数时才执行 Chrome 相关脚本打开页面
* 修改 右上角菜单的刷新改为返回首页，刷新当前页使用浏览器刷新即可

# 0.2.9

* 修复 windows 上解析 wxml import 错误 #15

# 0.2.8

* 修复 底部 tabbar 默认高度遮挡下方操作 #12
* 修复 windows 下 chokidar 给出路径为反斜线导致路径判定错误
* 修复 wept 命令 -V 和 -h 也需要到项目目录下才能执行
* 改进 Chrome applescript 启动脚本为刷新页面到根目录

# 0.2.7

* 默认设置 debug 为 false，不输出调试信息（与官方一致）
* 重做了后端请求代理模块，支持豆瓣 https API

# 0.2.6

* 部分修复 https 请求 #9，默认请求 method 为 GET （官方代码有误，根据文档默认应该是 GET）

# 0.2.5

* 修复 wx.request 报错：域名不合法
* 非页面模块 javscript 修改后自动刷新整个页面，而不是没响应
* 使用 babel 转换后端代码兼容 es5，支持 node 低版本

# 0.2.4

* 改进了 wx.getSystemInfo API 的返回，尽可能返回真实数据

# 0.2.3

* 修复 wxml 无法热更新 bug
* 页面 js 更新后执行页面 onReady 回调

# 0.2.2

* 支持支付接口（模拟返回）

# 0.2.1

* 支持图片预览 API

# 0.2.0

* 使用官方 101400 view 和 service 层代码
* 支持下拉刷新两个接口

# 0.1.3

* 使用 commander 支持 -V 和 -p 命令行选项

# 0.1.2

* 更多的编译时错误提示
* 使用 actionsheet 替换 refresh 按钮，支持刷新、清除数据缓存和问题反馈功能

# 0.1.1

* 修复了 storage API 无法正确获取数据类型的 bug
