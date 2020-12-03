//
//  WeAppCustomTabbar.h
//  WeAppExample
//
//  Created by lionvoom on 2020/12/3.
//  Copyright © 2020 wept. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "WATabbarStyle.h"
#import "WeAppCustomTabbarDelegate-Protocol.h"
NS_ASSUME_NONNULL_BEGIN

@interface WeAppCustomTabbar : UIView
@property(readonly) NSInteger selectedIndex;
@property(nonatomic, weak) id<WeAppCustomTabbarDelegate> delegate;
- (void)setTabbar:(WATabbarStyle *)style;
@end

NS_ASSUME_NONNULL_END
