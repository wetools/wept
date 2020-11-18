//
//  PSWebSocketDriver+FixSecWebsocketProtocol.m
//  WeAppExample
//
//  Created by wulinfeng on 2020/11/18.
//  Copyright © 2020 wept. All rights reserved.
//

#import "PSWebSocketDriver+FixSecWebsocketProtocol.h"
#import <objc/runtime.h>

@implementation PSWebSocketDriver (FixSecWebsocketProtocol)
+ (void)load {
    [super load];
    method_exchangeImplementations(class_getInstanceMethod(self.class, NSSelectorFromString(@"start")),
                                   class_getInstanceMethod(self.class, @selector(hook_start)));
}

- (void)hook_start {
    NSURLRequest *request = [self valueForKey:@"_request"];
    self.protocol = request.allHTTPHeaderFields[@"Sec-WebSocket-Protocol"];
    [self hook_start];
}
@end
