//
//  MMContext.h
//  WeAppExample
//
//  Created by lionvoom on 2020/11/17.
//  Copyright © 2020 wept. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

//简单实现(后期参考微信实现方式)
@interface MMContext : NSObject

+ (instancetype)currentContext;

- (id)getService:(Class)cls;

@end

NS_ASSUME_NONNULL_END
