//
//  WAAppTask.h
//  WeAppExample
//
//  Created by lionvoom on 2020/11/17.
//  Copyright © 2020 wept. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "WAAppEnum.h"
#import "WAAppOpenParameter.h"
#import "WAAppTaskExtInfo.h"
#import "WASocketServer.h"

NS_ASSUME_NONNULL_BEGIN

@interface WAAppTask : NSObject
@property(readonly) NSString *appId;
@property(readonly) NSString *instanceId;
@property(readonly) unsigned long long appLaunchTimeInMs;
@property(readonly) NSString *enterPath;
@property(readonly) WAAppOpenParameter *taskOpenInfo;
@property(readonly) WAAppTaskExtInfo *taskExtInfo;
@property(readonly) BOOL firstRenderFullCompleted;
@property(readonly) BOOL firstRenderCompleted;
@property(readonly) WAAppTaskPlatformState taskPlatformState;
@property (readonly) WASocketServer *socketServer;
//@property(readonly) WAJSCoreService *appService;
//@property(readonly) WAWebViewPageMgr *pageMgr;

- (instancetype)initWithAppId:(NSString *)appId;

- (void)openAppTask:(WAAppOpenParameter *)parameter taskExtInfo:(nullable WAAppTaskExtInfo *)taskExtInfo completeHandler:(nullable void(^)(NSError *_Nullable error))completionHandler;

- (void)closeTaskWithReason:(NSInteger)reason;

- (void)taskEnterForeground:(NSInteger)reason;

- (void)taskEnterBackground:(NSInteger)reason;

@end

NS_ASSUME_NONNULL_END
