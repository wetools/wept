//
//  WAConfigMgr.h
//  WeAppExample
//
//  Created by lionvoom on 2020/11/17.
//  Copyright © 2020 wept. All rights reserved.
//

/* 小程序文件目录规划 */
/*
 Documents
 └── wept
     └── WeApps
         ├── weapp-demo
         │   ├── __pkg__
         │   ├── store
         │   ├── tmp
         │   └── usr
         └── weapp-demo2
         │   ...
*/

#import "MMService.h"

NS_ASSUME_NONNULL_BEGIN

@interface WAConfigMgr : MMService

/// 小程序根目录
+ (NSString *)WAAppRootDir;

/// 小程序 app 目录
+ (NSString *)WAAppAppsDir;

/// 小程序包zip文件地址
+ (NSString *)WAAppZipPath:(NSString *)appId;

/// `appId`小程序根目录
+ (NSString *)WAAppDir:(NSString *)appId;

/// 小程序包目录
+ (NSString *)WAAppPkgDir:(NSString *)appId;

/// `tmp`目录
+ (NSString *)WAAppTmpDir:(NSString *)appId;

/// `store`目录
+ (NSString *)WAAppStoreDir:(NSString *)appId;

/// `usr`目录
+ (NSString *)WAAppUsrDir:(NSString *)appId;

/// 小程序入口文件，小程序 appservice.html，小游戏 gamePage.html
+ (NSString *)WAAppEnterencePath:(NSString *)appId isGame:(BOOL)isGame;

/// 小程序config
+ (NSString *)WAAppConfigPath:(NSString *)appId isGame:(BOOL)isGame;

/// 解压小程序zip
+ (BOOL)WAAppUnZip:(NSString *)appId;

/// 检测本地是否存在小程序包
+ (BOOL)WAAppIsPackageExists:(NSString *)appId;

/// 校验小程序包
+ (BOOL)WAAppCheckPackageValid:(NSString *)appId error:(NSError **)error;

/// 准备小程序debug包（用于本地调试）
+ (BOOL)WAAppPrepareDebugPackage:(NSString *)appId;

/// `appId`小程序 global config
+ (NSDictionary *)WAAppGlobalConfig:(NSString *)appId isGame:(BOOL)isGame error:(NSError **)error;

/// `appId`小程序 web模版
+ (NSString *)WAAppTemplateHtml:(NSString *)appId error:(NSError **)error;

/// `appId`小程序目录下的搜索文件
+ (NSString *)searchFileInApp:(NSString *)filePath appId:(NSString *)appId;

/// `appId`小程序根目录下的绝对路径
+ (NSString *)getAbsolutePathInAppRoot:(NSString *)filePath appId:(NSString *)appId;

/// `appId`小程序`pkg`目录下的绝对路径
+ (NSString *)getAbsolutePathInAppPkg:(NSString *)filePath appId:(NSString *)appId;

@end

NS_ASSUME_NONNULL_END
