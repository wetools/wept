//
//  WAAppTask.m
//  WeAppExample
//
//  Created by lionvoom on 2020/11/17.
//  Copyright © 2020 wept. All rights reserved.
//

#import "WAAppTask.h"
#import "YYKitMacro.h"
#import "MMContext.h"
#import "WAWebSocketMgr.h"
#import "WASocketClient.h"

@interface WAAppTask()
@property(nonatomic, copy) NSString *appId;
@property(nonatomic, assign) BOOL isGameApp;
@property(nonatomic, copy) NSString *instanceId;
@property(nonatomic, assign) unsigned long long appLaunchTimeInMs;
@property(nonatomic, copy) NSString *enterPath;
@property(nonatomic, strong) WAAppOpenParameter *taskOpenInfo;
@property(nonatomic, strong) WAAppTaskExtInfo *taskExtInfo;
@property(nonatomic, assign) BOOL firstRenderFullCompleted;
@property(nonatomic, assign) BOOL firstRenderCompleted;
@property(nonatomic, assign) WAAppTaskPlatformState taskPlatformState;
@property(nonatomic, strong) WASocketServer *socketServer;
@property(nonatomic, strong) WAJSCoreService *appService;
//@property(strong, nonatomic) WAWebViewPageMgr *pageMgr;
@end

@implementation WAAppTask

- (void)dealloc {
    NSLog(@"%s", __func__);
}

- (instancetype)initWithAppId:(NSString *)appId {
    self = [super init];
    if (self) {
        self.appId = appId;
    }
    return self;
}

- (void)setupWebSocketServer:(void(^)(NSError *_Nullable error))completionHandler {
    WAWebSocketMgr *webSocketMgr = [[MMContext currentContext] getService:WAWebSocketMgr.class];
    NSInteger port = [webSocketMgr getAvailablePort];
    NSString *wsProtocol = [WASocketClient WebSocketProtocolForService:self.taskOpenInfo.m_isGameApp];
    self.socketServer = [[WASocketServer alloc] initWithAppTask:self port:port wsProtocol:wsProtocol];
    [self.socketServer start:completionHandler];
}

- (void)setupService {
    self.appService = [[WAJSCoreService alloc] initWithAppTask:self port:self.socketServer.port];
    [self.appService startService];
}

- (void)resetTask {
    [self.socketServer release:nil];
    WAWebSocketMgr *webSocketMgr = [[MMContext currentContext] getService:WAWebSocketMgr.class];
    [webSocketMgr releasePort:self.socketServer.port];
}

#pragma mark -

- (void)openAppTask:(WAAppOpenParameter *)parameter taskExtInfo:(nullable WAAppTaskExtInfo *)taskExtInfo completeHandler:(nullable void (^)(NSError * _Nullable))completionHandler {
    self.isGameApp = parameter.m_isGameApp;
    self.taskOpenInfo = parameter;
    self.taskExtInfo = taskExtInfo;
    self.appLaunchTimeInMs = NSDate.date.timeIntervalSince1970*1000;
    
    @weakify(self);
    [self setupWebSocketServer:^(NSError * _Nullable error) {
        @strongify(self);
        NSLog(@"");
        if (!error) {
            [self setupService];
        }
    }];
    completionHandler(nil);
}

- (void)closeTaskWithReason:(NSInteger)reason {
    [self resetTask];
}

- (void)closeTask {
    [self closeTaskWithReason:WAAppTaskCloseReason_Manually];
}

- (void)taskEnterForeground:(NSInteger)reason {
    self.taskPlatformState = WAAppTaskPlatformState_Foreground;
}

- (void)taskEnterBackground:(NSInteger)reason {
    self.taskPlatformState = WAAppTaskPlatformState_Background;
}

@end
