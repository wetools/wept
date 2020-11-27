//
//  WAMsgGenerator.h
//  WeAppExample
//
//  Created by lionvoom on 2020/11/27.
//  Copyright © 2020 wept. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface WAMsgGenerator : NSObject

+ (NSDictionary *)onAppRoute:(NSInteger)webviewId path:(NSString *)path query:(NSDictionary *)query openType:(NSString *)openType scene:(NSInteger)scene;

+ (NSDictionary *)onAppRouteDone:(NSInteger)webviewId path:(NSString *)path query:(NSDictionary *)query openType:(NSString *)openType;

+ (NSDictionary *)APPSERVICE_ON_EVENT:(NSString *)eventName data:(NSDictionary *)data;
+ (NSDictionary *)APPSERVICE_ON_EVENT:(NSString *)eventName data:(NSDictionary *)data webviewID:(NSNumber *)webviewID;

+ (NSDictionary *)WEBVIEW_ON_EVENT:(NSString *)eventName data:(NSDictionary *)data;
+ (NSDictionary *)WEBVIEW_ON_EVENT:(NSString *)eventName data:(NSDictionary *)data webviewID:(NSNumber *)webviewID;

@end
