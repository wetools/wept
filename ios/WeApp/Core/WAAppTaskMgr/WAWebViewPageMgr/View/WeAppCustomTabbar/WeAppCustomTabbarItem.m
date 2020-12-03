//
//  WeAppCustomTabbarItem.m
//  WeAppExample
//
//  Created by lionvoom on 2020/12/3.
//  Copyright © 2020 wept. All rights reserved.
//

#import "WeAppCustomTabbarItem.h"
#import "WATabbarStyle.h"
#import "WAUtility.h"
#import "YYKit.h"

@interface WeAppCustomTabbarItem()
@property (nonatomic, strong) UIImageView *iconView;
@property (nonatomic, strong) UILabel *titleLabel;
@end

@implementation WeAppCustomTabbarItem

- (void)setupSubviews {
    [self addSubview:self.iconView];
    [self addSubview:self.titleLabel];
    self.titleLabel.text = self.title;
}

- (void)setSelected:(BOOL)selected {
    super.selected = selected;
    self.titleLabel.textColor = selected ? self.selectedColor : self.normalColor;
    UIImage *normalImage = [UIImage imageWithContentsOfFile:self.itemStyle.iconURL];
    UIImage *selectedImage = [UIImage imageWithContentsOfFile:self.itemStyle.selectedIconURL];
    self.iconView.image = selected ? selectedImage : normalImage;
}

- (UIImageView *)iconView {
    if (!_iconView) {
        _iconView = [[UIImageView alloc] initWithFrame:CGRectMake((self.frame.size.width-25)/2.0, 6, 25, 25)];
        _iconView.contentMode = UIViewContentModeScaleAspectFit;
    }
    return _iconView;
}

- (UILabel *)titleLabel {
    if (!_titleLabel) {
        _titleLabel = [[UILabel alloc] initWithFrame:CGRectMake(3, 49-15, self.frame.size.width-6, 14)];
        _titleLabel.font = [UIFont systemFontOfSize:10];
        _titleLabel.numberOfLines = 1;
        _titleLabel.textAlignment = NSTextAlignmentCenter;
    }
    return _titleLabel;
}

@end

