//
//  WAAppPreloader.h
//  WeAppExample
//
//  Created by lionvoom on 2020/11/16.
//  Copyright © 2020 wept. All rights reserved.
//

#import "MMService.h"
#import "WAAppOpenParameter.h"
#import "WAAppTaskExtInfo.h"
#import "WAAppTaskHandlerWrapper.h"

NS_ASSUME_NONNULL_BEGIN

@interface WAAppPreloader : MMService

/// 启动小程序
/// @param parameter 启动参数
/// @param taskExtInfo 扩展参数
/// @param handlerWrapper 回调
- (void)openApp:(WAAppOpenParameter *)parameter taskExtInfo:(nullable WAAppTaskExtInfo *)taskExtInfo handlerWrapper:(nullable WAAppTaskHandlerWrapper *)handlerWrapper;

/// 重启小程序
/// @param parameter 启动参数
/// @param taskExtInfo 扩展参数
/// @param handlerWrapper 回调
- (void)reOpenApp:(WAAppOpenParameter *)parameter taskExtInfo:(nullable WAAppTaskExtInfo *)taskExtInfo handlerWrapper:(nullable WAAppTaskHandlerWrapper *)handlerWrapper;

@end

NS_ASSUME_NONNULL_END
