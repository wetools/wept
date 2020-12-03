//
//  WAAppTask.m
//  WeAppExample
//
//  Created by lionvoom on 2020/11/17.
//  Copyright © 2020 wept. All rights reserved.
//

#import "WAAppTask.h"
#import "NSObject+YYModel.h"
#import "YYKitMacro.h"
#import "WAUtility.h"
#import "MMContext.h"
#import "WAAppTaskMgr.h"
#import "WAWebSocketMgr.h"
#import "WASocketClient.h"
#import "WAConfigMgr.h"
#import "WAPageDataGenerator.h"
#import "WAMsgGenerator.h"

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
@property(nonatomic, strong) WAGlobalConfig *appGlobalConfig;
@property(nonatomic, strong) WASocketServer *socketServer;
@property(nonatomic, strong) WAJSCoreService *appService;
@property(strong, nonatomic) WAWebViewPageMgr *pageMgr;
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

- (void)setupPageMgr {
    self.pageMgr = [[WAWebViewPageMgr alloc] initWithAppTask:self];
    
    dispatch_async(dispatch_get_main_queue(), ^{
        self.pageMgr.navigationController = (WANavigationController *)self.taskOpenInfo.m_navigationController;
        [self.pageMgr launchHome];
    });
}

- (void)resetTask {
    [self.socketServer release:nil];
    WAWebSocketMgr *webSocketMgr = [[MMContext currentContext] getService:WAWebSocketMgr.class];
    [webSocketMgr releasePort:self.socketServer.port];
    [self.pageMgr popAllWebViewPage];
}

#pragma mark -

- (void)openAppTask:(WAAppOpenParameter *)parameter taskExtInfo:(nullable WAAppTaskExtInfo *)taskExtInfo completeHandler:(nullable void (^)(NSError * _Nullable))completionHandler {
    self.isGameApp = parameter.m_isGameApp;
    self.taskOpenInfo = parameter;
    self.taskExtInfo = taskExtInfo;
    self.appLaunchTimeInMs = NSDate.date.timeIntervalSince1970*1000;
    
    NSError *error;
    NSDictionary *dict = [WAConfigMgr WAAppGlobalConfig:self.appId isGame:self.isGameApp error:&error];
    self.appGlobalConfig = [WAGlobalConfig modelWithDictionary:dict];
    if (error) {
        completionHandler(error);
        return;
    }
    
    self.templateHtml = [WAConfigMgr WAAppTemplateHtml:self.appId error:&error];
    if (error) {
        completionHandler(error);
        return;
    }
    
    @weakify(self);
    [self setupWebSocketServer:^(NSError * _Nullable error) {
        @strongify(self);
        if (error) {
            completionHandler(error);
            return;
        }
        [self setupService];
        [self setupPageMgr];
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

#pragma mark - WACapsuleMenuDelegate
- (void)onMenuMore {
    
}

- (void)onMenuExit {
    WAAppTaskMgr *appTaskManager = [[MMContext currentContext] getService:WAAppTaskMgr.class];
    [appTaskManager closeTask:self reason:0];
}

#pragma mark - WAWebViewDelegate
- (void)webViewDidLoad:(WAWebViewController *)vc {
    
}

- (void)webViewDidDisappear:(WAWebViewController *)vc {
    
}

- (void)webViewDidAppear:(WAWebViewController *)vc {
    WAWebViewPageData *model = vc.pageModel;
    NSDictionary *msg = [WAMsgGenerator onAppRoute:model.pageId path:model.pagePath query:model.query openType:model.backType scene:0];
    if (msg) [self.socketServer sendMessageToService:msg];
    
    NSDictionary *msg2 = [WAMsgGenerator onAppRouteDone:model.pageId path:model.pagePath query:model.query openType:model.backType];
    if (msg) [self.socketServer sendMessageToService:msg2];
}

- (void)webviewDidManuallyTerminated:(WAWebViewController *)vc {
}

- (void)webViewDidTerminateInContentProcess:(WAWebViewController *)vc {
}

@end
