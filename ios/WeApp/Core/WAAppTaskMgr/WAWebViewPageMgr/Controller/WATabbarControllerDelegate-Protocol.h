//
//  WATabbarControllerDelegate-Protocol.h
//  WeAppExample
//
//  Created by wulinfeng on 2020/12/7.
//  Copyright © 2020 wept. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@class WATabbarController;

@protocol WATabbarControllerDelegate <NSObject>

@optional

- (void)tabBarController:(WATabbarController *)tabBarController didSelectDefaultIndex:(NSInteger)index;

- (void)tabBarController:(WATabbarController *)tabBarController didSelectIndex:(NSInteger)index isChangedSelected:(BOOL)isChangedSelected;

@end

NS_ASSUME_NONNULL_END
