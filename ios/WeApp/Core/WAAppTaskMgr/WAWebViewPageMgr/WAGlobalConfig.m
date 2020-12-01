//
//  WAGlobalConfig.m
//  WeAppExample
//
//  Created by lionvoom on 2020/11/26.
//  Copyright © 2020 wept. All rights reserved.
//

#import "WAGlobalConfig.h"
#import "WAUtility.h"

@implementation WAAppLaunchInfo
@end



@implementation WAGlobalConfig

+ (NSDictionary *)modelCustomPropertyMapper {
    return @{@"globalWindow" : @"global.window"};
}

- (BOOL)isTabBarApp {
    return self.tabBar && [self.tabBar[@"list"] count] > 0;
}

- (BOOL)isPortraitOrientationApp {
    return !self.deviceOrientation || [self.deviceOrientation isEqualToString:@"portrait"];
}

@end
