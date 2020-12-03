//
//  WAPageRouteDelegate-Protocol.h
//  WeAppExample
//
//  Created by lionvoom on 2020/12/3.
//  Copyright © 2020 wept. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@protocol WAPageRouteDelegate <NSObject>

- (void)launchHome;

- (void)backToHome;

- (void)switchTab:(NSString *)pagePath;

- (void)navigateBack:(NSUInteger)atIndexFromTop;

- (void)navigateTo:(NSString *)pagePath;

- (void)redirectTo:(NSString *)pagePath;

- (void)reLaunch:(NSString *)pagePath;

- (void)restart;

@end

NS_ASSUME_NONNULL_END
