//
//  WAAppEnum.h
//  WeAppExample
//
//  Created by lionvoom on 2020/11/17.
//  Copyright © 2020 wept. All rights reserved.
//

#ifndef WAAppEnum_h
#define WAAppEnum_h
#import <Foundation/Foundation.h>

static NSString * const kWAAppHookURLScheme_file    = @"file";
static NSString * const kWAAppHookURLScheme_http    = @"http";
static NSString * const kWAAppHookURLScheme_wxfile  = @"wxfile";

static NSString * const kWAAppRoute_openType_appLaunch      = @"appLaunch";
static NSString * const kWAAppRoute_openType_navigateTo     = @"navigateTo";
static NSString * const kWAAppRoute_openType_navigateBack   = @"navigateBack";
static NSString * const kWAAppRoute_openType_switchTab      = @"switchTab";
static NSString * const kWAAppRoute_openType_redirectTo     = @"redirectTo";
static NSString * const kWAAppRoute_openType_reLaunch       = @"reLaunch";

typedef NS_ENUM(NSInteger, WAAppTaskPlatformState) {
    WAAppTaskPlatformState_Foreground       = 0,
    WAAppTaskPlatformState_Background       = 1,
};

typedef NS_ENUM(NSInteger, WAAppTaskCloseReason) {
    WAAppTaskCloseReason_Manually = 0,
    WAAppTaskCloseReason_AppLaunchFailure,
    WAAppTaskCloseReason_ExceedMaxConcurrentCountTask,
    WAAppTaskCloseReason_BackgroundTimeout,
};

#endif /* WAAppEnum_h */
