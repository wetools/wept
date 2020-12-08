//
//  WAAppLaunchController.m
//  WeAppExample
//
//  Created by lionvoom on 2020/12/7.
//  Copyright © 2020 wept. All rights reserved.
//

#import "WAAppLaunchController.h"
#import "Masonry.h"
#import "YYKit.h"

@interface WAAppLaunchController ()
@property (nonatomic, strong) UILabel *titleLabel;
@property (nonatomic, strong) UIImageView *iconView;
@property (nonatomic, strong) CALayer *dotlayer;
@end

@implementation WAAppLaunchController

- (void)dealloc {
    [self.dotlayer removeAllAnimations];
}

- (void)viewDidLoad {
    [super viewDidLoad];
    self.view.backgroundColor = UIColor.whiteColor;
    [self setupSubviews];
}

- (void)viewWillAppear:(BOOL)animated {
    [super viewWillAppear:animated];
    [self.navigationController setNavigationBarHidden:YES animated:animated];
}

- (void)setupSubviews {
    self.iconView = [[UIImageView alloc] init];
    [self.view addSubview:self.iconView];
    
    UIFont *titleLabelFont = [UIFont preferredFontForTextStyle:UIFontTextStyleHeadline];
    CGFloat titleLabelHeight = titleLabelFont.ascender-titleLabelFont.descender;
    self.titleLabel = [[UILabel alloc] init];
    self.titleLabel.font = titleLabelFont;
    self.titleLabel.textColor = [UIColor blackColor];
    self.titleLabel.textAlignment = NSTextAlignmentCenter;
    [self.view addSubview:self.titleLabel];
    
    [self.iconView mas_makeConstraints:^(MASConstraintMaker *make) {
        make.centerX.equalTo(self.iconView.superview);
        make.centerY.mas_equalTo(-50);
        make.size.mas_equalTo(CGSizeMake(40, 40));
    }];
    
    [self.titleLabel mas_makeConstraints:^(MASConstraintMaker *make) {
        make.top.equalTo(self.iconView.mas_bottom).offset(15);
        make.left.mas_equalTo(10);
        make.right.mas_equalTo(-10);
        make.height.mas_equalTo(titleLabelHeight);
    }];
}

- (void)startLoading:(NSString *)appIconUrl title:(NSString *)title {
    self.titleLabel.text = title;
    UIImage *defaultIcon = [[UIImage imageWithColor:UIColor.lightGrayColor size:CGSizeMake(40, 40)] imageByRoundCornerRadius:20];
    [self.iconView setImageWithURL:[NSURL URLWithString:appIconUrl] placeholder:defaultIcon];
    
    [self.view layoutIfNeeded];
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.25 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        [self drawLoading:self.iconView space:4];
    });
}

- (void)drawLoading:(UIView *)view space:(CGFloat)space {
    CGFloat radius = space + MAX(view.width, view.height) / 2;
    
    UIBezierPath* path = [UIBezierPath bezierPath];
    [path addArcWithCenter:CGPointMake(view.layer.width / 2, view.layer.width / 2) radius:radius startAngle:-M_PI/2 endAngle:M_PI*3/2 clockwise:YES];

    // circle
    CAShapeLayer * caShapelayer = [CAShapeLayer layer];
    caShapelayer.path = path.CGPath;
    caShapelayer.lineWidth = 0.5f;
    caShapelayer.strokeColor = UIColor.lightGrayColor.CGColor;
    caShapelayer.fillColor = UIColor.clearColor.CGColor;
    [view.layer addSublayer:caShapelayer];
    
    // dot
    CGFloat dotWidth = 3;
    CALayer *dotlayer = [CALayer layer];
    dotlayer.frame = CGRectMake(0, 0, dotWidth, dotWidth);
    dotlayer.cornerRadius = dotWidth/2;
    dotlayer.position = CGPointMake(view.width/2, -space);
    dotlayer.backgroundColor = UIColorHex(0x3CB371).CGColor;
    [view.layer addSublayer:dotlayer];
    self.dotlayer = dotlayer;
    
    // animation
    CAKeyframeAnimation *animation = [CAKeyframeAnimation animation];
    animation.keyPath = @"position";
    animation.path = path.CGPath;
    animation.duration = 1.5;
    animation.repeatCount = MAXFLOAT;
    animation.timingFunction = [CAMediaTimingFunction functionWithName:kCAMediaTimingFunctionLinear];
    [dotlayer addAnimation:animation forKey:nil];
}

- (void)stopLoading:(dispatch_block_t)completion {
    
}

@end

