//
//  WASocketClient.m
//  WeAppExample
//
//  Created by lionvoom on 2020/11/18.
//  Copyright © 2020 wept. All rights reserved.
//

#import "WASocketClient.h"
#import "PSWebSocketDriver.h"

@interface WASocketClient()
@property (strong, nonatomic, nullable) PSWebSocket *webSocket;
@property (strong, nonatomic) NSMutableArray<NSString*> *msgQueue;
@end

@implementation WASocketClient

+ (NSString *)WebSocketProtocolForWebSocket:(PSWebSocket *)webSocket {
    PSWebSocketDriver *webSocketDriver = [webSocket valueForKey:@"_driver"];
    NSString *protocol = webSocketDriver.protocol;
    static NSString *APPSERVICE = @"APPSERVICE";
    static NSString *GAMESERVICE = @"GAMESERVICE";
    static NSString *WEBVIEW_ = @"WEBVIEW_";
    static NSString *Indicator = @"#";
    if ([protocol hasPrefix:APPSERVICE]) {
        return [APPSERVICE stringByAppendingString:@"##"];
    } if ([protocol hasPrefix:GAMESERVICE]) {
        return [GAMESERVICE stringByAppendingString:@"##"];
    } else if ([protocol hasPrefix:WEBVIEW_] && [protocol containsString:Indicator]) {
        NSUInteger _indicatorLocation = [protocol rangeOfString:Indicator].location;
        NSString *num = [protocol substringWithRange:NSMakeRange(WEBVIEW_.length, _indicatorLocation - WEBVIEW_.length)];
        return [NSString stringWithFormat:@"%@%@##", WEBVIEW_, num];
    }
    return protocol;
}

+ (NSString *)WebSocketProtocolForService:(BOOL)isGame {
    return isGame ? @"GAMESERVICE##" : @"APPSERVICE##";
}

+ (NSString *)WebSocketProtocolForWebviewId:(NSString *)webviewId {
    return [NSString stringWithFormat:@"WEBVIEW_%@##", webviewId];
}

- (instancetype)initWithWebSocket:(PSWebSocket *)webSocket {
    self = [super init];
    if (self) {
        self.webSocket = webSocket;
        self.msgQueue = @[].mutableCopy;
    }
    return self;
}

- (void)setWebSocket:(PSWebSocket *)webSocket {
    _webSocket = webSocket;
    
    if (self.webSocket) {
        NSString *protocol = [WASocketClient WebSocketProtocolForWebSocket:self.webSocket];
        NSLog(@"%s %@ msgQueue count: %lu", __func__, protocol, self.msgQueue.count);
        for (NSString *msg in self.msgQueue) {
            [self.webSocket send:msg];
            NSLog(@"%@ <== %@", protocol, msg);
        }
        self.msgQueue = @[].mutableCopy;
    }
}

- (void)removeWebSocket {
    self.webSocket = nil;
}

- (void)send:(NSString *)msg {
    if (!msg || ![msg isKindOfClass:NSString.class]) return;
    if (!self.webSocket || self.webSocket.readyState != PSWebSocketReadyStateOpen) {
        [self.msgQueue addObject:msg];
    } else {
        [self.webSocket send:msg];
        NSString *protocol = [WASocketClient WebSocketProtocolForWebSocket:self.webSocket];
        NSLog(@"%@ <== %@", protocol, msg);
    }
}

- (PSWebSocketReadyState)state {
    if (self.webSocket) {
        return self.webSocket.readyState;
    }
    return PSWebSocketReadyStateClosed;
}

@end
