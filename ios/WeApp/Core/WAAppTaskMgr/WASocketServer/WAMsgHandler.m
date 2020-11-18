//
//  WAMsgHandler.m
//  WeAppExample
//
//  Created by wulinfeng on 2020/11/18.
//  Copyright © 2020 wept. All rights reserved.
//

#import "WAMsgHandler.h"
#import "WAUIKitUtil.h"

@implementation WAMsgHandler
- (void)appTask:(WAAppTask *)appTask handleMessage:(NSDictionary *)msg {}
@end

@interface WAMsgHandler_APPSERVICE_INVOKE : WAMsgHandler
@end

@implementation WAMsgHandler_APPSERVICE_INVOKE
+ (void)appTask:(WAAppTask *)appTask handleMessage:(NSDictionary *)msg {
    NSDictionary *data = msg[@"data"];
    if (!data || ![data isKindOfClass:NSDictionary.class]) return;
    NSString *api = data[@"api"];
    NSInteger callbackID = [data[@"callbackID"] integerValue];
    NSDictionary *args = data[@"args"];
    if (!args || ![args isKindOfClass:NSDictionary.class]) return;
    
    void(^callback)(NSDictionary *result) = ^(NSDictionary *result) {
        NSDictionary *res =
        @{@"command": @"APPSERVICE_INVOKE_CALLBACK",
          @"data": @{@"callbackID": @(callbackID),
                     @"res": result ?: @{}}
          };
        [appTask.socketServer sendMessageToService:res];
    };
    
//    [target.manager serviceApiRequest:api param:args callback:^(NSDictionary *response) {
//        callback(response);
//    }];
}
@end



@interface WAMsgHandler_APPSERVICE_PUBLISH : WAMsgHandler
@end

@implementation WAMsgHandler_APPSERVICE_PUBLISH
+ (void)appTask:(WAAppTask *)appTask handleMessage:(NSDictionary *)messageJSON {
    [appTask.socketServer sendMessageToWildWebview:messageJSON];
}
@end



@interface WAMsgHandler_APPSERVICE_ON_EVENT : WAMsgHandler
@end

@implementation WAMsgHandler_APPSERVICE_ON_EVENT
+ (void)appTask:(WAAppTask *)appTask handleMessage:(NSDictionary *)messageJSON {
    [appTask.socketServer sendMessageToService:messageJSON];
}
@end



@interface WAMsgHandler_WEBVIEW_INVOKE : WAMsgHandler
@end

@implementation WAMsgHandler_WEBVIEW_INVOKE
+ (void)appTask:(WAAppTask *)appTask handleMessage:(NSDictionary *)messageJSON {
    NSDictionary *data = messageJSON[@"data"];
    if (!data || ![data isKindOfClass:NSDictionary.class]) return;
    NSString *api = data[@"api"];
    NSInteger callbackID = [data[@"callbackID"] integerValue];
    NSDictionary *args = data[@"args"];
    if (!args || ![args isKindOfClass:NSDictionary.class]) return;
    NSString *fromWebviewID = [NSString stringWithFormat:@"%@", messageJSON[@"fromWebviewID"]];
    if ([WAUIKitUtil isEmptyStirng:fromWebviewID]) return;

    void(^callback)(NSDictionary *result) = ^(NSDictionary *result) {
        NSDictionary *resultDict =
        @{@"command": @"WEBVIEW_INVOKE_CALLBACK",
          @"data": @{@"callbackID": @(callbackID),
                     @"res": result ?: @{}}
          };
        [appTask.socketServer sendMessageToSpecialWebview:fromWebviewID message:resultDict];
    };

//    [target.manager serviceApiRequest:api param:args callback:^(NSDictionary *response) {
//        callback(response);
//    }];
}
@end



@interface WAMsgHandler_WEBVIEW_PUBLISH : WAMsgHandler
@end

@implementation WAMsgHandler_WEBVIEW_PUBLISH
+ (void)appTask:(WAAppTask *)appTask handleMessage:(NSDictionary *)messageJSON {
    [appTask.socketServer sendMessageToWildWebview:messageJSON];
}
@end



@interface WAMsgHandler_WEBVIEW_ON_EVENT : WAMsgHandler
@end

@implementation WAMsgHandler_WEBVIEW_ON_EVENT
+ (void)appTask:(WAAppTask *)appTask handleMessage:(NSDictionary *)messageJSON {
    [appTask.socketServer sendMessageToService:messageJSON];
}
@end
