//
//  WAAppTaskMgr.h
//  WeAppExample
//
//  Created by lionvoom on 2020/11/16.
//  Copyright © 2020 wept. All rights reserved.
//

#import "MMService.h"
#import "WAAppTask.h"

NS_ASSUME_NONNULL_BEGIN

@interface WAAppTaskMgr : MMService

- (void)openAppTask:(WAAppOpenParameter *)parameter taskExtInfo:(nullable WAAppTaskExtInfo *)taskExtInfo completeHandler:(nullable void(^)(NSError *_Nullable error))completionHandler;

- (void)closeTaskWithAppID:(NSString *)appId reason:(NSInteger)reason;

- (void)closeTask:(WAAppTask *)task reason:(NSInteger)reason;

- (void)closeBackgroundTask;

- (WAAppTask *)getTaskWithAppID:(NSString *)appId;

@end

NS_ASSUME_NONNULL_END
