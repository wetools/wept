//
//  WAJSEventHandler_getNetworkType.m
//  WeAppExample
//
//  Created by lionvoom on 2020/11/19.
//  Copyright © 2020 wept. All rights reserved.
//

#import "WAJSEventHandler_getNetworkType.h"

@implementation WAJSEventHandler_getNetworkType

- (void)handleJSEvent:(NSDictionary *)args {
    NSDictionary *res = @{@"networkType": @"wifi"};
    [self endWithOk:res];
}

@end
