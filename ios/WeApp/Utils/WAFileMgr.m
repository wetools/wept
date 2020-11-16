//
//  WAFileMgr.m
//  WeAppExample
//
//  Created by lionvoom on 2020/11/16.
//  Copyright © 2020 wept. All rights reserved.
//

#import "WAFileMgr.h"
#import "SSZipArchive.h"
#import "NSData+YYAdd.h"
#import "NSString+YYAdd.h"
#import "WAError.h"

static NSString *kWAFileDir_WeAppRoot   = @"wept";
static NSString *kWAFileDir_apps        = @"WeApps";
NSString * const kWAFileDir_Source      = @"__pkg__";
NSString * const kWAFileDir_tmp         = @"tmp";
NSString * const kWAFileDir_store       = @"store";
NSString * const kWAFileDir_usr         = @"usr";

@implementation WAFileMgr

+ (BOOL)write:(NSData *)data toFile:(NSString *)filePath {
    if (!data || !filePath) return NO;
    NSError *error;
    NSFileManager *fileManager = NSFileManager.defaultManager;
    //mkdir
    NSString *destDir = filePath.stringByDeletingLastPathComponent;
    if (![fileManager fileExistsAtPath:destDir] && ![fileManager createDirectoryAtPath:destDir withIntermediateDirectories:YES attributes:nil error:&error]) {
        return NO;
    }
    return [fileManager createFileAtPath:filePath contents:data attributes:nil];
}

+ (BOOL)removePath:(NSString *)path {
    NSFileManager *fileManager = [NSFileManager defaultManager];
    if ([fileManager fileExistsAtPath:path]) {
        NSError *error;
        return [fileManager removeItemAtPath:path error:&error];
    }
    return YES;
}

+ (BOOL)copyItemAtPath:(NSString *)path toPath:(NSString *)toPath {
    NSError *error;
    BOOL success = [[NSFileManager defaultManager] copyItemAtPath:path toPath:toPath error:&error];
    return success;
}

+ (BOOL)unzip:(NSString *)zipSrcPath toDestDir:(NSString *)destDir isReplace:(BOOL)isReplace {
    NSFileManager *fileManager = NSFileManager.defaultManager;
    if (![fileManager fileExistsAtPath:zipSrcPath]) return NO;
    
    NSError *error;
    NSString *zipTempFolder = [[zipSrcPath stringByDeletingLastPathComponent] stringByAppendingFormat:@"/%@_upzip_temp", zipSrcPath.lastPathComponent.stringByDeletingPathExtension];
    if ([fileManager fileExistsAtPath:zipTempFolder] && ![fileManager removeItemAtPath:zipTempFolder error:&error]) return NO;
    
    if ([fileManager fileExistsAtPath:destDir] && !isReplace) {//合并
        return [SSZipArchive unzipFileAtPath:zipSrcPath toDestination:destDir overwrite:YES password:nil error:&error];
    }
    
    if (![SSZipArchive unzipFileAtPath:zipSrcPath toDestination:zipTempFolder overwrite:YES password:nil error:&error]) return NO;
    NSString *osxPath = [zipTempFolder stringByAppendingPathComponent:@"__MACOSX"];
    if ([fileManager fileExistsAtPath:osxPath] && ![fileManager removeItemAtPath:osxPath error:&error]) return NO;
    
    // 1.清除destDir 2.解压好的文件目录重命名为destDir
    if ([fileManager fileExistsAtPath:destDir] && ![fileManager removeItemAtPath:destDir error:&error]) return NO;
    return [fileManager moveItemAtPath:zipTempFolder toPath:destDir error:&error];
}

+ (unsigned long long)fileSize:(NSString *)filePath  {
    NSFileManager *fileManager = [NSFileManager defaultManager];
    BOOL isDir = false;
    BOOL isExists = [fileManager fileExistsAtPath:filePath isDirectory:&isDir];
    if (!isExists) {
        return 0;
    }
    
    UInt64 size = 0;
    if (isDir) {//文件夹
        NSDirectoryEnumerator *enumerator = [fileManager enumeratorAtPath:filePath];
        NSString *file = nil;
        while (file = [enumerator nextObject]) {
            NSString *fullPath = [filePath stringByAppendingPathComponent:file];
            NSDictionary *attr = [fileManager attributesOfItemAtPath:fullPath error:nil];
            size += attr.fileSize;
        }
    } else {//单个文件
        NSDictionary *attr = [fileManager attributesOfItemAtPath:filePath error:nil];
        size += attr.fileSize;
    }
    return size;
}

