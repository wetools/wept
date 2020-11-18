//
//  WASocketServer.m
//  WeAppExample
//
//  Created by wulinfeng on 2020/11/18.
//  Copyright © 2020 wept. All rights reserved.
//

#import "WASocketServer.h"
#import "PSWebSocketServer.h"
#import "YYKit.h"
#import "WASocketClient.h"
#import "WAMsgHandler.h"

@interface WASocketServer()<PSWebSocketServerDelegate>
@property (assign, nonatomic) NSInteger port;
@property (copy, nonatomic) NSString *wsProtocol;
@property (strong, nonatomic) NSMutableDictionary<NSString*, WASocketClient*> *socketClientsMap;
@property (strong, nonatomic) PSWebSocketServer *wsServer;
@property (assign, nonatomic) BOOL isRunning;
@property (assign, nonatomic) BOOL isReleased;
@property (copy, nonatomic) void(^startBlock)(NSError *error);
@property (copy, nonatomic) void(^stopBlock)(NSError *error);
@end

@implementation WASocketServer

- (void)dealloc {
    NSLog(@"⚠️%s", __func__);
}

- (instancetype)initWithAppTask:(nullable id)appTask port:(NSInteger)port wsProtocol:(NSString *)wsProtocol {
    self = [super init];
    if (self) {
        self.socketClientsMap = @{}.mutableCopy;
        self.port = port;
        self.wsProtocol = wsProtocol;
        self.wsServer = [PSWebSocketServer serverWithHost:@"127.0.0.1" port:self.port];
        self.wsServer.delegate = self;
    }
    return self;
}

#pragma mark - clients map
- (void)addSocketClient:(PSWebSocket *)webSocket {
    NSString *protocol = [WASocketClient WebSocketProtocolForWebSocket:webSocket];
    if (!protocol) return;
    
    WASocketClient *socketClient = self.socketClientsMap[protocol];
    if (!socketClient) {
        socketClient = [[WASocketClient alloc] initWithWebSocket:webSocket];
    } else {
        [socketClient setWebSocket:webSocket];
    }
    self.socketClientsMap[protocol] = socketClient;
}

- (WASocketClient *)getSocketClient:(NSString *)protocol {
    WASocketClient *socketClient = self.socketClientsMap[protocol];
    if (!socketClient) {
        socketClient = [[WASocketClient alloc] initWithWebSocket:nil];
        self.socketClientsMap[protocol] = socketClient;
    }
    return socketClient;
}

- (void)removeSocketClient:(NSString *)protocol {
    [self.socketClientsMap removeObjectForKey:protocol];
}

- (NSDictionary<NSString*, WASocketClient*> *)clientsMap {
    return self.socketClientsMap.copy;
}

#pragma mark - PSWebSocketServerDelegate
- (void)serverDidStart:(PSWebSocketServer *)server {
    NSLog(@"%s", __func__);
    dispatch_async(dispatch_get_main_queue(), ^{
        !self.startBlock ?: self.startBlock(nil);
        self.startBlock = nil;
    });
}

- (void)server:(PSWebSocketServer *)server didFailWithError:(NSError *)error {
    NSLog(@"⚠️%s", __func__);
    dispatch_async(dispatch_get_main_queue(), ^{
        !self.startBlock ?: self.startBlock(nil);
        self.startBlock = nil;
    });
}

- (void)serverDidStop:(PSWebSocketServer *)server {
    NSLog(@"⚠️%s", __func__);
    dispatch_async(dispatch_get_main_queue(), ^{
        !self.stopBlock ?: self.stopBlock(nil);
        self.stopBlock = nil;
    });
}

- (BOOL)server:(PSWebSocketServer *)server acceptWebSocketWithRequest:(NSURLRequest *)request {
    NSString *protocol = request.allHTTPHeaderFields[@"Sec-WebSocket-Protocol"];
    NSString *reg = @"(^(WEBVIEW_)[0-9]+(#(null)*#)$)|(^(APPSERVICE)(#(null)*#)$)|(^(GAMESERVICE)(#(null)*#)$)";
    NSPredicate *predicate = [NSPredicate predicateWithFormat:@"SELF MATCHES %@", reg];
    return  [predicate evaluateWithObject:protocol];
}

- (void)server:(PSWebSocketServer *)server webSocketDidOpen:(PSWebSocket *)webSocket {
    NSString *protocol = [WASocketClient WebSocketProtocolForWebSocket:webSocket];
    [self addSocketClient:webSocket];
    NSLog(@"%s ~~~~ %@: socketClient connected ~~~~", __func__, protocol);
}

- (void)server:(PSWebSocketServer *)server webSocket:(PSWebSocket *)webSocket didReceiveMessage:(id)message {
    NSDictionary *msgJSON = [message jsonValueDecoded];
    if (!msgJSON || ![msgJSON isKindOfClass:NSDictionary.class]) return;
    NSString *protocol = [WASocketClient WebSocketProtocolForWebSocket:webSocket];
    [self handle:msgJSON];
    NSLog(@"%@ ==> send message : %@", protocol, message);
}

