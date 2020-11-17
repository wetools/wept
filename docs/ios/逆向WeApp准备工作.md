`逆向WeApp`系列分享主要有两个目的:
1. 分享`微信小程序框架-WeApp`逆向的全流程,以及涉及到的一些常用的iOS逆向工具及实战技巧.
2. 分析`微信小程序框架-WeApp`实现原理, 研究其中用到的一些实用技术,以及怎么把这些实用的技术应用到我们自己的项目中去,具体会以demo的方式分享到GitHub.

[TOC]

# 目标

这次分享主要是给我们后续分析研究`微信小程序框架-WeApp`做准备,后续的文章我们将逐渐展开并深入到细节.

准备分为两个阶段:

阶段一:
1. 越狱iPhone手机
1. 逆向工具
1. 砸壳,拿到App的可执行文件

阶段二:
- 导出头文件
- tweak编写动态库,进行hook
- IDA自动分析App的可执行文件

# 越狱iPhone手机
我们直接用`爱思助手`进行iPhone越狱,我用的机型是:iPhone7(系统13.4.1).

- 查看你的[iPhone系统版本是否支持越狱](https://www.i4.cn/news_detail_43852.html). (不行的话,去闲鱼买一台二手iPhone7的¥600左右,方便学习iOS逆向.)

![image](https://note.youdao.com/yws/api/personal/file/WEB9ee318a239fbe266d84f037d0fe057ea?method=download&shareKey=fc8b03144c0fa4b2d82ee939eb4b401a)

- 越狱步骤如下图:

![image](https://note.youdao.com/yws/api/personal/file/WEB41b2d4f28f80d096ec16d821b0df7216?method=download&shareKey=48669c1decd797e9be81100cdeed0e66)
![image](https://note.youdao.com/yws/api/personal/file/WEB4352fc6943ca41861890a3273f0ca850?method=download&shareKey=eb65823f9b6669912891f2c47122a22b)

- 看到iPhone上多了个`checkra1n`就说明越狱成功了.

![image](https://note.youdao.com/yws/api/personal/file/WEBfa988a124f5ae386b0eb6876014b820f?method=download&shareKey=4a3f26feb1d4dc143ab5bc86961a60ff)   
其它机型越狱直接看[爱思助手-教程中心](https://www.i4.cn/news_5.html).

- 温馨提示
1. 断电或重启之后需要重新越狱, 不然Cydia无法工作.
2. 重新越狱之后, 之前装的一些越狱插件才能恢复正常使用.



# 逆向工具
在逆向过程中, 涉及到Mac命令, iPhone命令切换操作,对于小白来说,第一次可能会晕掉,先提示一下.
- Mac命令格式
```
$ 命令 args
```

- iPhone命令格式,因为是以root权限访问iPhone,所以会带有一个`root`标识.
```
~ root# 命令 args
```

## Cydia
Cydia的主要目的是为越狱的iOS用户提供一个高级包装工具的图形界面前端以安装不被App Store接受的程序。

1. 安装
    - [ ] VPN下, 打开checkra1n, 安装Cydia.
    - [x] 没有VPN的话,直接下载一个`奇游手游加速器`, 开启一个韩服游戏加速,可以蹭半个小时VPN去下载安装Cydia. (这也可以,服~)

2. Cydia 必备插件
    - [x] `Apple File Conduit "2"` 开启整个手机文件系统(越狱)访问权限; 越狱安装这个插件后,爱思助手可以看到`文件管理`多了个`文件系统(越狱)`选项.
    - [x] `OpenSSH` 用于Mac(客户端)远程登录iPhone(服务器). 从而可以通过Mac(客户端)通过命令操作iPhone(服务器).
    
3. 查看Cydia插件,也可以搜索安装 (请确保必备插件安装好后,再往下走流程)

![image](https://note.youdao.com/yws/api/personal/file/WEB8f5ffb05e5df0806ddf23871f5a8ecf2?method=download&shareKey=a99bcd2f52d647749d0258adbde47af1)

## USB登录
Mac(客户端)远程登录iPhone(服务器)
- [ ] USB端口映射工具 [usbmuxd下载地址](https://cgit.sukimashita.com/usbmuxd.git/)
- [ ] 登录步骤(不推荐)
```
//1. USB端口映射
$ python ~/jbScript/.usbmuxd/tcprelay.py -t 22:10010 //服务器端口22 映射到 客户端10010
Forwarding local port 10010 to remote port 22

//2. 新开一个命令窗口,再进行SSH登录
$ ssh root@localhost -p 10010
LionVoom:~ root#_  //此时已登录(第一次会弹授权框),可以用命令控制iPhone了
```

- [x] 登录步骤,使用脚本方式(推荐)   
    - iOS逆向过程中,上面登录步骤,使用非常频繁,我们最好弄成脚本的形式.   
    - 将 [jbScript](https://github.com/lionvoom/WeAppCrack-0) 文件夹放到Mac用户目录下,上面的登录步骤直接简化为脚本调用:
```
$ sh ~/jbScript/usb.sh
Forwarding local port 10010 to remote port 22

//新开一个命令窗口
$ sh ~/jbScript/login.sh
LionVoom:~ root#_
```



## 查找目标App包 MJAppTools
- MJAppTools命令可以列举出iPhone中的包名、bundleid、App包路径、沙盒路径、是否加壳等信息.
- 安装 [MJAppTools(李明杰)](https://github.com/CoderMJLee/MJAppTools)
- 命令使用

```
~ root# MJAppTools
  -l  <regex>	列出用户安装的应用
  -le <regex>	列出用户安装的加壳应用
  -ld <regex>	列出用户安装的未加壳应用
  -ls <regex>	列出系统的应用
``` 
``` 
~ root# MJAppTools -l
# 一共2个应用
-----
# 01 【AsTools pro】 <rn.notes.best>
  /private/var/containers/Bundle/Application/0B5401E6-8B4B-4473-A65E-EEC24024D3EB/AsTools.app
  /private/var/mobile/Containers/Data/Application/C556815E-9C98-460B-A094-521CD9D73FE9
  arm_64 加壳
-----
# 02 【WeChat】 <com.tencent.xin> //包名,bundleid
  /private/var/containers/Bundle/Application/72F2FFD2-2170-477E-99A8-D2DDE6E19A2D/WeChat.app   //微信安装包路径
  /private/var/mobile/Containers/Data/Application/3B0E96A7-9E82-4545-B730-8CDDC44707E2         //微信沙盒路径
  arm_64 加壳
```

## 脱壳工具 dumpdecrypted
- [ ] 下载并编译dumpdecrypted.dylib
    - [dumpdecrypted下载链接](https://github.com/stefanesser/dumpdecrypted)
    - `dumpdecrypted.dylib`签名失效,导致脱壳失败.需要重新签名.
```
~ root# DYLD_INSERT_LIBRARIES=dumpdecrypted.dylib /private/var/containers/Bundle/Application/72F2FFD2-2170-477E-99A8-D2DDE6E19A2D/WeChat.app/WeChat
dyld: warning: could not load inserted library 'dumpdecrypted.dylib' into hardened process because no suitable image found.  Did find:
	dumpdecrypted.dylib: code signature in (dumpdecrypted.dylib) not valid for use in process using Library Validation: mapped file has no cdhash, completely unsigned? Code has to be at least ad-hoc signed.
...
```
```
//重签名步骤

//1.找到Mac上的可用签名证书
$ security find-identity -v -p codesigning
  1) 8ED1967EFED619841FCF9DA4B08B6EAB5E58FD1B "xxxxxxxxxxx" (CSSMERR_TP_CERT_REVOKED)
  2) ...

//2.进入下载好的dumpdecrypted目录
$ cd ~/Download/dumpdecrypted-master/

//3.重签名
$ codesign --force --verify --verbose --sign "xxxxxxxxxxx" dumpdecrypted.dylib
dumpdecrypted.dylib: signed Mach-O universal (armv7 armv7s arm64) [dumpdecrypted]
```
- [x] [已重签名dumpdecrypted.dylib](https://github.com/lionvoom/WeAppCrack-0)
- [x] 打开`爱思助手`拖拽`dumpdecrypted.dylib`文件到iPhone上的`/var/root`目录
- [x] 脱壳命令

```
// xxx   //App可执行文件路径,可通过MJAppTools工具快速找到这个路径
~ root# DYLD_INSERT_LIBRARIES=dumpdecrypted.dylib xxx

// 例如: 脱壳 WeChat
~ root# DYLD_INSERT_LIBRARIES=dumpdecrypted.dylib /private/var/containers/Bundle/Application/72F2FFD2-2170-477E-99A8-D2DDE6E19A2D/WeChat.app/WeChat 
```
![image](https://note.youdao.com/yws/api/personal/file/WEB1e3f46cb8030a4df4c6744f3d3251091?method=download&shareKey=eeff41425edc0a7cfc3f59843f632864)

至此,我们已成功脱壳微信,得到`WeChat.decrypted`.通过爱思助手导出到Mac,去掉后缀得到`WeChat(可执行文件)`.

第一阶段大功告成.

---

## 导出头文件 class-dump
- [x] 下载 [class-dump-3.5.tar.gz](http://stevenygard.com/projects/class-dump/)
- [x] 解压后将`class-dump`放到Mac的`/usr/local/bin/`目录下   
> 终端能直接敲出来的命令会去两个地方找: `/usr/bin`(系统级)  `/usr/local/bin/`(用户级)
- [x] class-dump命令
```
$ class-dump -H Mach-O文件路径 -o 头文件存放目录
```
- [x] 导出微信头文件,`WeChat(可执行文件)`目录下
```
$ class-dump -H WeChat -o WeChatHeaders
```
- 导出App的[Mach-O(可执行文件)](https://www.exchen.net/mach-o-文件格式解析.html)的头文件, 方便我们后续去hook类中的方法.

- 微信小程序框架,是以`WeApp`前缀`WA`去命名各个实现的类的,例如:`WAAppContactPreLoader` `WAAppTask.h` `WAJSCoreService.h` `WAWebViewController.h`等等

![image](https://note.youdao.com/yws/api/personal/file/WEBecf6bc194f44ed72452beb76fa798275?method=download&shareKey=7d62ed2eb040579116aecd92220cab85)

## hook工具 theos/tweak
- [x] 增加环境配置
```
$ vim ~/.bash_profile

// 增加如下配置, 并保存
export THEOS=~/theos
export PATH=$THEOS/bin:${PATH}
```

- [x] 使配置生效

```
$ source ~/.bash_profile

//验证配置, 能打印出来说明生效了,没打印出来说明还不行,尝试重启终端再执行上述 source 命令
$ echo $THEOS
/Users/xxxx/theos 
```
- [x] 创建tweak项目
```
$ nic.pl
NIC 2.0 - New Instance Creator
------------------------------
  [1.] iphone/activator_event
  [2.] iphone/activator_listener
  [3.] iphone/application_modern
  [4.] iphone/application_swift
  [5.] iphone/cydget
  [6.] iphone/flipswitch_switch
  [7.] iphone/framework
  [8.] iphone/library
  [9.] iphone/notification_center_widget
  [10.] iphone/notification_center_widget-7up
  [11.] iphone/preference_bundle_modern
  [12.] iphone/theme
  [13.] iphone/tool
  [14.] iphone/tool_swift
  [15.] iphone/tweak
  [16.] iphone/tweak_with_simple_preferences
  [17.] iphone/xpc_service
Choose a Template (required): 15        //选择[15.] iphone/tweak
Project Name (required): tweakwechat    //项目名
Package Name [com.yourcompany.tweakwechat]: com.lionvoom.tweakwechat
Author/Maintainer Name [lionvoom]: wu   //作者
[iphone/tweak] MobileSubstrate Bundle filter [com.apple.springboard]: com.tencent.xin //⚠️hook项目的bundleid
[iphone/tweak] List of applications to terminate upon installation (space-separated, '-' for none) [SpringBoard]:
Instantiating iphone/tweak in tweakwechat/...
Done.
```

- [x] tweak项目结构
```
$ tree
.
├── Makefile    //需要配置
├── Tweak.x     //编写hook代码
├── control
└── tweakwappalert.plist
```

- [x] Makefile 配置域名和端口号,跟SSH登录iPhone的配置保持一致.因为SSH登录用的是localhost,所以这里配置`127.0.0.1`.

```
export THEOS_DEVICE_IP = 127.0.0.1  
export THEOS_DEVICE_PORT = 10010

TARGET := iphone:clang:latest:7.0
INSTALL_TARGET_PROCESSES = SpringBoard


include $(THEOS)/makefiles/common.mk

TWEAK_NAME = tweakwappalertwu

tweakwappalert_FILES = Tweak.x
tweakwappalert_CFLAGS = -fobjc-arc

include $(THEOS_MAKE_PATH)/tweak.mk
```

- [x] Tweak.x 模版,我们可以在这里编写hook代码.其中使用的[Logos语法](http://iphonedevwiki.net/index.php/Logos)非常简单, 相信大家看一次就会了.初始化模版里基本的`Logos语法`注释写的非常清楚.

```
//要hook的类
%hook ClassName 

// hook类方法
// Hooking a class method
+ (id)sharedInstance {
	return %orig;
}

// hook带参数的实例方法
// Hooking an instance method with an argument.
- (void)messageName:(int)argument {
    // 打印这个对象的方法调用
	%log; // Write a message about this call, including its class, name and arguments, to the system log. 

    //用原参数调用hook的原方法
	%orig; // Call through to the original function with its original arguments.
	
	//用自定义调用hook的原方法
	%orig(nil); // Call through to the original function with a custom argument.

    //如果使用%orig()，则必须提供所有参数(除了self和_cmd，它们都是自动生成的)。
	// If you use %orig(), you MUST supply all arguments (except for self and _cmd, the automatically generated ones.)
}

// Hooking an instance method with no arguments.
// hook不带参数的实例方法(注意这里带了返回值)
- (id)noArguments {
	%log;
	//hook返回值,做一些事情,再return
	id awesome = %orig;
	[awesome doSomethingElse];

	return awesome;
}

// 
// Always make sure you clean up after yourself; Not doing so could have grave consequences!
%end
```

- [ ] 在tweek项目下,编译->打包->安装
```
//1.编译
$ make

//2.打包
$ make package

//3.安装
$ make install
```

- [x] 在tweek项目下,编译->打包->安装,将 [jbScript](https://github.com/lionvoom/WeAppCrack-0) 文件夹放到Mac用户目录下,简化为脚本调用:
```
$ sh ~/jbScript/tweak.sh
```
默认手机会重启SpringBoard。

---

- [x] 热身项目,hook微信小程序启动入口,不启动小程序,改成弹框. [tweakwappalert项目](https://github.com/lionvoom/WeAppCrack-0)

Tweak.x代码
```
%hook WAAppContactPreLoader
- (void)openApp:(id)arg1 taskExtInfo:(id)arg2 handlerWrapper:(id)arg3 {
	UIAlertView *alert = [[UIAlertView alloc]initWithTitle:m_nsAppId message:@"hook微信小程序启动入口" 
     delegate:nil cancelButtonTitle:@"取消" otherButtonTitles: nil];
	[alert show];
	
	// 不调用hook的原方法,不会启动小程序了
	// %orig 
}
%end
```

![image](https://note.youdao.com/yws/api/personal/file/WEBfa9a50630fd316c4f6ae04574dd382ac?method=download&shareKey=e213824996bba0df2351736d723ac89a)

- [x] `Cydia`里可以查看tweak项目插件,点击进去可以卸载.

![image](https://note.youdao.com/yws/api/personal/file/WEB67ce8b523983d9fa024ab02e08e2beda?method=download&shareKey=299f532fb4ca11bc4019db4064768fa9)

## 伪代码分析工具 IDA
![image](https://note.youdao.com/yws/api/personal/file/WEB5478bdb29e2a6829273f6bfd9e2be438?method=download&shareKey=929223affd24415e3d79d9d67892ccec)
- [x] [安装IDA](https://www.hex-rays.com/order/),也可以找个破解版本.
- [x] 导入`WeChat(可执行文件)`,让IDA自动分析(预计耗时一天),分析完毕后保存结果.
- [x] `F5`快捷键,可以转伪代码,比如:微信小程序入口方法实现.

![image](https://note.youdao.com/yws/api/personal/file/WEB5af6c921a6adc9f1f92e7dc0c3b9f3be?method=download&shareKey=c195f4c228d1abdf1ee28169cab37308)

第二阶段也大功告成了.
