//
//  WASocketClient.h
//  WeAppExample
//
//  Created by lionvoom on 2020/11/18.
//  Copyright © 2020 wept. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "PSWebSocket.h"

NS_ASSUME_NONNULL_BEGIN

@interface WASocketClient : NSObject

+ (NSString *)WebSocketProtocolForWebSocket:(PSWebSocket *)webSocket;

+ (NSString *)WebSocketProtocolForService:(BOOL)isGame;

+ (NSString *)WebSocketProtocolForWebviewId:(NSString *)webviewId;

- (instancetype)initWithWebSocket:(nullable PSWebSocket *)webSocket;

- (void)setWebSocket:(PSWebSocket *)webSocket;

- (void)removeWebSocket;

- (void)send:(NSString *)msg;

- (PSWebSocketReadyState)state;

@end

NS_ASSUME_NONNULL_END