/// 文件全路径
+ (BOOL)isFullFilePath:(NSString *)path {
    if ([path hasPrefix:@"/var"] || [path hasPrefix:@"/private/var"] //真机根目录
        || [path hasPrefix:@"/Users"]) { //模拟器根目录
        return [NSFileManager.defaultManager fileExistsAtPath:path];
    }
    return NO;
}

+ (id)readJSONFile:(NSString *)url {
    NSData *data = [NSData dataWithContentsOfFile:url];
    NSError *error;
    id obj = [NSJSONSerialization JSONObjectWithData:data options:0 error:&error];
    return obj;
}

@end



@implementation WAFileMgr (WAAppFileConfig)

+ (NSString *)WAAppRootDir {
    static NSString *projectRootDirPath;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        NSString *documentPath = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES).firstObject;
        projectRootDirPath = [documentPath stringByAppendingFormat:@"/%@", kWAFileDir_WeAppRoot];
    });
    return projectRootDirPath;
}

+ (NSString *)WAAppAppsDir {
    NSString *rootPath = [[self WAAppRootDir] stringByAppendingFormat:@"/%@", kWAFileDir_apps];
    return rootPath;
}

/// 小程序目录
+ (NSString *)WAAppDir:(NSString *)appId {
    NSString *rootPath = [self WAAppAppsDir];
    NSString *appDirPath = [rootPath stringByAppendingPathComponent:appId];
    return appDirPath;
}

/// `Source`目录
+ (NSString *)WAAppSourceDir:(NSString *)appId {
    NSString *sourceDir = [[self WAAppDir:appId] stringByAppendingPathComponent:kWAFileDir_Source];
    return sourceDir;
}

/// `tmp`目录
+ (NSString *)WAAppTmpDir:(NSString *)appId {
    NSString *tempFileCachePath = [[self WAAppDir:appId] stringByAppendingPathComponent:kWAFileDir_tmp];
    return tempFileCachePath;
}

/// `store`目录
+ (NSString *)WAAppStoreDir:(NSString *)appId {
    NSString *storageDirPath = [[self WAAppDir:appId] stringByAppendingPathComponent:kWAFileDir_store];
    return storageDirPath;
}

/// `usr` 目录
+ (NSString *)WAAppUsrDir:(NSString *)appId {
    NSString *dir = [[self WAAppDir:appId] stringByAppendingPathComponent:kWAFileDir_usr];
    return dir;
}

/// 小程序压缩包
+ (NSString *)WAAppZipPath:(NSString *)appId {
    NSString *serviceHtml = [[self WAAppDir:appId] stringByAppendingPathComponent:[appId stringByAppendingString:@".zip"]];
    return serviceHtml;
}

/// 获取小程序入口文件，小程序 service.js，小游戏 gamePage.html
+ (NSString *)WAAppEnterencePath:(NSString *)appId isGame:(BOOL)isGame {
    NSString *htmlPath;
    if (isGame) {
        htmlPath = [[self WAAppSourceDir:appId] stringByAppendingPathComponent:@"gamePage.html"];
    } else {
        htmlPath = [[self WAAppSourceDir:appId] stringByAppendingFormat:@"/__dev__/service.js"];//service JSContext模式
        // htmlPath = [[self appSourceDirPath:appId] stringByAppendingPathComponent:@"appservice.html"];//service WebView模式
    }
    return htmlPath;
}

/// 获取小程序的config
+ (NSString *)WAAppConfigPath:(NSString *)appId isGame:(BOOL)isGame {
    return [[self WAAppSourceDir:appId] stringByAppendingPathComponent:(isGame ? @"game.json" : @"app.json")];
}

+ (BOOL)WAAppUnZip:(NSString *)appId {
    NSString *zipPath = [self WAAppZipPath:appId];
    NSString *appSourceDir = [self WAAppSourceDir:appId];
    BOOL ret = [self unzip:zipPath toDestDir:appSourceDir isReplace:YES];
    if (ret) {
        [self removePath:zipPath];
    }
    return ret;
}

