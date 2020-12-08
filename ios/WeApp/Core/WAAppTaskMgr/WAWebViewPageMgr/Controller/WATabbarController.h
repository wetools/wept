//
//  WATabbarController.h
//  WeAppExample
//
//  Created by lionvoom on 2020/12/3.
//  Copyright © 2020 wept. All rights reserved.
//

#import "WABaseViewController.h"
#import "WATabbarStyle.h"
#import "WAWebViewController.h"
#import "WATabbarControllerDelegate-Protocol.h"

NS_ASSUME_NONNULL_BEGIN

@interface WATabbarController : WABaseViewController
@property (nonatomic, strong) WATabbarStyle *tabbarStyle;
@property (nonatomic, strong) NSArray<WAWebViewController*> *viewControllers;
@property (nonatomic, weak, readonly) WAWebViewController *currentController;
@property (nonatomic, weak) id<WATabbarControllerDelegate> delegate;

- (void)switchTabBarIndex:(NSUInteger)index isDefault:(BOOL)isDefault;

- (void)switchTabBar:(NSString *)pagePath;

@end

NS_ASSUME_NONNULL_END
