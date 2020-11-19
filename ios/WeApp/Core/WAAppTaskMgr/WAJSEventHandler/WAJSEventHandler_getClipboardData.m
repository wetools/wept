//
//  WAJSEventHandler_getClipboardData.m
//  WeAppExample
//
//  Created by lionvoom on 2020/11/19.
//  Copyright © 2020 wept. All rights reserved.
//

#import "WAJSEventHandler_getClipboardData.h"

@implementation WAJSEventHandler_getClipboardData

- (void)handleJSEvent:(NSDictionary *)args {
    NSDictionary *res = @{@"data": @""};
    [self endWithOk:res];
}

@end
