//
//  WAMsgGenerator.m
//  WeAppExample
//
//  Created by lionvoom on 2020/11/27.
//  Copyright © 2020 wept. All rights reserved.
//

#import "WAMsgGenerator.h"
#import "WAUtility.h"

@implementation WAMsgGenerator

+ (NSDictionary *)onAppRoute:(NSInteger)webviewId path:(NSString *)path query:(NSDictionary *)query openType:(NSString *)openType scene:(NSInteger)scene {
    if (!path | !openType) return nil;
    path = [WAUtility formatHtmlUrlAndRemoveQuery:path];
    NSMutableDictionary *mData = @{@"webviewId": @(webviewId), @"path": path, @"query": query ?: @{}, @"openType": openType}.mutableCopy;
    if ([openType isEqualToString:@"appLaunch"]) {
        mData[@"scene"] = @(scene);
    }
    return [self APPSERVICE_ON_EVENT:@"onAppRoute" data:mData webviewID:@(webviewId)];
}

+ (NSDictionary *)onAppRouteDone:(NSInteger)webviewId path:(NSString *)path query:(NSDictionary *)query openType:(NSString *)openType {
    if (!path | !openType) return nil;
    path = [WAUtility formatHtmlUrlAndRemoveQuery:path];
    NSDictionary *data = @{@"webviewId": @(webviewId), @"path": path, @"query": query ?: @{}, @"openType": openType};
    return [self APPSERVICE_ON_EVENT:@"onAppRouteDone" data:data webviewID:@(webviewId)];
}

+ (NSDictionary *)onAppRunningStatusChange:(BOOL)active {
    return [self APPSERVICE_ON_EVENT:@"onAppRunningStatusChange" data:@{@"status": active ? @"active" : @"background"}];
}

+ (NSDictionary *)onAppEnterForeground:(NSString *)path query:(NSDictionary *)query {
    if (!path) return nil;
    path = [WAUtility formatHtmlUrlAndRemoveQuery:path];
    NSDictionary *data = @{@"path": path, @"query": query ?: @{}};
    return [self APPSERVICE_ON_EVENT:@"onAppEnterForeground" data:data];
}

+ (NSDictionary *)onAppEnterBackground {
    NSDictionary *data = @{@"targetAction": @(0), @"targetPagePath": @""};
    return [self APPSERVICE_ON_EVENT:@"onAppEnterBackground" data:data];
}

+ (NSDictionary *)APPSERVICE_ON_EVENT:(NSString *)eventName data:(NSDictionary *)data {
    return [self APPSERVICE_ON_EVENT:eventName data:data webviewID:nil];
}

+ (NSDictionary *)APPSERVICE_ON_EVENT:(NSString *)eventName data:(NSDictionary *)data webviewID:(NSNumber *)webviewID {
    return [self ON_EVENT_command:@"APPSERVICE_ON_EVENT" eventName:eventName data:data webviewID:webviewID];
}

+ (NSDictionary *)WEBVIEW_ON_EVENT:(NSString *)eventName data:(NSDictionary *)data {
    return [self WEBVIEW_ON_EVENT:eventName data:data webviewID:nil];
}

+ (NSDictionary *)WEBVIEW_ON_EVENT:(NSString *)eventName data:(NSDictionary *)data webviewID:(NSNumber *)webviewID {
    return [self ON_EVENT_command:@"WEBVIEW_ON_EVENT" eventName:eventName data:data webviewID:webviewID];
}

+ (NSDictionary *)ON_EVENT_command:(NSString *)command eventName:(NSString *)eventName data:(NSDictionary *)data webviewID:(NSNumber *)webviewID {
    NSDictionary *msg = @{@"command": command, @"data": @{@"eventName": eventName, @"data": data}};
    if (!webviewID) return msg;
    NSMutableDictionary *mMsg = msg.mutableCopy;
    mMsg[@"webviewID"] = webviewID;
    return mMsg;
}

@end

