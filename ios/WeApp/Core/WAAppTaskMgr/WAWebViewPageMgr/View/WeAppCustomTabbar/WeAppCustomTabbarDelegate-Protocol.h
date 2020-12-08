//
//  WeAppCustomTabbarDelegate-Protocol.h
//  WeAppExample
//
//  Created by lionvoom on 2020/12/3.
//  Copyright © 2020 wept. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@class WeAppCustomTabbar;

@protocol WeAppCustomTabbarDelegate <NSObject>

@optional
- (void)tabBar:(WeAppCustomTabbar *)tabbar didSelectDefaultIndex:(NSInteger)index;

- (void)tabBar:(WeAppCustomTabbar *)tabbar didSelectIndex:(NSInteger)index isChangedSelected:(BOOL)isChangedSelected;

@end

NS_ASSUME_NONNULL_END
