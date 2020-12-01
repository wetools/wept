//
//  WABaseViewController.h
//  WeAppExample
//
//  Created by lionvoom on 2020/11/16.
//  Copyright © 2020 wept. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "WAWebViewPageData.h"

NS_ASSUME_NONNULL_BEGIN
@class WAAppTask;

@interface WABaseViewController : UIViewController
@property (nonatomic, weak) WAAppTask *appTask;
@property (nonatomic, strong) WAWebViewPageData *pageModel;
@end

NS_ASSUME_NONNULL_END
