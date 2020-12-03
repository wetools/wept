//
//  WANavigationController.h
//  WeAppExample
//
//  Created by lionvoom on 2020/11/16.
//  Copyright © 2020 wept. All rights reserved.
//

#import <UIKit/UIKit.h>

@class WAAppTask;

NS_ASSUME_NONNULL_BEGIN

@interface WANavigationController : UINavigationController
@property (nonatomic, weak) WAAppTask *appTask;
@end

NS_ASSUME_NONNULL_END
