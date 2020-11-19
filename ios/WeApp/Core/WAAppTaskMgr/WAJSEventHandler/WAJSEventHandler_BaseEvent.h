//
//  WAJSEventHandler_BaseEvent.h
//  WeAppExample
//
//  Created by lionvoom on 2020/11/18.
//  Copyright © 2020 wept. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "WAAppTask.h"

NS_ASSUME_NONNULL_BEGIN

@interface WAJSEventHandler_BaseEvent : NSObject
@property(nonatomic, copy) NSString *api;
@property(nonatomic, copy) NSDictionary *args;
@property(nonatomic, weak) WAAppTask *appTask;
@property(nonatomic, copy) void(^completionHandler)(WAJSEventHandler_BaseEvent *handler, NSDictionary *res);

- (void)handleJSEvent:(NSDictionary *)args;

- (void)endWithResult:(NSDictionary *)res;

- (void)endWithOk:(NSDictionary *)data;

- (void)endWithFail:(NSString *)errMsg;

- (void)endWithCancel;

@end

NS_ASSUME_NONNULL_END