- (void)server:(PSWebSocketServer *)server webSocket:(PSWebSocket *)webSocket didFailWithError:(NSError *)error {
    NSString *protocol = [WASocketClient WebSocketProtocolForWebSocket:webSocket];
    [self removeSocketClient:protocol];
    NSLog(@"⚠️%s, %@, error:%@", __func__, protocol, error);
}

- (void)server:(PSWebSocketServer *)server webSocket:(PSWebSocket *)webSocket didCloseWithCode:(NSInteger)code reason:(NSString *)reason wasClean:(BOOL)wasClean {
    NSLog(@"⚠️%s", __func__);
    NSString *protocol = [WASocketClient WebSocketProtocolForWebSocket:webSocket];
    [self removeSocketClient:protocol];
}

#pragma mark - handle
- (void)handle:(NSDictionary *)messageJSON {
    static NSDictionary *commandMap;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        NSArray *cmds =
        @[@"APPSERVICE_INVOKE", @"APPSERVICE_PUBLISH", @"APPSERVICE_ON_EVENT",
          @"WEBVIEW_INVOKE", @"WEBVIEW_PUBLISH", @"WEBVIEW_ON_EVENT"];
        NSMutableDictionary *mDict = [NSMutableDictionary dictionary];
        for (NSString *cmd in cmds) {
            NSString *className = [@"WAMsgHandler_" stringByAppendingString:cmd];
            mDict[cmd] = NSClassFromString(className);
        }
        commandMap = mDict;
    });
    NSString *command = messageJSON[@"command"];
    if (!command) return;
    Class handler = commandMap[command];
    if (!handler) return;
    [handler appTask:self.appTask handleMessage:messageJSON];
}

- (void)sendMessageToService:(NSDictionary *)msgJSON {
    if (!msgJSON || ![msgJSON isKindOfClass:NSDictionary.class]) return;
    [self _sendMessage:msgJSON toClient:self.wsProtocol];
}

- (void)sendMessageToWildWebview:(NSDictionary *)msgJSON {
    if (!msgJSON || ![msgJSON isKindOfClass:NSDictionary.class]) return;
    
    id webviewIds;
    NSDictionary *data = msgJSON[@"data"];
    if (data && [data isKindOfClass:NSDictionary.class]) {
        webviewIds = data[@"webviewIds"];
    }
    if (!webviewIds || [webviewIds isKindOfClass:NSNull.class]) {
        [self _sendMessageToAllViewClients:msgJSON];
        
    } else if ([webviewIds isKindOfClass:NSNumber.class]) {
        [self sendMessageToSpecialWebview:webviewIds message:msgJSON];
        
    } else if ([webviewIds isKindOfClass:NSArray.class]) {
        if ([webviewIds count] == 0) return;
        if ([webviewIds[0] isKindOfClass:NSNull.class]) {
            [self _sendMessageToAllViewClients:msgJSON];
        } else {
            for (NSString *clientId in (NSArray*)webviewIds) {
                [self sendMessageToSpecialWebview:clientId message:msgJSON];
            }
        }
    }
}

- (void)sendMessageToSpecialWebview:(NSString *)webviewId message:(NSDictionary *)msgJSON {
    if (!msgJSON || ![msgJSON isKindOfClass:NSDictionary.class]) return;
    NSString *wsProtocol = [WASocketClient WebSocketProtocolForWebviewId:webviewId];
    [self _sendMessage:msgJSON toClient:wsProtocol];
}

- (void)_sendMessageToAllViewClients:(NSDictionary *)msgJSON {
    NSDictionary<NSString*, WASocketClient*> *socketClientsMap = [self clientsMap];
    for (NSString *wsProtocol in socketClientsMap.allKeys) {
        if ([wsProtocol isEqualToString:self.wsProtocol]) continue;
        [self _sendMessage:msgJSON toClient:wsProtocol];
    }
}

- (void)_sendMessage:(NSDictionary *)msgJSON toClient:(NSString *)protocol {
    WASocketClient *socketClient = [self getSocketClient:protocol];
    [socketClient send:[msgJSON jsonStringEncoded]];
}

#pragma mark - public
- (void)start:(void(^)(NSError *error))complete {
    if (!self.isRunning) {
        self.isRunning = YES;
        self.startBlock = [complete copy];
        [self.wsServer start];
    }
}

- (void)stop:(void(^)(NSError *error))complete {
    if (self.isRunning) {
        self.isRunning = NO;
        self.stopBlock = [complete copy];
        [self.wsServer stop];
    }
}

- (void)release:(void(^)(NSError *error))complete {
    self.isReleased = YES;
    [self stop:complete];
//    [[CGHSocketConfig shared] releasePort:self.port];
}

@end
