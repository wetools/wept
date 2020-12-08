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

@interface WAWebViewPageMgr() <WAPageRouteDelegate, WAWebViewMutiFuncMenuViewDelegate, WAWebViewMutiFuncMenuViewDataSource, WATabbarControllerDelegate>
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
    WABaseViewController *appRootVC = [self genAppRootVC:kWAAppRoute_openType_appLaunch];
    self.appRootVC = appRootVC;
    self.navigationController.viewControllers = @[appRootVC];
}

- (void)backToHome {
    
}

- (void)switchTab:(NSString *)pagePath {
    
}

- (void)navigateBack:(NSUInteger)atIndexFromTop {
    
}

- (void)navigateTo:(NSString *)pagePath {
    WAWebViewPageData *model = [WAPageDataGenerator genSinglePageWithOpenType:kWAAppRoute_openType_navigateTo pagePath:pagePath appTask:self.appTask];
    WAWebViewController *page = [self genPage:model];
    [self.navigationController pushViewController:page animated:YES];
    
    NSDictionary *msg = [WAMsgGenerator onAppRoute:page.pageModel.pageId path:page.pageModel.pagePath query:page.pageModel.query openType:kWAAppRoute_openType_navigateTo scene:0];
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
    if ([self.appTask.appGlobalConfig isInTabbarItems:targetPage]) {
        WATabbarController *tabbarVC = [self genTabbarPageWithDefaultTabPath:targetPage openType:openType];
        tabbarVC.delegate = self;
        return tabbarVC;
    }
    
    WAWebViewPageData *model = [WAPageDataGenerator genSinglePageWithOpenType:openType pagePath:targetPage appTask:self.appTask];
    WAWebViewController *page = [self genPage:model];
    return page;
}

- (WATabbarController *)genTabbarPageWithDefaultTabPath:(NSString *)pagePath openType:(NSString *)openType {
    WATabbarStyle *style = [WAPageDataGenerator genTabbarStyleWithEntryPagePath:pagePath appTask:self.appTask];
    NSArray<WAWebViewPageData*> *tabbarPageModels = [WAPageDataGenerator genTabbarWithTabbarStyle:style openType:openType appTask:self.appTask];
    NSMutableArray *controllers = [NSMutableArray new];
    for (WAWebViewPageData *model in tabbarPageModels) {
        WAWebViewController *vc = [self genPage:model];
        [controllers addObject:vc];
    }
    WATabbarController *vc = [[WATabbarController alloc] init];
    vc.appTask = self.appTask;
    vc.viewControllers = controllers;
    vc.tabbarStyle = style;
    return vc;
}

- (WAWebViewController *)genPage:(WAWebViewPageData *)model {
    WAWebViewController *vc = [WAWebViewController new];
    vc.pageModel = model;
    vc.appTask = self.appTask;
    vc.delegate = self.appTask.pageMgr;
    return vc;
}

#pragma mark - APPSERVICE_ON_EVENT
- (void)onAppRoute:(WAWebViewPageData *)model openType:(NSString *)openType {
    NSDictionary *msg = [WAMsgGenerator onAppRoute:model.pageId path:model.pagePath query:model.query openType:openType scene:[openType isEqualToString:kWAAppRoute_openType_appLaunch] ? 1001 : 0];
    [self.appTask.socketServer sendMessageToService:msg];
}

- (void)onAppRouteDone:(WAWebViewPageData *)model openType:(NSString *)openType {
    NSDictionary *msg = [WAMsgGenerator onAppRouteDone:model.pageId path:model.pagePath query:model.query openType:openType];
    [self.appTask.socketServer sendMessageToService:msg];
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

#pragma mark - WATabbarControllerDelegate
- (void)tabBarController:(WATabbarController *)tabBarController didSelectDefaultIndex:(NSInteger)index {
    [tabBarController switchTabBarIndex:index isDefault:YES];
}

- (void)tabBarController:(WATabbarController *)tabBarController didSelectIndex:(NSInteger)index isChangedSelected:(BOOL)isChangedSelected {
    if (isChangedSelected) {
        [tabBarController switchTabBarIndex:index isDefault:NO];
    }
}

#pragma mark - WAWebViewDelegate
- (void)webViewDidLoad:(WAWebViewController *)vc {
    WAWebViewPageData *model = vc.pageModel;
    [self onAppRoute:model openType:model.openType];
}

- (void)webViewDidDisappear:(WAWebViewController *)vc {
    
}

- (void)webViewDidAppear:(WAWebViewController *)vc {
    if (!vc.firstTimeViewDidAppear) {
        WAWebViewPageData *model = vc.pageModel;
        NSString *openType = model.backType ?: model.openType;
        model.backType = nil;
        [self onAppRoute:model openType:openType];
        [self onAppRouteDone:model openType:openType];
    }
}

- (void)webViewContentDidFinished:(WAWebViewController *)vc {
    WAWebViewPageData *model = vc.pageModel;
    [self onAppRouteDone:model openType:model.openType];
}

- (void)webViewContentDidFail:(WAWebViewController *)vc withError:(NSError *)error {
    //TODO: WAWebViewController Fail
}

- (void)webviewDidManuallyTerminated:(WAWebViewController *)vc {
}

- (void)webViewDidTerminateInContentProcess:(WAWebViewController *)vc {
}

@end
