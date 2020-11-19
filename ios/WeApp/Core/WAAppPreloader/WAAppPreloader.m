//
//  WAAppPreloader.m
//  WeAppExample
//
//  Created by lionvoom on 2020/11/16.
//  Copyright © 2020 wept. All rights reserved.
//

#import "WAAppPreloader.h"
#import "WAError.h"
#import "WAFileMgr.h"
#import "MMContext.h"
#import "WAAppTaskMgr.h"

@interface WAAppPreloaderTask : NSObject
@property(nonatomic, strong) WAAppOpenParameter *m_openInfo;
@property(nonatomic, strong) WAAppTaskExtInfo *m_taskExtInfo;
@property(nonatomic, strong) WAAppTaskHandlerWrapper *m_handlerWrapper;
@end

@implementation WAAppPreloaderTask
@end



@interface WAAppPreloader()
@property (nonatomic, strong) NSMutableArray<WAAppPreloaderTask*> *m_preloaderTasks;
@end

@implementation WAAppPreloader

- (instancetype)init {
    self = [super init];
    if (self) {
        self.m_preloaderTasks = [NSMutableArray array];
    }
    return self;
}

- (WAAppPreloaderTask *)isExistsPreloaderTask:(NSString *)appId {
    for (WAAppPreloaderTask *task in self.m_preloaderTasks) {
        if ([task.m_openInfo.m_nsAppId isEqualToString:appId]) {
            return task;
        }
    }
    return nil;
}

- (void)openApp:(WAAppOpenParameter *)openParameter taskExtInfo:(nullable WAAppTaskExtInfo *)taskExtInfo handlerWrapper:(nullable WAAppTaskHandlerWrapper *)handlerWrapper {
    if (!openParameter.m_nsAppId.length || !openParameter.m_nsUserName.length) {
        NSError *error = [WAError error:WAErrorParameter desc:@"open WeApp username and appid is empty."];
        if (handlerWrapper.completionHandler) handlerWrapper.completionHandler(error);
        return;
    }
    //需要重启小程序
    if ([self shouldTaskBeReOpened:openParameter]) {
        [self reOpenApp:openParameter taskExtInfo:taskExtInfo handlerWrapper:handlerWrapper];
        return;
    }
    [self firstLoadApp:openParameter taskExtInfo:taskExtInfo handlerWrapper:handlerWrapper];
}

- (void)reOpenApp:(WAAppOpenParameter *)parameter taskExtInfo:(nullable WAAppTaskExtInfo *)taskExtInfo handlerWrapper:(nullable WAAppTaskHandlerWrapper *)handlerWrapper {
}

- (BOOL)shouldTaskBeReOpened:(WAAppOpenParameter *)parameter {
    return NO;
}

- (void)firstLoadApp:(WAAppOpenParameter *)openParameter taskExtInfo:(WAAppTaskExtInfo *)taskExtInfo handlerWrapper:(WAAppTaskHandlerWrapper *)handlerWrapper {
    WAAppPreloaderTask *task = [[WAAppPreloaderTask alloc] init];
    task.m_openInfo = openParameter;
    task.m_taskExtInfo = taskExtInfo;
    task.m_handlerWrapper = handlerWrapper;
    [self.m_preloaderTasks addObject:task];
    
    BOOL isPackageReady = [WAFileMgr WAAppIsPackageExists:openParameter.m_nsAppId];
    if (isPackageReady) {
        [self checkValidAndEnterApp:task];
        return;
    }
    
    //TODO: 预留:下载`小程序包`
}

- (void)checkValidAndEnterApp:(WAAppPreloaderTask *)preloaderTask {
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
        NSString *appId = preloaderTask.m_openInfo.m_nsAppId;
        NSError *error;
        if (![WAFileMgr WAAppCheckPackageValid:appId error:&error]) {
            if (preloaderTask.m_handlerWrapper.completionHandler) preloaderTask.m_handlerWrapper.completionHandler(error);
            return;
        }
        dispatch_async(dispatch_get_main_queue(), ^{
            [self finalyOpenApp:preloaderTask];
        });
    });
}


- (void)finalyOpenApp:(WAAppPreloaderTask *)preloaderTask {
    WAAppTaskMgr *appTaskMgr = [[MMContext currentContext] getService:WAAppTaskMgr.class];
    [appTaskMgr openAppTask:preloaderTask.m_openInfo taskExtInfo:preloaderTask.m_taskExtInfo completeHandler:preloaderTask.m_handlerWrapper.completionHandler];
}

@end
