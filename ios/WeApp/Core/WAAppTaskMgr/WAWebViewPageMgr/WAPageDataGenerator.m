//
//  WAWebViewPageDataLoader.m
//  WeAppExample
//
//  Created by lionvoom on 2020/11/26.
//  Copyright © 2020 wept. All rights reserved.
//

#import "WAPageDataGenerator.h"
#import "NSObject+YYModel.h"
#import "WAUtility.h"
#import "WAConfigMgr.h"

@implementation WAPageDataGenerator

+ (WAWebViewPageData *)genSinglePageWithOpenType:(NSString *)openType pagePath:(NSString *)pagePath appTask:(WAAppTask *)appTask {
    WAWebViewPageData *model = [WAWebViewPageData new];
    model.pageId = ++appTask.baseWebViewId;
    model.query = [WAUtility getUrlQuery:pagePath];
    model.pagePath = pagePath;
    model.openType = openType;
    model.pageStyle = [self genPageStyleWithPagePath:pagePath appTask:appTask];
    return model;
}

+ (WATabbarStyle *)genTabbarStyleWithEntryPagePath:(NSString *)pagePath appTask:(WAAppTask *)appTask {
    WAGlobalConfig *config = appTask.appGlobalConfig;
    NSString *basePath = [WAConfigMgr WAAppPkgDir:appTask.appId];
    NSDictionary *tabBar = config.tabBar;
    WATabbarStyle *style = [WATabbarStyle modelWithDictionary:tabBar];
    
    for (WATabbarItemStyle *itemStyle in style.list) {
        if ([WAUtility isEquelPagePath1:itemStyle.pagePath withPagePath2:pagePath isCheckQuery:NO]) {
            itemStyle.isDefaultPath = YES;
            itemStyle.pagePath = pagePath;
        }
        if (itemStyle.iconPath) {
            itemStyle.iconURL = [basePath stringByAppendingPathComponent:itemStyle.iconPath];
        }
        if (itemStyle.selectedIconPath) {
            itemStyle.selectedIconURL = [basePath stringByAppendingPathComponent:itemStyle.selectedIconPath];
        }
    }
    return style;
}

+ (NSArray<WAWebViewPageData*> *)genTabbarWithTabbarStyle:(WATabbarStyle *)style openType:(NSString *)openType appTask:(WAAppTask *)appTask {
    NSMutableArray *pageModels = [NSMutableArray new];
    NSUInteger defaultPathWebViewId = ++appTask.baseWebViewId;
    for (WATabbarItemStyle *itemStyle in style.list) {
        WAWebViewPageData *model = [WAWebViewPageData new];
        model.query = [WAUtility getUrlQuery:itemStyle.pagePath];
        model.pagePath = itemStyle.pagePath;
        model.openType = itemStyle.isDefaultPath ? openType : @"switchTab";
        model.pageStyle = [self genPageStyleWithPagePath:itemStyle.pagePath appTask:appTask];
        model.isTabbarVC = YES;
        model.pageId = itemStyle.isDefaultPath ? defaultPathWebViewId : (++appTask.baseWebViewId);
        [pageModels addObject:model];
    }
    return pageModels;
}

+ (WAPageStyle *)genPageStyleWithPagePath:(NSString *)pagePath appTask:(WAAppTask *)appTask {
    WAGlobalConfig *config = appTask.appGlobalConfig;
    NSDictionary *globalWindow = config.globalWindow ?: @{};
    NSMutableDictionary *mGlobalWindow = globalWindow.mutableCopy;
    
    NSString *pathKey = [WAUtility formatHtmlUrlAndRemoveQuery:pagePath];
    NSDictionary *pageStyle = config.page[pathKey][@"window"];
    [WAUtility mutableDictionary:mGlobalWindow merge:pageStyle];
    if (!mGlobalWindow[@"backgroundColor"]) mGlobalWindow[@"backgroundColor"] = UIColor.lightGrayColor;
    WAPageStyle *style = [WAPageStyle modelWithDictionary:mGlobalWindow];
    return style;
}

@end

