//
//  WACapsuleView.m
//  WeAppExample
//
//  Created by lionvoom on 2020/11/27.
//  Copyright © 2020 wept. All rights reserved.
//

#import "WACapsuleView.h"
#import "YYKit.h"
#import "WAAppBundleUtility.h"

@interface WACapsuleView()
@property (nonatomic, strong) UIButton *menuMoreButton;
@property (nonatomic, strong) UIButton *menuExitButton;
@end

@implementation WACapsuleView

- (instancetype)initWithFrame:(CGRect)frame {
    if (self = [super initWithFrame:frame]) {
        [self setupMenuView];
    }
    return self;
}

- (void)setupMenuView {
    self.backgroundColor = [UIColor.whiteColor colorWithAlphaComponent:0.8];
    CGFloat itemWidth = CGRectGetWidth(self.frame)/2;
    CGFloat itemHeight = CGRectGetHeight(self.frame);
    
    self.layer.cornerRadius = itemHeight/2;
    self.layer.masksToBounds = YES;
    self.layer.borderWidth = 0.5;
    self.layer.borderColor = UIColor.lightGrayColor.CGColor;
    
    UIImage *moreIcon = [WAAppBundleUtility imageWithName:@"more"];
    self.menuMoreButton = [UIButton buttonWithType:UIButtonTypeCustom];
    self.menuMoreButton.frame = CGRectMake(0, 0, itemWidth, itemHeight);
    self.menuMoreButton.tintColor = [UIColor whiteColor];
    [self.menuMoreButton setImage:moreIcon forState:UIControlStateNormal];
    [self.menuMoreButton addTarget:self action:@selector(menuMoreButtonAction:) forControlEvents:UIControlEventTouchUpInside];
    [self addSubview:self.menuMoreButton];
    
    UIImage *exitIcon = [WAAppBundleUtility imageWithName:@"exit"];
    self.menuExitButton = [UIButton buttonWithType:UIButtonTypeCustom];
    self.menuExitButton.frame = CGRectMake(itemWidth, 0, itemWidth, itemHeight);
    [self.menuExitButton setImage:exitIcon forState:UIControlStateNormal];
    [self.menuExitButton addTarget:self action:@selector(menuExitButtonAction:) forControlEvents:UIControlEventTouchUpInside];
    [self addSubview:self.menuExitButton];
    
    UIView *_separatorLineView  = [[UIView alloc]initWithFrame:CGRectMake(itemWidth+0.5/2, (itemHeight-18)/2, 0.5, 18)];
    _separatorLineView.backgroundColor = UIColorHex(0xCCCCCC);
    [self addSubview:_separatorLineView];
}

#pragma mark - actions
- (void)menuMoreButtonAction:(UIButton *)btn {
    if (self.delegate && [self.delegate respondsToSelector:@selector(onMenuMore)]) {
        [self.delegate onMenuMore];
    }
}

- (void)menuExitButtonAction:(UIButton *)btn {
    if (self.delegate && [self.delegate respondsToSelector:@selector(onMenuExit)]) {
        [self.delegate onMenuExit];
    }
}

@end

