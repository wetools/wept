//
//  WATabbarController.m
//  WeAppExample
//
//  Created by lionvoom on 2020/12/3.
//  Copyright © 2020 wept. All rights reserved.
//

#import "WATabbarController.h"
#import "YYKit.h"
#import "Masonry.h"
#import "WAUtility.h"
#import "WAAppTask.h"
#import "WeAppCustomTabbar.h"

@interface WATabbarController ()<WeAppCustomTabbarDelegate>
@property (nonatomic, strong) WeAppCustomTabbar *tabbar;
@property (nonatomic, weak) WAWebViewController *currentController;
@end

@implementation WATabbarController

- (void)dealloc {
    NSLog(@"%s", __func__);
}

- (void)viewDidLoad {
    [super viewDidLoad];
    self.view.backgroundColor = UIColor.whiteColor;
    self.automaticallyAdjustsScrollViewInsets = NO;
    [self setupTabbar];
}

- (void)setupTabbar {
    WATabbarStyle *style = self.tabbarStyle;
    self.tabbar = [[WeAppCustomTabbar alloc] initWithFrame:CGRectZero];
    self.tabbar.delegate = self;
    [self.view addSubview:_tabbar];
    [self.tabbar mas_makeConstraints:^(MASConstraintMaker *make) {
        make.bottom.equalTo(self.view);
        make.left.right.equalTo(self.view);
        make.height.mas_equalTo(kSafeTabbarHeight);
    }];
    [self.view layoutIfNeeded];
    [self.tabbar setTabbar:style];
}

- (void)updateChildConstraints {
    UIView *pageView = [self.view viewWithTag:-1];
    [pageView mas_makeConstraints:^(MASConstraintMaker *make) {
        make.top.left.right.equalTo(self.view);
        make.bottom.equalTo(self.tabbar.mas_top);
    }];
}

- (void)setViewControllers:(NSArray *)viewControllers {
    _viewControllers = viewControllers;
    for (UIViewController *vc in viewControllers) {
        [self addChildViewController:vc];
    }
}

- (void)switchTabBarIndex:(NSUInteger)index isDefault:(BOOL)isDefault {
    [[self.view viewWithTag:-1] removeFromSuperview];
    WAWebViewController *vc = self.childViewControllers[index];
    if (!isDefault) {
        vc.pageModel.openType = @"switchTab";
        vc.pageModel.backType = @"switchTab";
    }
    [self.view addSubview:vc.view];
    vc.view.tag = -1;
    [self updateChildConstraints];
    self.currentController = vc;
}

- (void)switchTabBar:(NSString *)pagePath {
    for (NSInteger i = 0; i < self.childViewControllers.count; i++) {
        WAWebViewController *vc = self.childViewControllers[i];
        if ([WAUtility isEquelPagePath1:vc.pageModel.pagePath withPagePath2:pagePath isCheckQuery:NO]) {
            [self.tabbar selectTabbarIndex:i];
            break;
        }
    }
}

#pragma mark - WeAppCustomTabbarDelegate
- (void)tabBar:(WeAppCustomTabbar *)tabbar didSelectDefaultIndex:(NSInteger)index {
    if (self.delegate && [self.delegate respondsToSelector:@selector(tabBarController:didSelectDefaultIndex:)]) {
        [self.delegate tabBarController:self didSelectDefaultIndex:index];
    }
}

- (void)tabBar:(WeAppCustomTabbar *)tabbar didSelectIndex:(NSInteger)index isChangedSelected:(BOOL)isChangedSelected {
    if (self.delegate && [self.delegate respondsToSelector:@selector(tabBarController:didSelectIndex:isChangedSelected:)]) {
        [self.delegate tabBarController:self didSelectIndex:index isChangedSelected:isChangedSelected];
    }
}

@end
