//
//  MAUIUtil.m
//  MiniApp
//
//  Created by lionvoom on 2020/10/19.
//  Copyright © 2020 wept. All rights reserved.
//

#import "WAUIKitUtil.h"
#include <CoreServices/UTType.h>
#import "NSString+YYAdd.h"

@implementation WAUIKitUtil

+ (NSString *)UserAgent {
    static NSString *userAgent;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        userAgent = [[[UIWebView alloc] init] stringByEvaluatingJavaScriptFromString:@"navigator.userAgent"];
    });
    return userAgent;
}

+ (BOOL)isEmptyStirng:(NSString *)str {
    if (!str
        || ![str isKindOfClass:NSString.class]
        || str.length == 0
        || [str isEqualToString:@""]
        || [str isEqualToString:@"(null)"]) {
        return YES;
    }
    return NO;
}

+ (NSDictionary *)getUrlQuery:(NSString *)url {
    if (!url) { return nil; }
    NSMutableString *mStr = url.mutableCopy;
    NSArray *query = [mStr componentsSeparatedByString:@"?"];
    if (query.count != 2) {
        return nil;
    }
    
    NSMutableDictionary *parm = @{}.mutableCopy;
    NSArray *queryItems = [query.lastObject componentsSeparatedByString:@"&"];
    if (queryItems.count == 0) {
        return nil;
    }
    for (NSString *item in queryItems) {
        NSArray *keyValue = [item componentsSeparatedByString:@"="];
        if (keyValue.count != 2) {
            continue;
        }
        NSString *key = keyValue[0];
        NSString *value = keyValue[1];
        key = [key stringByURLDecode];
        value = [value stringByURLDecode];
        
        parm[key] = value;
    }
    return [parm copy];
}

+ (NSString *)formatHtmlUrl:(NSString *)url {
    NSArray *pathArray = [url componentsSeparatedByString:@"."];
    if(pathArray.count > 1) {
        return url;
    }
    return [url stringByAppendingString:@".html"];
}

+ (NSString *)formatHtmlUrlAndRemoveQuery:(NSString *)url {
    url = [url componentsSeparatedByString:@"?"].firstObject;
    return [self formatHtmlUrl:url];
}

+ (NSString *)MIMETypeForLocalFilePath:(NSString *)path {
    if (![[NSFileManager defaultManager] fileExistsAtPath:path]) return nil;
    NSString *extension = path.pathExtension;
    NSString *UTI = (__bridge_transfer NSString *)UTTypeCreatePreferredIdentifierForTag(kUTTagClassFilenameExtension, (__bridge CFStringRef)extension, NULL);
    NSString *contentType = (__bridge_transfer NSString *)UTTypeCopyPreferredTagWithClass((__bridge CFStringRef)UTI, kUTTagClassMIMEType);
    return contentType ?: @"application/octet-stream";
}

#pragma mark - UIKit
+ (UIWindow *)keyWindow {
    UIWindow *window = [[UIApplication sharedApplication] keyWindow];
    if (nil==window || window.windowLevel != UIWindowLevelNormal) {
        NSArray *windows = [[UIApplication sharedApplication] windows];
        for(UIWindow * tmpWin in windows) {
            if (tmpWin.windowLevel == UIWindowLevelNormal) {
                window = tmpWin;
                break;
            }
        }
    }
    return window;
}

///获取根控制器
+ (UIViewController *)rootVC {
    return [self keyWindow].rootViewController;
}

///获取当前控制器
+ (UIViewController *)getCurrentVC {
    return [self topViewController:[self rootVC]];
}

///获取某根控制器的顶层控制器
+ (UIViewController*)topViewController:(UIViewController*)rootViewController {
    if ([rootViewController isKindOfClass:[UITabBarController class]])
    {
        UITabBarController* tabBarController = (UITabBarController*)rootViewController;
        return [self topViewController:tabBarController.selectedViewController];
    }
    else if ([rootViewController isKindOfClass:[UINavigationController class]])
    {
        UINavigationController* nav = (UINavigationController*)rootViewController;
        return [self topViewController:nav.visibleViewController];
    }
    else if (rootViewController.presentedViewController)
    {
        UIViewController* presentedViewController = rootViewController.presentedViewController;
        return [self topViewController:presentedViewController];
    }
    else
    {
        return rootViewController;
    }
}



#pragma mark - UIColor

FOUNDATION_STATIC_INLINE NSUInteger hexStrToInt(NSString *str) {
    uint32_t result = 0;
    sscanf([str UTF8String], "%X", &result);
    return result;
}

FOUNDATION_STATIC_INLINE BOOL hexStrToRGBA(NSString *str, CGFloat *r, CGFloat *g, CGFloat *b, CGFloat *a) {
    NSCharacterSet *set = [NSCharacterSet whitespaceAndNewlineCharacterSet];
    str = [str stringByTrimmingCharactersInSet:set];
    if ([str hasPrefix:@"#"]) {
        str = [str substringFromIndex:1];
    } else if ([str hasPrefix:@"0X"]) {
        str = [str substringFromIndex:2];
    }
    
    NSUInteger length = [str length];
    //         RGB            RGBA          RRGGBB        RRGGBBAA
    if (length != 3 && length != 4 && length != 6 && length != 8) {
        return NO;
    }
    
    //RGB,RGBA,RRGGBB,RRGGBBAA
    if (length < 5) {
        NSString *_r = [str substringWithRange:NSMakeRange(0, 1)];
        NSString *_g = [str substringWithRange:NSMakeRange(1, 1)];
        NSString *_b = [str substringWithRange:NSMakeRange(2, 1)];
        *r = hexStrToInt([_r stringByAppendingString:_r]) / 255.0f;
        *g = hexStrToInt([_g stringByAppendingString:_g]) / 255.0f;
        *b = hexStrToInt([_b stringByAppendingString:_b]) / 255.0f;
        if (length == 4)  *a = hexStrToInt([str substringWithRange:NSMakeRange(3, 1)]) / 255.0f;
        else *a = 1;
    } else {
        *r = hexStrToInt([str substringWithRange:NSMakeRange(0, 2)]) / 255.0f;
        *g = hexStrToInt([str substringWithRange:NSMakeRange(2, 2)]) / 255.0f;
        *b = hexStrToInt([str substringWithRange:NSMakeRange(4, 2)]) / 255.0f;
        if (length == 8) *a = hexStrToInt([str substringWithRange:NSMakeRange(6, 2)]) / 255.0f;
        else *a = 1;
    }
    return YES;
}

+ (UIColor *)colorWithHexString:(NSString *)hexStr {
    CGFloat r, g, b, a;
    if (hexStrToRGBA(hexStr, &r, &g, &b, &a)) {
        return [UIColor colorWithRed:r green:g blue:b alpha:a];
    }
    return nil;
}

@end
