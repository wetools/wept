//
//  WAMsgHandler.h
//  WeAppExample
//
//  Created by wulinfeng on 2020/11/18.
//  Copyright © 2020 wept. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "WAAppTask.h"

NS_ASSUME_NONNULL_BEGIN

@interface WAMsgHandler : NSObject

+ (void)appTask:(WAAppTask *)appTask handleMessage:(NSDictionary *)msg;

@end

NS_ASSUME_NONNULL_END
