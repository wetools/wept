//
//  WAPageStyle.h
//  WeAppExample
//
//  Created by lionvoom on 2020/11/26.
//  Copyright © 2020 wept. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface WAPageStyle : NSObject
@property (nonatomic, copy) NSString *backgroundTextStyle;
@property (nonatomic, copy) NSString *navigationBarTextStyle;
@property (nonatomic, copy) NSString *navigationBarTitleText;
@property (nonatomic, copy) NSString *navigationStyle;
@property (nonatomic, strong) UIColor *backgroundColor;
@property (nonatomic, strong) UIColor *navigationBarBackgroundColor;
@property (nonatomic, assign) BOOL enablePullDownRefresh;
@property (nonatomic, assign) BOOL disableScroll;
@property (readonly) BOOL navigationStyleDefault;
@end

NS_ASSUME_NONNULL_END
