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
    UIPasteboard *pasteboard = [UIPasteboard generalPasteboard];
    NSDictionary *res = @{@"data": pasteboard.string ?: @""};
    [self endWithOk:res];
}

@end
