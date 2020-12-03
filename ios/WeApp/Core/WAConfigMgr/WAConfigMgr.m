//
//  WAConfigMgr.m
//  WeAppExample
//
//  Created by lionvoom on 2020/11/17.
//  Copyright © 2020 wept. All rights reserved.
//

#import "WAConfigMgr.h"
#import "WAFileMgr.h"
#import "NSData+YYAdd.h"
#import "NSString+YYAdd.h"
#import "WAAppEnum.h"
#import "WAUtility.h"
#import "WAError.h"

static NSString *kWAFileDir_WeAppRoot   = @"wept";
static NSString *kWAFileDir_apps        = @"WeApp";
static NSString *kWAFileDir_pkg         = @"__pkg__";
static NSString *kWAFileDir_tmp         = @"tmp";
static NSString *kWAFileDir_store       = @"store";
static NSString *kWAFileDir_usr         = @"usr";

@implementation WAConfigMgr

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
    NSString *pkgDir = [[self WAAppDir:appId] stringByAppendingPathComponent:kWAFileDir_pkg];
    return pkgDir;
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
    BOOL ret = [WAFileMgr unzip:zipPath toDestDir:appSourceDir isReplace:YES];
    if (ret) {
        [WAFileMgr removePath:zipPath];
    }
    return ret;
}

+ (BOOL)WAAppIsPackageExists:(NSString *)appId {
    NSFileManager *fileManager = [NSFileManager defaultManager];
    NSString *pkgDir = [self WAAppPkgDir:appId];
    if ([fileManager fileExistsAtPath:pkgDir]) {
        return YES;
    }
    return NO;
}

+ (BOOL)WAAppCheckPackageValid:(NSString *)appId error:(NSError **)error {
    NSFileManager *fileManager = [NSFileManager defaultManager];
    NSString *appZipPath = [self WAAppZipPath:appId];
    if ([fileManager fileExistsAtPath:appZipPath] && ![self WAAppUnZip:appId]) {
        [fileManager removeItemAtPath:appZipPath error:nil];
        *error = [WAError error:WAErrorFileUnzipFail];
        return NO;
    }
    
    NSString *pkgDir = [self WAAppPkgDir:appId];
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

+ (NSDictionary *)WAAppGlobalConfig:(NSString *)appId isGame:(BOOL)isGame error:(NSError **)error {
    NSString *appConfigPath = [self WAAppConfigPath:appId isGame:isGame];
    NSData *data = [[NSData alloc] initWithContentsOfFile:appConfigPath];
    NSDictionary *config = [data jsonValueDecoded];
    if (!config || ![config isKindOfClass:NSDictionary.class]) {
        *error = [WAError errorFileRead:appConfigPath.lastPathComponent];
        return nil;
    }
    return config;
}

+ (NSString *)WAAppTemplateHtml:(NSString *)appId error:(NSError **)error {
    NSString *pkgDir = [self WAAppPkgDir:appId];
    NSString *path = [pkgDir stringByAppendingPathComponent:@"view.html"];
    NSString *templateHtml = [[NSString alloc] initWithContentsOfFile:path encoding:NSUTF8StringEncoding error:nil];
    if (!templateHtml) {
        *error = [WAError errorFileRead:path.lastPathComponent];
        return nil;
    }
    return templateHtml;
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
    if ([WAUtility isEmptyStirng:originPath] || !appId) return nil;
    if ([originPath hasPrefix:@"http://"] || [originPath hasPrefix:@"https://"]) return originPath;
    
    if ([originPath hasPrefix:@"/"]) {//绝对路径
        if ([WAFileMgr isFullFilePath:originPath]) return originPath;//全路径
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
