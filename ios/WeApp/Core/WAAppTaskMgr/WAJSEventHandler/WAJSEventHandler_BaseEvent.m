//
//  WAJSEventHandler_BaseEvent.m
//  WeAppExample
//
//  Created by lionvoom on 2020/11/18.
//  Copyright © 2020 wept. All rights reserved.
//

#import "WAJSEventHandler_BaseEvent.h"

@implementation WAJSEventHandler_BaseEvent

- (void)handleJSEvent:(NSDictionary *)args {
    NSAssert(NO, @"subclass impl");
}

- (void)endWithResult:(NSDictionary *)res {
    if (self.completionHandler) self.completionHandler(self, res);
}

- (void)endWithOk:(NSDictionary *)data {
    NSString *msg = [NSString stringWithFormat:@"%@:ok", self.api];
    NSMutableDictionary *res = @{@"errMsg": msg}.mutableCopy;
    if (data && [data isKindOfClass:NSDictionary.class]) {
        [res addEntriesFromDictionary:data];
    }
    [self endWithResult:res];
}

- (void)endWithFail:(NSString *)errMsg {
    NSString *msg;
    if (errMsg) {
        msg = [NSString stringWithFormat:@"%@:%@ %@", @"fail", self.api, errMsg];
    } else {
        msg = [NSString stringWithFormat:@"%@:fail", self.api];
    }
    [self endWithResult:@{@"errMsg": msg}];
}

- (void)endWithCancel {
    NSString *msg = [NSString stringWithFormat:@"%@:cancel", self.api];
    [self endWithResult:@{@"errMsg": msg}];
}

@end
