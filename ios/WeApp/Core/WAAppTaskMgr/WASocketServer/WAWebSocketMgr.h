//
//  WAWebSocketMgr.h
//  WeAppExample
//
//  Created by lionvoom on 2020/11/18.
//  Copyright © 2020 wept. All rights reserved.
//

#import "MMService.h"

NS_ASSUME_NONNULL_BEGIN

@interface WAWebSocketMgr : MMService

/// 分配可用端口
- (NSUInteger)getAvailablePort;

/// 释放端口
- (void)releasePort:(NSUInteger)port;

/// 分配webViewId
- (NSUInteger)getAvailableWebViewId;

@end

NS_ASSUME_NONNULL_END
