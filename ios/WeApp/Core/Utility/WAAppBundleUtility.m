//
//  WAAppBundleUtility.m
//  WeAppExample
//
//  Created by lionvoom on 2020/11/27.
//  Copyright © 2020 wept. All rights reserved.
//

#import "WAAppBundleUtility.h"
#import "WAFileMgr.h"

static NSString *WeAppBundlePath = nil;

@implementation WAAppBundleUtility

+ (void)initialize {
    NSString *bundleName = @"WeApp";
    NSString *bundlePath = [[NSBundle mainBundle] pathForResource:bundleName ofType:@"bundle"];
    NSBundle *bundle = [NSBundle bundleWithPath:bundlePath];
    if (!bundle) bundle = [NSBundle bundleWithPath:[[NSBundle bundleForClass:[WAFileMgr class]] pathForResource:bundleName ofType:@"bundle"]];
    NSURL *resourceBundleURL = bundle.bundleURL;
    if (resourceBundleURL) {
        WeAppBundlePath = [[NSBundle bundleWithURL:resourceBundleURL] resourcePath];
    }
}

+ (NSString *)filePathWithName:(NSString *)fileName {
    if (![fileName isKindOfClass:NSString.class] || !fileName.length) return nil;
    if (!WeAppBundlePath) return nil;
    NSString *filePath = [WeAppBundlePath stringByAppendingPathComponent:fileName];
    return filePath;
}

+ (UIImage *)imageWithName:(NSString *)imageName {
    if (![imageName isKindOfClass:NSString.class] || !imageName.length) return nil;
    if (!WeAppBundlePath) return nil;
    NSString *imagePath = [WeAppBundlePath stringByAppendingPathComponent:imageName];
    UIImage *image = [UIImage imageWithContentsOfFile:imagePath];
    return image;
}

+ (NSString *)textWithName:(NSString *)fileName {
    if (![fileName isKindOfClass:NSString.class] || !fileName.length) return nil;
    NSString *filePath = [WeAppBundlePath stringByAppendingPathComponent:fileName];
    NSError *error;
    NSString *text = [NSString stringWithContentsOfFile:filePath encoding:NSUTF8StringEncoding error:&error];
    return text;
}

@end


