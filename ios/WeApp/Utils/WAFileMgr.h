//
//  WAFileMgr.h
//  WeAppExample
//
//  Created by lionvoom on 2020/11/16.
//  Copyright © 2020 wept. All rights reserved.
//

#import <Foundation/Foundation.h>

FOUNDATION_EXPORT NSString * const kMAFileDir_Source;
FOUNDATION_EXPORT NSString * const kMAFileDir_tmp;
FOUNDATION_EXPORT NSString * const kMAFileDir_store;
FOUNDATION_EXPORT NSString * const kMAFileDir_usr;

@interface WAFileMgr : NSObject

+ (BOOL)write:(NSData *)data toFile:(NSString *)filePath;

+ (BOOL)removePath:(NSString *)path;

+ (BOOL)copyItemAtPath:(NSString *)path toPath:(NSString *)toPath;

/// 解压
/// @param zipSrcPath   解压源文件
/// @param destDir          目标目录
/// @param isReplace     YES,替换; NO,合并
+ (BOOL)unzip:(NSString *)zipSrcPath toDestDir:(NSString *)destDir isReplace:(BOOL)isReplace;

+ (unsigned long long)fileSize:(NSString *)filePath;

+ (BOOL)isFullFilePath:(NSString *)path;

+ (id)readJSONFile:(NSString *)filePath;

@end



@interface WAFileMgr (WAAppFileConfig)

/// 小程序根目录
+ (NSString *)WAAppRootDir;

/// 小程序 app 目录
+ (NSString *)WAAppAppsDir;

/// 小程序包zip文件地址
+ (NSString *)WAAppZipPath:(NSString *)appId;

/// 小程序`appId`根目录
+ (NSString *)WAAppDir:(NSString *)appId;

/// 小程序根`Source`目录
+ (NSString *)WAAppSourceDir:(NSString *)appId;

/// 小程序临时存储目录 `tmp`
+ (NSString *)WAAppTmpDir:(NSString *)appId;

/// 小程序本地存储数据目录 `store`
+ (NSString *)WAAppStoreDir:(NSString *)appId;

/// 小程序本地存储数据目录 `usr`
+ (NSString *)WAAppUsrDir:(NSString *)appId;

/// 小程序入口文件，小程序 appservice.html，小游戏 gamePage.html
+ (NSString *)WAAppEnterencePath:(NSString *)appId isGame:(BOOL)isGame;

/// 小程序config
+ (NSString *)WAAppConfigPath:(NSString *)appId isGame:(BOOL)isGame;

/// 解压小程序zip
+ (BOOL)WAAppUnZip:(NSString *)appId;

/// 检测小程序包完整性
+ (BOOL)WAAPPCheckPackageValid:(NSString *)appId isGame:(BOOL)isGame error:(NSError **)error;

/// 准备小程序debug包（用于本地调试）
+ (BOOL)WAAppPrepareDebugPackage:(NSString *)appId;

/**
获取绝对路径
 
 basePath: root
*/
+ (NSString *)getRootAbsolutePathWithFilePath:(NSString *)filePath forAppId:(NSString *)appId;

/**
获取绝对路径
 
 basePath: Source
*/
+ (NSString *)getSourceAbsolutePathWithFilePath:(NSString *)filePath forAppId:(NSString *)appId;

/**
查找绝对路径
 
 寻找路径 ’root‘ ’Source‘
*/
+ (NSString *)findAbsolutePathWithFilePath:(NSString *)filePath forAppId:(NSString *)appId;

@end
