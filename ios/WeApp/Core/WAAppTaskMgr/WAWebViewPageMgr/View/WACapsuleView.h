//
//  WACapsuleView.h
//  WeAppExample
//
//  Created by lionvoom on 2020/11/27.
//  Copyright © 2020 wept. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "WACapsuleMenuDelegate-Protocol.h"

NS_ASSUME_NONNULL_BEGIN

@interface WACapsuleView : UIView
@property (nonatomic, weak) id<WACapsuleMenuDelegate> delegate;
@end

NS_ASSUME_NONNULL_END
