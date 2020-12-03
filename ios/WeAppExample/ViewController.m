//
//  ViewController.m
//  WeAppExample
//
//  Created by lionvoom on 2020/11/16.
//  Copyright © 2020 wept. All rights reserved.
//

#import "ViewController.h"
#import "MMContext.h"
#import "WAConfigMgr.h"
#import "WAAppPreloader.h"

static NSString *kDemoAppId = @"miniprogram";

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    NSString *path = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES).firstObject;
    NSLog(@"NSDocumentDirectory:%@", path);
}

- (IBAction)openWeApp:(UIButton *)sender {
    //准备debug包
    [WAConfigMgr WAAppPrepareDebugPackage:kDemoAppId];

    WAAppOpenParameter *parameter = [[WAAppOpenParameter alloc] init];
    parameter.m_nsAppId = kDemoAppId;
    parameter.m_nsUserName = @"wept-user";

    WAAppTaskHandlerWrapper *handlerWrapper = [[WAAppTaskHandlerWrapper alloc] init];
    handlerWrapper.completionHandler = ^(NSError * _Nonnull error) {
        if (error) {
            NSAssert(NO, error.localizedDescription);
        }
    };
    
    WAAppPreloader *preloader = [[MMContext currentContext] getService:WAAppPreloader.class];
    [preloader openApp:parameter taskExtInfo:nil handlerWrapper:handlerWrapper];
}

@end
