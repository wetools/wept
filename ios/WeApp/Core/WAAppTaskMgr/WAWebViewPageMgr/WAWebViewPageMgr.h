//
//  WAWebViewPageMgr.h
//  WeAppExample
//
//  Created by lionvoom on 2020/11/26.
//  Copyright © 2020 wept. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "WAWebViewController.h"

NS_ASSUME_NONNULL_BEGIN

@interface WAWebViewPageMgr : NSObject
@property (nonatomic, weak) WAAppTask *appTask;
@property(nonatomic, strong) UINavigationController *navigationController;

- (instancetype)initWithAppTask:(WAAppTask *)appTask;

- (void)popAllWebViewPage;

@end

NS_ASSUME_NONNULL_END
