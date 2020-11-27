//
//  WATabbarStyle.h
//  WeAppExample
//
//  Created by lionvoom on 2020/11/26.
//  Copyright © 2020 wept. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface WATabbarItemStyle : NSObject
@property (nonatomic, copy) NSString *text;
@property (nonatomic, copy) NSString *pagePath;
@property (nonatomic, copy) NSString *iconPath;
@property (nonatomic, copy) NSString *selectedIconPath;
@property (nonatomic, copy) NSString *iconURL;
@property (nonatomic, copy) NSString *selectedIconURL;
@property (nonatomic, assign) BOOL isDefaultPath;
@end



@interface WATabbarStyle : NSObject
@property (nonatomic, copy) UIColor *color;
@property (nonatomic, copy) UIColor *selectedColor;
@property (nonatomic, copy) UIColor *backgroundColor;
@property (nonatomic, copy) NSString *position;
@property (nonatomic, copy) NSString *borderStyle;
@property (nonatomic, copy) NSArray<WATabbarItemStyle*> *list;
@end

NS_ASSUME_NONNULL_END
