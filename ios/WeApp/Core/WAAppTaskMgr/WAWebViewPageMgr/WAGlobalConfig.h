//
//  WAGlobalConfig.h
//  WeAppExample
//
//  Created by lionvoom on 2020/11/26.
//  Copyright © 2020 wept. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface WAAppLaunchInfo :NSObject
@property (nonatomic, assign) NSInteger scene;
@property (nonatomic, copy) NSString *path;
@property (nonatomic, copy) NSDictionary *query;
@end



@interface WAGlobalConfig : NSObject
@property (nonatomic, copy) NSDictionary *globalWindow;
@property (nonatomic, copy) NSString *entryPagePath;
@property (nonatomic, copy) NSDictionary *tabBar;
@property (nonatomic, copy) NSDictionary *page;
@property (nonatomic, copy) NSString *deviceOrientation;
@property (nonatomic, strong) WAAppLaunchInfo *appLaunchInfo;

- (BOOL)isTabBarApp;

- (BOOL)isPortraitOrientationApp;

@end

NS_ASSUME_NONNULL_END
