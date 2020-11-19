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
#import "WAAppEnum.h"
#import "WAUIKitUtil.h"
#import "WAError.h"

static NSString *kWAFileDir_WeAppRoot   = @"wept";
static NSString *kWAFileDir_apps        = @"WeApps";
static NSString *kWAFileDir_pkg         = @"__pkg__";
static NSString *kWAFileDir_tmp         = @"tmp";
static NSString *kWAFileDir_store       = @"store";
static NSString *kWAFileDir_usr         = @"usr";

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
    
    //合并
    if ([fileManager fileExistsAtPath:destDir] && !isReplace) {
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

+ (NSString *)WAAppDir:(NSString *)appId {
    NSString *rootPath = [self WAAppAppsDir];
    NSString *appDirPath = [rootPath stringByAppendingPathComponent:appId];
    return appDirPath;
}

+ (NSString *)WAAppPkgDir:(NSString *)appId {
    NSString *sourceDir = [[self WAAppDir:appId] stringByAppendingPathComponent:kWAFileDir_pkg];
    return sourceDir;
}

+ (NSString *)WAAppTmpDir:(NSString *)appId {
    NSString *tempFileCachePath = [[self WAAppDir:appId] stringByAppendingPathComponent:kWAFileDir_tmp];
    return tempFileCachePath;
}

+ (NSString *)WAAppStoreDir:(NSString *)appId {
    NSString *storageDirPath = [[self WAAppDir:appId] stringByAppendingPathComponent:kWAFileDir_store];
    return storageDirPath;
}

+ (NSString *)WAAppUsrDir:(NSString *)appId {
    NSString *dir = [[self WAAppDir:appId] stringByAppendingPathComponent:kWAFileDir_usr];
    return dir;
}

+ (NSString *)WAAppZipPath:(NSString *)appId {
    NSString *serviceHtml = [[self WAAppDir:appId] stringByAppendingPathComponent:[appId stringByAppendingString:@".zip"]];
    return serviceHtml;
}

+ (NSString *)WAAppEnterencePath:(NSString *)appId isGame:(BOOL)isGame {
    NSString *filePath;
    if (isGame) {
        filePath = [[self WAAppPkgDir:appId] stringByAppendingPathComponent:@"gamePage.html"];
    } else {
        filePath = [[self WAAppPkgDir:appId] stringByAppendingPathComponent:@"appservice.html"];
    }
    return filePath;
}

+ (NSString *)WAAppConfigPath:(NSString *)appId isGame:(BOOL)isGame {
    return [[self WAAppPkgDir:appId] stringByAppendingPathComponent:(isGame ? @"game.json" : @"app.json")];
}

+ (BOOL)WAAppUnZip:(NSString *)appId {
    NSString *zipPath = [self WAAppZipPath:appId];
    NSString *appSourceDir = [self WAAppPkgDir:appId];
    BOOL ret = [self unzip:zipPath toDestDir:appSourceDir isReplace:YES];
    if (ret) {
        [self removePath:zipPath];
    }
    return ret;
}

+ (BOOL)WAAppIsPackageExists:(NSString *)appId {
    NSFileManager *fileManager = [NSFileManager defaultManager];
    NSString *appZipPath = [WAFileMgr WAAppZipPath:appId];
    NSString *pkgDir = [WAFileMgr WAAppPkgDir:appId];
    if ([fileManager fileExistsAtPath:pkgDir] || [fileManager fileExistsAtPath:appZipPath]) {
        return YES;
    }
    return NO;
}

+ (BOOL)WAAppCheckPackageValid:(NSString *)appId error:(NSError **)error {
    NSFileManager *fileManager = [NSFileManager defaultManager];
    NSString *appZipPath = [WAFileMgr WAAppZipPath:appId];
    if ([fileManager fileExistsAtPath:appZipPath] && ![WAFileMgr WAAppUnZip:appId]) {
        [fileManager removeItemAtPath:appZipPath error:nil];
        *error = [WAError error:WAErrorFileUnzipFail];
        return NO;
    }
    
    NSString *pkgDir = [WAFileMgr WAAppPkgDir:appId];
    if (![fileManager fileExistsAtPath:pkgDir]) {
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

+ (NSString *)searchFileInApp:(NSString *)filePath appId:(NSString *)appId {
    if ([filePath hasPrefix:@"http://"] || [filePath hasPrefix:@"https://"]) return filePath;
    NSString *formatFilePath;
    NSFileManager *fileManager = [NSFileManager defaultManager];
    NSString *rootFilePath = [self getAbsolutePathInAppRoot:filePath appId:appId];
    if ([fileManager fileExistsAtPath:rootFilePath]) {
        formatFilePath = rootFilePath;
    } else {
        NSString *pkgDir = [self getAbsolutePathInAppPkg:filePath appId:appId];
        if ([fileManager fileExistsAtPath:pkgDir]) {
            formatFilePath = pkgDir;
        }
    }
    return formatFilePath;
}

+ (NSString *)getAbsolutePathInAppRoot:(NSString *)filePath appId:(NSString *)appId {
    return [self getAbsolutePath:filePath basePath:[self WAAppDir:appId] appId:appId];
}

+ (NSString *)getAbsolutePathInAppPkg:(NSString *)filePath appId:(NSString *)appId {
    return [self getAbsolutePath:filePath basePath:[self WAAppPkgDir:appId] appId:appId];
}

+ (NSString *)getAbsolutePath:(NSString *)originPath basePath:(NSString *)basePath appId:(NSString *)appId {
    if ([WAUIKitUtil isEmptyStirng:originPath] || !appId) return nil;
    if ([originPath hasPrefix:@"http://"] || [originPath hasPrefix:@"https://"]) return originPath;
    
    if ([originPath hasPrefix:@"/"]) {//绝对路径
        if ([self isFullFilePath:originPath]) return originPath;//全路径
        return [NSString stringWithFormat:@"%@%@", [self WAAppPkgDir:appId], originPath];
    }
    NSString *hookWAAppURLScheme = [NSString stringWithFormat:@"%@://%@", kWAAppHookURLScheme_wxfile, appId];
    if ([originPath hasPrefix:hookWAAppURLScheme]) {
        if ([originPath isEqualToString:hookWAAppURLScheme]) return basePath;
        NSString *relativePath = [originPath substringFromIndex:hookWAAppURLScheme.length];
        return [NSString stringWithFormat:@"%@%@", basePath, relativePath];
    }
    return [NSString stringWithFormat:@"%@/%@", basePath, originPath];
}

@end


