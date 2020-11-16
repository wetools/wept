//
//  WAAppTaskHandlerWrapper.h
//  WeAppExample
//
//  Created by lionvoom on 2020/11/16.
//  Copyright © 2020 wept. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface WAAppTaskHandlerWrapper : NSObject
@property (copy, nonatomic) void(^completionHandler)(NSError *error);
@end

NS_ASSUME_NONNULL_END
