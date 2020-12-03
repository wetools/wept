//
//  WAWebViewMutiFuncMenuView.m
//  WeAppExample
//
//  Created by lionvoom on 2020/11/27.
//  Copyright © 2020 wept. All rights reserved.
//

#import "WAWebViewMutiFuncMenuView.h"
#import "YYKit.h"
#import "WAAppBundleUtility.h"

@interface WAWebViewMutiFuncMenuView()
@property (nonatomic, strong) UIButton *leftButton;
@property (nonatomic, strong) UILabel *titleLabel;
@property (nonatomic, weak) UIActivityIndicatorView *activityIndicatorView;

@property (nonatomic, assign) WAWebViewNavLeftButtonType leftBtnType;
@end

@implementation WAWebViewMutiFuncMenuView

- (instancetype)initWithFrame:(CGRect)frame {
    if (self = [super initWithFrame:frame]) {
        self.titleLabel = [UILabel new];
        self.titleLabel.textColor = UIColor.whiteColor;
        self.titleLabel.textAlignment = NSTextAlignmentCenter;
        [self addSubview:self.titleLabel];
        
        self.leftButton = [UIButton buttonWithType:UIButtonTypeSystem];
        self.leftButton.tintColor = [UIColor whiteColor];
        self.leftButton.contentHorizontalAlignment = UIControlContentHorizontalAlignmentLeft;
        [self addSubview:self.leftButton];
        [self.leftButton addTarget:self action:@selector(leftButtonAction:) forControlEvents:UIControlEventTouchUpInside];
        [self setLeftBtnType:WAWebViewNavLeftButtonType_BackPreviousPage];
    }
    
    return self;
}

- (void)layoutSubviews {
    [super layoutSubviews];

    CGFloat width = self.bounds.size.width;
    CGFloat height = self.bounds.size.height;
    CGFloat top =  [UIApplication sharedApplication].statusBarFrame.size.height;
    CGFloat controlHeight = height - top;
    CGFloat btnWidth = height;
    CGFloat textWidth = [_titleLabel.text sizeForFont:_titleLabel.font size:CGSizeMake(kScreenWidth-212, 20) mode:NSLineBreakByWordWrapping].width+1;
    
    self.leftButton.frame = CGRectMake(0, top, btnWidth, controlHeight);
    
    if (self.activityIndicatorView) {
        self.activityIndicatorView.frame = CGRectMake((width-textWidth-20)/2, 0, 20, 20);
        self.activityIndicatorView.centerY = self.titleLabel.centerY;
        self.titleLabel.frame = CGRectMake(self.activityIndicatorView.right, top, textWidth, controlHeight);
        
    } else {
        self.titleLabel.frame = CGRectMake((width-textWidth)/2, top, textWidth, controlHeight);
    }
}

- (void)leftButtonAction:(UIButton *)btn {
    if (self.leftBtnType == WAWebViewNavLeftButtonType_BackPreviousPage) {
        if (self.delegate && [self.delegate respondsToSelector:@selector(onWebViewMenuBackPreviousPage)]) {
            [self.delegate onWebViewMenuBackPreviousPage];
        }
        
    } else if (self.leftBtnType == WAWebViewNavLeftButtonType_BackHomePage) {
        if (self.delegate && [self.delegate respondsToSelector:@selector(onWebViewMenuBackHomePage)]) {
            [self.delegate onWebViewMenuBackHomePage];
        }
    }
}

#pragma mark -
- (void)startMenuTitleViewLoading {
    if (self.activityIndicatorView && !self.activityIndicatorView.isAnimating) {
        [self.activityIndicatorView startAnimating];
        return;
    }
    
    UIActivityIndicatorView *activityIndicatorView = [[UIActivityIndicatorView alloc] initWithActivityIndicatorStyle:UIActivityIndicatorViewStyleWhite];
    activityIndicatorView.color = self.titleLabel.textColor;
    [self addSubview:activityIndicatorView];
    [self layoutIfNeeded];
    [activityIndicatorView startAnimating];
    
    self.activityIndicatorView = activityIndicatorView;
}

- (void)stopMenuTitleViewLoading {
    if (!self.activityIndicatorView) return;
    [self.activityIndicatorView stopAnimating];
    [self.activityIndicatorView removeFromSuperview];
    self.activityIndicatorView = nil;
}

- (void)setMenuNavTitle:(NSString *)title {
    self.titleLabel.text = title;
    [self setNeedsLayout];
    [self layoutIfNeeded];
}

- (void)setMenuNavBackgroundColor:(UIColor *)backgroundColor {
    self.backgroundColor = backgroundColor;
}

- (void)setMenuNavTitleColor:(UIColor *)color {
    self.titleLabel.textColor = color;
    self.activityIndicatorView.color = color;
    self.leftButton.tintColor = color;
}

- (void)setLeftBtnType:(WAWebViewNavLeftButtonType)type {
    if (_leftBtnType == type && self.leftButton.imageView.image) return;
    _leftBtnType = type;
    UIImage *image = type == WAWebViewNavLeftButtonType_BackPreviousPage ? [WAAppBundleUtility imageWithName:@"back"] : [[WAAppBundleUtility imageWithName:@"home"] imageByResizeToSize:CGSizeMake(18, 18)];
    [self.leftButton setImage:image forState:UIControlStateNormal];
    self.leftButton.imageEdgeInsets = type == WAWebViewNavLeftButtonType_BackPreviousPage ? UIEdgeInsetsMake(0, 16, 0, 0) : UIEdgeInsetsMake(0, 17, 0, 0);
}

- (void)setLeftBtnHidden:(BOOL)hidden {
    self.leftButton.hidden = hidden;
}

@end


