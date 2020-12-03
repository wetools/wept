//
//  WAWebViewPageMgr.m
//  WeAppExample
//
//  Created by lionvoom on 2020/11/26.
//  Copyright © 2020 wept. All rights reserved.
//

#import "WAWebViewPageMgr.h"
#import "WAPageDataGenerator.h"
#import "WATabbarController.h"
#import "WAAppTask.h"
#import "WAUtility.h"
#import "WAMsgGenerator.h"
#import "WAWebViewMutiFuncMenuViewDataSource-Protocol.h"
#import "WAWebViewMutiFuncMenuViewDelegate-Protocol.h"

@interface WAWebViewPageMgr() <WAPageRouteDelegate, WAWebViewMutiFuncMenuViewDelegate, WAWebViewMutiFuncMenuViewDataSource>
@property(nonatomic, strong) WABaseViewController *appRootVC;
@end

@implementation WAWebViewPageMgr

- (instancetype)initWithAppTask:(WAAppTask *)appTask {
    if (self = [super init]) {
        self.appTask = appTask;
    }
    return self;
}

- (NSUInteger)stackPagesCount {
    NSUInteger count = self.navigationController.viewControllers.count;
    return count;
}

- (void)popAllWebViewPage {
    [self.navigationController dismissViewControllerAnimated:YES completion:nil];
}

- (BOOL)stackHasAppRootPage {
    return YES;
}

#pragma mark - route
- (void)launchHome {
    WABaseViewController *appRootVC = [self genAppRootVC:@"appLaunch"];
    self.appRootVC = appRootVC;
    self.navigationController.viewControllers = @[appRootVC];
    
    NSDictionary *msg = [WAMsgGenerator onAppRoute:appRootVC.pageModel.pageId path:appRootVC.pageModel.pagePath query:appRootVC.pageModel.query openType:@"appLaunch" scene:1001];
    if (msg) [self.appTask.socketServer sendMessageToService:msg];
}

- (void)backToHome {
    
}

- (void)switchTab:(NSString *)pagePath {
    
}

- (void)navigateBack:(NSUInteger)atIndexFromTop {
    
}

- (void)navigateTo:(NSString *)pagePath {
    WAWebViewPageData *model = [WAPageDataGenerator genSinglePageWithOpenType:@"navigateTo" pagePath:pagePath appTask:self.appTask];
    WAWebViewController *page = [self genPage:model];
    [self.navigationController pushViewController:page animated:YES];
    
    NSDictionary *msg = [WAMsgGenerator onAppRoute:page.pageModel.pageId path:page.pageModel.pagePath query:page.pageModel.query openType:@"navigateTo" scene:0];
    [self.appTask.socketServer sendMessageToService:msg];
}

- (void)redirectTo:(NSString *)pagePath {
    
}

- (void)reLaunch:(NSString *)pagePath {
    
}

- (void)restart {
    
}

/// appLaunch / reLaunch
- (WABaseViewController *)genAppRootVC:(NSString *)openType {
    WAAppOpenParameter *openParameter = self.appTask.taskOpenInfo;
    NSString *targetPage = openParameter.m_nsPagePath;
    openParameter.m_nsPagePath = nil;
    
    targetPage = targetPage ?: self.appTask.appGlobalConfig.appLaunchInfo.path;
    
    //TODO: tabbar
//    if ([self.appTask.appGlobalConfig isInTabbarItems:targetPage]) {
//        return nil;
//    }
    
    WAWebViewPageData *model = [WAPageDataGenerator genSinglePageWithOpenType:openType pagePath:targetPage appTask:self.appTask];
    WAWebViewController *page = [self genPage:model];
    return page;
}

- (WATabbarController *)genTabbarPageWithDefaultTabPath:(NSString *)pagePath openType:(NSString *)openType {
    WATabbarStyle *style = [WAPageDataGenerator genTabbarStyleWithEntryPagePath:pagePath appTask:self.appTask];
    WATabbarController *vc = [[WATabbarController alloc] init];
    return vc;
}

- (WAWebViewController *)genPage:(WAWebViewPageData *)model {
    WAWebViewController *vc = [WAWebViewController new];
    vc.pageModel = model;
    vc.appTask = self.appTask;
    return vc;
}

#pragma mark - WAWebViewMutiFuncMenuViewDelegate
- (void)onWebViewMenuBackHomePage {
    
}

- (void)onWebViewMenuBackPreviousPage {
    [self.navigationController popViewControllerAnimated:YES];
}

#pragma mark - WAWebViewMutiFuncMenuViewDataSource
- (WAWebViewNavLeftButtonType)leftButtonTypeForMultiFuncMenuView:(WAWebViewMutiFuncMenuView *)view {
    return [self stackHasAppRootPage] ? WAWebViewNavLeftButtonType_BackPreviousPage : WAWebViewNavLeftButtonType_BackHomePage;
}

@end
