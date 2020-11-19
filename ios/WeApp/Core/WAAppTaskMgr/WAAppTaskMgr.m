//
//  WAAppTaskMgr.m
//  WeAppExample
//
//  Created by lionvoom on 2020/11/16.
//  Copyright © 2020 wept. All rights reserved.
//

#import "WAAppTaskMgr.h"
#import "YYKitMacro.h"
#import "NSURLProtocol+WebKitSupport.h"

@interface WAAppTaskMgr()
@property(nonatomic, strong) NSMutableDictionary<NSString*,WAAppTask*> *dicAppID2Task;
@end

@implementation WAAppTaskMgr

- (void)dealloc {
    [self unregisterNSURLProtocol];
}

- (instancetype)init {
    self = [super init];
    if (self) {
        self.dicAppID2Task = [NSMutableDictionary dictionary];
        [self registerNSURLProtocol];
    }
    return self;
}

- (void)openAppTask:(WAAppOpenParameter *)parameter taskExtInfo:(nullable WAAppTaskExtInfo *)taskExtInfo completeHandler:(nullable void (^)(NSError * _Nullable))completionHandler {
    NSString *appId = parameter.m_nsAppId;
    WAAppTask *task = [[WAAppTask alloc] initWithAppId:appId];
    self.dicAppID2Task[appId] = task;
    @weakify(self);
    [task openAppTask:parameter taskExtInfo:taskExtInfo completeHandler:^(NSError * _Nullable error) {
        @strongify(self);
        if (error) {
            WAAppTask *task = self.dicAppID2Task[appId];
            [task closeTaskWithReason:WAAppTaskCloseReason_AppLaunchFailure];
        }
        if (completionHandler) completionHandler(error);
    }];
    
    [self checkAndCloseExceedMaxConcurrentCountTask];
}

- (void)closeTaskWithAppID:(NSString *)appId reason:(NSInteger)reason {
    WAAppTask *task = self.dicAppID2Task[appId];
    if (!task) return;
    [self closeTask:task reason:reason];
}

- (void)closeTask:(WAAppTask *)task reason:(NSInteger)reason {
    [task closeTaskWithReason:reason];
    [self.dicAppID2Task removeObjectForKey:task.appId];
}

- (void)closeBackgroundTask {
    NSArray *tasks = self.dicAppID2Task.allValues;
    for (WAAppTask *task in tasks) {
        if (task.taskPlatformState == WAAppTaskPlatformState_Background) {
            [task closeTaskWithReason:WAAppTaskCloseReason_Manually];
        }
    }
}

- (WAAppTask *)getTaskWithAppID:(NSString *)appId {
    return self.dicAppID2Task[appId];
}

- (WAAppTask *)currentForegroundTask {
    return [self allTaskArray].lastObject;
}

#pragma mark -

- (NSArray *)allTaskArray {
    return [self.dicAppID2Task.allValues sortedArrayUsingComparator:^NSComparisonResult(WAAppTask *task1, WAAppTask *task2) {
        return task1.appLaunchTimeInMs < task2.appLaunchTimeInMs ? NSOrderedAscending : NSOrderedDescending;
    }];
}

- (NSUInteger)maxTaskRunningCount {
    return 2;
}

- (void)checkAndCloseExceedMaxConcurrentCountTask {
    NSPredicate *pred = [NSPredicate predicateWithFormat:@"taskPlatformState == %d", WAAppTaskPlatformState_Background];
    NSArray *tasks = [[self allTaskArray] filteredArrayUsingPredicate:pred];
    if (tasks.count > [self maxTaskRunningCount]) {
        [self closeTask:tasks[0] reason:WAAppTaskCloseReason_ExceedMaxConcurrentCountTask];
    }
    
    //test
//    tasks = [[self allTaskArray] filteredArrayUsingPredicate:pred];
//    NSLog(@"-----");
//    for (WAAppTask *task in tasks) {
//        NSLog(@"appId: %@, appLaunchTimeInMs:%llu", task.appId, task.appLaunchTimeInMs);
//    }
}

#pragma mark -
- (void)registerNSURLProtocol {
    [NSURLProtocol registerClass:NSClassFromString(@"WAAppURLProtocol")];
    [NSURLProtocol wk_registerScheme:kWAAppHookURLScheme_file];
    [NSURLProtocol wk_registerScheme:kWAAppHookURLScheme_http];
    [NSURLProtocol wk_registerScheme:kWAAppHookURLScheme_wxfile];
}

- (void)unregisterNSURLProtocol {
    [NSURLProtocol unregisterClass:NSClassFromString(@"WAAppURLProtocol")];
    [NSURLProtocol wk_unregisterScheme:kWAAppHookURLScheme_file];
    [NSURLProtocol wk_unregisterScheme:kWAAppHookURLScheme_http];
    [NSURLProtocol wk_unregisterScheme:kWAAppHookURLScheme_wxfile];
}

@end