+ (BOOL)WAAPPCheckPackageValid:(NSString *)appId isGame:(BOOL)isGame error:(NSError **)error {
    NSFileManager *fileManager = [NSFileManager defaultManager];
    NSString *appZipPath = [WAFileMgr WAAppZipPath:appId];
    if ([fileManager fileExistsAtPath:appZipPath] && ![WAFileMgr WAAppUnZip:appId]) {
        *error = [WAError error:WAErrorFileUnzipFail];
        return NO;
    }
    
    NSString *appEnterencePath = [WAFileMgr WAAppEnterencePath:appId isGame:isGame];
    if (![fileManager fileExistsAtPath:appEnterencePath]) {
        NSString *sourceDir = [WAFileMgr WAAppSourceDir:appId];
        [fileManager removeItemAtPath:sourceDir error:nil];
        *error = [WAError error:WAErrorFileBroken];
        return NO;
    }
    return YES;
}

+ (BOOL)WAAppPrepareDebugPackage:(NSString *)appId {
    NSString *appZipPath = [self WAAppZipPath:appId];
    NSString *debugZipPath = [NSBundle.mainBundle pathForResource:[appId stringByAppendingString:@".zip"] ofType:nil];
    
    NSError *error;
    NSFileManager *fileManager = NSFileManager.defaultManager;
    if (![fileManager fileExistsAtPath:debugZipPath]) {
        return NO;
    }
    if ([fileManager fileExistsAtPath:appZipPath] && ![fileManager removeItemAtPath:appZipPath error:&error]) {
        return NO;
    }
    if (![fileManager fileExistsAtPath:appZipPath.stringByDeletingLastPathComponent] && ![fileManager createDirectoryAtPath:appZipPath.stringByDeletingLastPathComponent withIntermediateDirectories:YES attributes:nil error:&error]) {
        return NO;
    }
    return [fileManager copyItemAtPath:debugZipPath toPath:appZipPath error:&error];
}

#pragma mark -

+ (NSString *)getRootAbsolutePathWithFilePath:(NSString *)filePath forAppId:(NSString *)appId {
    return [self _absolutePathWithOriginPath:filePath basePath:[self WAAppDir:appId] forAppId:appId];
}

+ (NSString *)getSourceAbsolutePathWithFilePath:(NSString *)filePath forAppId:(NSString *)appId {
    return [self _absolutePathWithOriginPath:filePath basePath:[self WAAppSourceDir:appId] forAppId:appId];
}

+ (NSString *)_absolutePathWithOriginPath:(NSString *)filePath basePath:(NSString *)basePath forAppId:(NSString *)appId {
    if (filePath.length == 0 || !appId) {
        return nil;
    }
    
    if ([filePath hasPrefix:@"http://"]) { //http://
        return filePath;
    }
    
    if ([filePath hasPrefix:@"/"]) { //绝对路径
        if ([self isFullFilePath:filePath]) { //文件全路径
            return filePath;
        } else {
            return [NSString stringWithFormat:@"%@%@", [self WAAppSourceDir:appId], filePath];
        }
    }
    
//    NSString *cgfile = [NSString stringWithFormat:@"%@://%@", <#scheme#>, appId];
//    NSArray *protocolArr =
//    @[cgfile];
    NSArray *protocolArr;
    
    NSString *matchProtocol;
    for (NSString *protocol in protocolArr) {
        if ([filePath hasPrefix:protocol]) {
            matchProtocol = protocol;
            break;
        }
    }
    
    if (matchProtocol) {
        if ([filePath isEqualToString:matchProtocol]) {// cgfile://appId 表示 basePath
            return basePath;
        } else {
            NSString *relativePath = [filePath substringFromIndex:matchProtocol.length];
            return [NSString stringWithFormat:@"%@%@", basePath, relativePath];
        }
        
    } else {
        return [NSString stringWithFormat:@"%@/%@", basePath, filePath];
    }
}

+ (NSString *)findAbsolutePathWithFilePath:(NSString *)filePath forAppId:(NSString *)appId {
    if ([filePath.lowercaseString hasPrefix:@"http"]) {
        return filePath;
    }
    
    NSString *formatFilePath;
    NSFileManager *fileManager = [NSFileManager defaultManager];
    NSString *rootFilePath = [self getRootAbsolutePathWithFilePath:filePath forAppId:appId];
    if ([fileManager fileExistsAtPath:rootFilePath]) {
        formatFilePath = rootFilePath;
    } else {
        NSString *sourceFilePath = [self getSourceAbsolutePathWithFilePath:filePath forAppId:appId];
        if ([fileManager fileExistsAtPath:sourceFilePath]) {
            formatFilePath = sourceFilePath;
        }
    }
    return formatFilePath;
}

@end


