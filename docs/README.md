# WEPT

微信小程序 web 端实时运行工具，借助 WEPT 和 Chrome
浏览器，开发者可以更加透明的进行开发和调试。

## 简介

WEPT 是一个可以让小程序代码直接运行在浏览器里的命令行工具，

它的目标是为小程序开发提供高效、稳定、友好、无限制的运行环境。

目前支持以下操作系统： Mac，Windows 以及 Linux （需要环境变量中有 `wine`）

## 主要特点

* 支持 wxml, wxss, javascript 和 json 保存自动刷新
* 支持系统 notification 更早提示构建和请求错误
* 使用后台转发 XMLHttpRequest 请求，无需配置 CORS
* 支持除微信支付登录外的小程序 API
* 可使用 Chrome 移动页面调试，可在移动端体验
* 支持 appData 和 storage 面板，需下载 [Chrome 插件](https://chrome.google.com/webstore/detail/wechat-devtools-extension/cmpjfobofbhbghjodehbohchlghacmll)

## 安装 & 更新

WEPT 服务端是基于 nodejs 开发的，需要首先下载安装 [nodejs](https://nodejs.org)

__windows 用户请确保 [添加 npm 环境变量](http://jingyan.baidu.com/article/2d5afd69e243cc85a2e28efa.html)__，

安装完成后执行：

    # 可能需要 sudo
    npm i wept -g

如安装较慢，可使用 [cnpm](http://npm.taobao.org/)， 或者 [yarn](https://github.com/yarnpkg/yarn):

    yarn global add wept

更新命令与安装命令相同。

## 快速上手

到任意小程序项目根目录下执行命令：

    wept

使用 Chrome 访问 `http://localhost:3000` 打开开发者工具后启用移动页面调试模式（Mac 下快捷键为 `⌘ ⇧ M`）

## 命令行选项

使用 `wept -h` 命令可在命令行查看所有可用选项帮助，目前支持如下选项：

* `-p <port>` 改变服务启动端口，默认为 3000
* `-V` 显示当前版本，示例：`0.8.0 130400` 前面的 0.8.0 表示 WEPT 版本，后面的
  130400 为使用的官方开发者工具代码版本
* `-o` 启动服务后使用浏览器打开小程序首页，使用 applescript 实现，仅支持 Mac
* `-l` 打开 WEPT 的历史更新日志


## WEPT 配置文件

通过使用配置文件，你可以调整 WEPT 的运行方式来满足特定的需求，

WEPT 会自动读取运行目录下的 `wept.json` 文件， 一个有效的示例如下：

``` json
{
  "babel": false
}
```

<p class="warning">
如果你使用 wepy 或者其它工具编译小程序 js 代码，请确保配置 `babel: false`。
</p>

WEPT 目前支持以下的配置项：

* `babel` 默认启用 babel 支持 es2015，如果你使用其它方式编译代码，可将该字段设为`false`
* `nomap` 默认为 `false`，如果你发现浏览器请求微信地图 sdk
  时缓慢，或者你没有网络，可以将其设置为 `true` 禁用地图 sdk 下载
* `headers`  该配置中的 key value 会添加到原有 headers 中发送给真正的后台服务器
* `proxy` 代理配置，该配置只对 `request` 请求以及 `downloadFile`
  请求有效，一个有效的代理配置示例如下：

    ``` json
    {
      "proxy": {
        "host": "localhost",
        "port": 8090,
        "proxyAuth": "user:password",
        "headers": {
          "User-Agent": "Node"
        }
      }
    }
    ```

  详情可参考 https://github.com/koichik/node-tunnel 这个模块。

  我个人使用的是  https://mitmproxy.org/
  来做代理，它可以支持在命令行方便的查看和修改请求/响应。

## 实现原理

WEPT 后台使用 node 提供服务完全动态生成小程序，前端实现了 view 层、service 层和控制层之间的相关通讯逻辑。

内部实现的详细机制可参考我在知乎上的文章：

* [微信小程序架构分析（上）](https://zhuanlan.zhihu.com/p/22754296)
* [微信小程序架构分析（中）](https://zhuanlan.zhihu.com/p/22765476)
* [微信小程序架构分析（下）](https://zhuanlan.zhihu.com/p/22932309)

需要一提的是部分实现细节已经发生了一些变化，但是基本原理就是三层间的互相通讯。

为了方便后续保证与官方实现的一致性， WEPT 的 view 层和 service
层代码使用的是官方的代码，而控制层则是完全重新实现的。

## 技术支持

推荐使用 [github issues](https://github.com/chemzqm/wept/issues) 进行问题反馈，

如果你想与我讨论，可以使用 gitter: https://gitter.im/we-wept/

或者发送邮件到 <a href="mailto:chemzqm@gmail.com">chemzqm@gmail.com</a>
