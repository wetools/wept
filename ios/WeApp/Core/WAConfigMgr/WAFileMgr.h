//
//  WAFileMgr.h
//  WeAppExample
//
//  Created by lionvoom on 2020/11/16.
//  Copyright © 2020 wept. All rights reserved.
//

#import <Foundation/Foundation.h>

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
