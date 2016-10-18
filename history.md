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
