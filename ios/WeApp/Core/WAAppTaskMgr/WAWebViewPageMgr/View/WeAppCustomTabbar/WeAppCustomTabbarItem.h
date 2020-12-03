//
//  WeAppCustomTabbarItem.h
//  WeAppExample
//
//  Created by lionvoom on 2020/12/3.
//  Copyright © 2020 wept. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN
@class WATabbarItemStyle;

@interface WeAppCustomTabbarItem : UIControl
@property (nonatomic, strong) WATabbarItemStyle *itemStyle;
@property (nonatomic, copy) NSString *title;
@property (nonatomic, strong) UIColor *normalColor;
@property (nonatomic, strong) UIColor *selectedColor;
- (void)setupSubviews;
@end

NS_ASSUME_NONNULL_END
