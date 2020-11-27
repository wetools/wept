//
//  WAWebViewPageMgr.m
//  WeAppExample
//
//  Created by lionvoom on 2020/11/26.
//  Copyright © 2020 wept. All rights reserved.
//

#import "WAWebViewPageMgr.h"

@implementation WAWebViewPageMgr

- (instancetype)initWithAppTask:(WAAppTask *)appTask {
    if (self = [super init]) {
        self.appTask = appTask;
    }
    return self;
}

- (void)popAllWebViewPage {
    [self.navigationController dismissViewControllerAnimated:YES completion:nil];
}

@end
