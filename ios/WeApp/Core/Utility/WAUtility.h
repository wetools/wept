//
//  MAUIUtil.h
//  WeAppExample
//
//  Created by lionvoom on 2020/10/19.
//  Copyright © 2020 wept. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface WAUtility : NSObject

+ (NSString *)UserAgent;

/// 字符串是否为空
+ (BOOL)isEmptyStirng:(NSString *)str;

/**
 *  url query
 */
+ (NSDictionary *)getUrlQuery:(NSString *)url;

/**
 *  格式化html url
 *
 * 例1："/index/index" => "/index/index.html"
 * 例2："/index/index.html?id=1" => "/index/index.html?id=1"
 */
+ (NSString *)formatHtmlUrl:(NSString *)url;

/**
 *  格式化并去掉 url query
 *
 * 例1："/index/index.html?id=1" => "/index/index.html"
 * 例2："/index/index" => "/index/index.html"
 */
+ (NSString *)formatHtmlUrlAndRemoveQuery:(NSString *)url;

+ (BOOL)isEquelPagePath1:(NSString *)pagePath1 withPagePath2:(NSString *)pagePath2 isCheckQuery:(BOOL)isCheckQuery;

/// 获取本地文件的MIMEType
+ (NSString *)MIMETypeForLocalFilePath:(NSString *)path;

#pragma mark - UIKit (Extentsion)

+ (UIWindow *)keyWindow;

/// 获取当前控制器
+ (UIViewController *)getCurrentVC;

/// 获取某根控制器的顶层控制器
+ (UIViewController*)topViewController:(UIViewController*)rootViewController;

#pragma mark - UIColor
/**
 Creates and returns a color object from hex string.
 
 refer to UIColor+YYAdd.h
 
 fix: #fff
 */
+ (UIColor *)colorWithHexString:(NSString *)hexStr;

#pragma mark - Foundation (Extentsion)
/// 合并两个字典
+ (void)mutableDictionary:(NSMutableDictionary *)mDict merge:(NSDictionary *)dict;

@end

NS_ASSUME_NONNULL_END



#define kIsPad ([[UIDevice currentDevice] userInterfaceIdiom] == UIUserInterfaceIdiomPad)

#define kIsIPhone (UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiomPhone)

#define kIsIOS11  ([[[UIDevice currentDevice] systemVersion] floatValue] >= 11.f)

#define kIsIPhone_XSeries (kIsIOS11 && kIsIPhone && (MIN([UIScreen mainScreen].bounds.size.width, [UIScreen mainScreen].bounds.size.height) >= 375 && MAX([UIScreen mainScreen].bounds.size.width, [UIScreen mainScreen].bounds.size.height) >= 812))

#define kStatusBarHeight            (kIsIPhone_XSeries ? 44.0 : 20.0)

#define kSafeTopHeight              (kIsIPhone_XSeries ? 24.f : 0)
#define kDefaultNavigationBarHeight (64.f)
#define kSafeNavigationBarHeight    (kSafeTopHeight + kDefaultNavigationBarHeight)

#define kSafeBottomHeight           (kIsIPhone_XSeries ? 34.f : 0)
#define kDefaultTabbarHeight        (49.f)
#define kSafeTabbarHeight           (kSafeBottomHeight + kDefaultTabbarHeight)
