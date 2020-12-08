//
//  WAWebViewPageMgr.h
//  WeAppExample
//
//  Created by lionvoom on 2020/11/26.
//  Copyright © 2020 wept. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "WANavigationController.h"
#import "WAWebViewController.h"
#import "WAPageRouteDelegate-Protocol.h"
#import "WAWebViewDelegate-Protocol.h"

@class WAAppTask;
@class WANavigationController;

NS_ASSUME_NONNULL_BEGIN

@interface WAWebViewPageMgr : NSObject <WAPageRouteDelegate, WAWebViewDelegate>
@property (nonatomic, weak) WAAppTask *appTask;
@property(nonatomic, strong) WANavigationController *navigationController;

- (instancetype)initWithAppTask:(WAAppTask *)appTask;

- (NSUInteger)stackPagesCount;

- (void)popAllWebViewPage;

@end

NS_ASSUME_NONNULL_END
