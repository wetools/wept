//
//  WAWebSocketMgr.m
//  WeAppExample
//
//  Created by lionvoom on 2020/11/18.
//  Copyright © 2020 wept. All rights reserved.
//

#import "WAWebSocketMgr.h"

@interface WAWebSocketMgr()
@property (nonatomic, strong) NSMutableSet *portSet;
@property (nonatomic, assign) NSUInteger webViewId;
@end

@implementation WAWebSocketMgr

- (instancetype)init {
    self = [super init];
    if (self) {
        self.portSet = [NSMutableSet set];
    }
    return self;
}

/// 分配可用端口
- (NSUInteger)getAvailablePort {
    NSUInteger kMinPort = 9001;
    NSUInteger kMaxPort = kMinPort + 100;
    for (NSUInteger i = kMinPort; i <= kMaxPort; i++) {
        if (![self.portSet containsObject:@(i)]) {
            [self.portSet addObject:@(i)];
            return i;
        }
    }
    return NSNotFound;
}

/// 释放端口
- (void)releasePort:(NSUInteger)port {
    if ([self.portSet containsObject:@(port)]) {
        [self.portSet removeObject:@(port)];
    }
}

/// 分配webViewId
- (NSUInteger)getAvailableWebViewId {
    return _webViewId++;
}

@end
