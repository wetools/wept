//
//  WAJSEventHandler_navigateTo.m
//  WeAppExample
//
//  Created by lionvoom on 2020/11/27.
//  Copyright © 2020 wept. All rights reserved.
//

#import "WAJSEventHandler_navigateTo.h"

@implementation WAJSEventHandler_navigateTo

- (void)handleJSEvent:(NSDictionary *)args {
    NSString *url = args[@"url"];
    if (!url) {
        [self endWithFail:@"url is empty"];
        return;
    }
    [self.appTask.pageMgr navigateTo:url];
    [self endWithOk:@{}];
}

@end
