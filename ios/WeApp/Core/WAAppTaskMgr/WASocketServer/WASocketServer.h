//
//  WASocketServer.h
//  WeAppExample
//
//  Created by wulinfeng on 2020/11/18.
//  Copyright © 2020 wept. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface WASocketServer : NSObject
@property (nonatomic, weak) id appTask;
@property (readonly) NSInteger port;

- (instancetype)initWithAppTask:(nullable id)appTask port:(NSInteger)port wsProtocol:(NSString *)wsProtocol;

- (void)start:(nullable void(^)(NSError * _Nullable error))complete;

- (void)release:(nullable void(^)(NSError * _Nullable error))complete;

- (void)sendMessageToService:(NSDictionary *)msgJSON;

- (void)sendMessageToWildWebview:(NSDictionary *)msgJSON;

- (void)sendMessageToSpecialWebview:(NSString *)webviewId message:(NSDictionary *)msgJSON;

@end

NS_ASSUME_NONNULL_END
