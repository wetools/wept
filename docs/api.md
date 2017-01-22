## 不支持的 API

* 客服消息：**不打算支持**，请使用微信客户端体验
* 模板消息：**不打算支持**，请使用微信客户端体验
* 生成带参数二维码: **不打算支持**，请使用微信官方工具生成
* 微信支付调试支持：**不打算支持**，请使用微信官方工具

## 目前有 bug 的 API

* picker 自定义的 bingchange 事件，暂时无法支持，因为控制层找不到相应事件名

## 130400 版本

没有新的 API，WEPT 接口调用没有用户授权步骤

## 122100 版本

### View 层

* 理论上所有新增和调整标签都支持。
* `<image/>` 的 widthFix 模式，不涉及 wept 变动，已支持
* `<picker/>` 组件属性 range 增加 ObjectArray 类型支持，已支持，不需要控制层变动

### service 层

* `wx.switchTab`： 已支持
* `wx.scanCode`： 已支持，使用 prompt 弹出层模拟返回
* `wx.createMapContext` `wx.createCanvasContext`： 已支持，测试可用
* `wx.showToast` 的 mask 属性：已支持
* `Page.onShareAppMessage` 已支持，可点击右上角弹出菜单的分享按钮进行调试
* `App.onError` 已支持
* `wx.getSystemInfo` 的 platform 参数，已支持，返回 devtools
* `wx.downloadFile` 返回 tempFilePath，已支持，返回为 blob 链接字符串，可用于 image 标签
* `wx.showModal` 中 confirmText cancelText 的字数限制，已支持
* `wx.navigateTo` `wx.redirectTo` 不允许跳转到 tabbar 页面，已支持
* `CanvasContext` 相关改动，不涉及 wept 变动，已支持
* `wx.startRecord` `wx.stopRecord` `wx.playVoice` `wx.pauseVoice` `wx.stopVoice` 接口调试，已支持
 
### 配置

* `disableScroll` 配置，只有微信客户端需要，不需要支持。

## 103100 版本

* ✓ 微信登录：目前返回同官方 IDE 无 appid 状态一致，为模拟返回
* ✓ 获取用户信息接口：返回测试用数据
* ✓ 发起支付：没做任何判定的模拟接口
* ✓ 设置界面标题
* ✓ 标题栏加载动画
* ✓ 页面跳转，支持 `wx.navigateBack` 的 delta 参数
* ✓ 下拉刷新
* ✓ 创建动画
* ✓ 创建 Canvas 绘画
* ✓ 获取手机网络状态：默认返回 `WIFI`
* ✓ 监听重力感应数据：支持 Safari mobile 等移动浏览器调试
* ✓ 监听罗盘数据：支持 Safari mobile 等移动浏览器调试
* ✓ request 请求接口，使用后端代理转发，避免 CORS 限制
* ✓ websocket 接口
* ✓ 上传、下载文件：临时文件路径为 blob url，可以传给下载、保存和预览接口
* ✓ 保存文件：支持将前端生成的音频、视频和图片 blob 对象保存到后台系统临时目录下，下次打开小程序可正常获取
* ✓ 选择/预览图片：实现了官方 IDE 不支持的图片预览接口，可在移动设备体验
* ✓ 选择视频
* ✓ 录音 API：需要浏览器支持 html5 MediaRecorder API
* ✓ 音频播放控制：需要浏览器支持 html5 Audio API
* ✓ 背景音乐控制：需要浏览器支持 html5 Audio API
* ✓ 获取当前位置：需要浏览器支持 html5 location API
* ✓ 使用地图查看位置 `wx.openLocation`
* ✓ 使用地图选择位置 `wx.chooseLocation`
* ✓ storage 所有同步 API：因为页面没有本地文件 API，所以使用了 localStorage 进行保存，大小限制为 5MB
* ✓ storage 所有异步 API：同上
* ✓ `wx.getSavedFileList` `wx.getSavedFileInfo` `wx.removeSavedFile`, wept 使用后台保存文件，所以需发起 http 请求，API 使用方式与官方一致
* ✓ `wx.openDocument` 调用后弹窗提醒，同官方工具
* ✓ 交互 API：`wx.showToast` `wx.hideToast` `wx.showModal` `wx.showActionSheet`
* ✓ `wx.getImageInfo` 获取图片信息
* ✓ `wx.getSystemInfoSync` `wx.getSystemInfo` 获取系统信息
* ✓ `wx.makePhoneCall` 打电话，wept 弹出一个 confirm 窗口
* ✓ `wx.canvasToTempFilePath` 保存 canvas 为临时文件，wept 会生成一个 blob url 传递给 `res.filePath`
* ✓ `wx.checkSession` 检测登录状态，wept 没有登录，永远按成功处理
* ✓ `wx.createAudioContext` 音频组件控制 API
* ✓ `wx.createVideoContext` 视频组件控制 API
