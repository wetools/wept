//
//  WAFileMgr.m
//  WeAppExample
//
//  Created by lionvoom on 2020/11/16.
//  Copyright © 2020 wept. All rights reserved.
//

#import "WAFileMgr.h"
#import "SSZipArchive.h"

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


