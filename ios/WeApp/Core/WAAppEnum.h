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
