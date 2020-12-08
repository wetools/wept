//
//  WAAppLaunchController.h
//  WeAppExample
//
//  Created by lionvoom on 2020/12/7.
//  Copyright © 2020 wept. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface WAAppLaunchController : UIViewController

- (void)startLoading:(NSString *)appIconUrl title:(NSString *)title;

- (void)stopLoading:(dispatch_block_t)completion;

@end

NS_ASSUME_NONNULL_END
