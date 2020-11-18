//
//  WAAppTask.m
//  WeAppExample
//
//  Created by lionvoom on 2020/11/17.
//  Copyright © 2020 wept. All rights reserved.
//

#import "WAAppTask.h"
#import "MMContext.h"
#import "WASocketClient.h"

@interface WAAppTask()
@property(copy, nonatomic) NSString *appId;
@property(copy, nonatomic) NSString *instanceId;
@property(nonatomic) unsigned long long appLaunchTimeInMs;
@property(copy, nonatomic) NSString *enterPath;
@property(strong, nonatomic) WAAppOpenParameter *taskOpenInfo;
@property(strong, nonatomic) WAAppTaskExtInfo *taskExtInfo;
@property(nonatomic) BOOL firstRenderFullCompleted;
@property(nonatomic) BOOL firstRenderCompleted;
@property(nonatomic) WAAppTaskPlatformState taskPlatformState;
@property (strong, nonatomic) WASocketServer *socketServer;
//@property(strong, nonatomic) WAJSCoreService *appService;
//@property(strong, nonatomic) WAWebViewPageMgr *pageMgr;
@end

@implementation WAAppTask

- (instancetype)initWithAppId:(NSString *)appId {
    self = [super init];
    if (self) {
        self.appId = appId;
    }
    return self;
}

- (void)setupSubModule {
    [self setupWebSocketServer:^(NSError * _Nullable error) {
        NSLog(@"");
    }];
}

- (void)openAppTask:(WAAppOpenParameter *)parameter taskExtInfo:(nullable WAAppTaskExtInfo *)taskExtInfo completeHandler:(nullable void (^)(NSError * _Nullable))completionHandler {
    self.taskOpenInfo = parameter;
    self.taskExtInfo = taskExtInfo;
    self.appLaunchTimeInMs = NSDate.date.timeIntervalSince1970*1000;
    completionHandler(nil);
}

- (void)closeTaskWithReason:(NSInteger)reason {
    
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

#pragma mark - setup
- (void)setupWebSocketServer:(void(^)(NSError *_Nullable error))completionHandler {
    NSString *wsProtocol = [WASocketClient WebSocketProtocolForService:self.taskOpenInfo.m_isGameApp];
    self.socketServer = [[WASocketServer alloc] initWithAppTask:self port:10001 wsProtocol:wsProtocol];
    [self.socketServer start:completionHandler];
}

@end
