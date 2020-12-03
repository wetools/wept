//
//  WeAppCustomTabbar.m
//  WeAppExample
//
//  Created by lionvoom on 2020/12/3.
//  Copyright © 2020 wept. All rights reserved.
//

#import "WeAppCustomTabbar.h"
#import "YYKit.h"
#import "Masonry.h"
#import "WAUtility.h"
#import "WATabbarStyle.h"
#import "WeAppCustomTabbarItem.h"

@interface WeAppCustomTabbar()
@property(nonatomic, strong) NSArray *items;
@property(nonatomic, assign) NSInteger selectedIndex;
@end

@implementation WeAppCustomTabbar

- (instancetype)initWithFrame:(CGRect)frame {
    self = [super initWithFrame:frame];
    if (self) {
        self.backgroundColor = UIColor.whiteColor;
    }
    return self;
}

- (void)setItems:(NSArray *)items {
    _items = items;
    [self removeAllSubviews];
    
    UIImageView *topLineView = [[UIImageView alloc] init];
    topLineView.tag = -1;
    topLineView.image = [UIImage imageWithColor:UIColorHex(0xcccccc) size:CGSizeMake(kScreenWidth, 0.5)];
    topLineView.backgroundColor = UIColor.whiteColor;
    [self addSubview:topLineView];
    [topLineView mas_makeConstraints:^(MASConstraintMaker *make) {
        make.top.left.right.equalTo(self);
        make.height.mas_equalTo(0.5);
    }];
    
    CGFloat itemSpace = 2;
    CGFloat itemWidth = (kScreenWidth - (items.count + 1) * itemSpace) / items.count;
    CGFloat itemHeight = kDefaultTabbarHeight;
    SEL sel = @selector(onBtnClick:);
    for (int i = 0; i < items.count; i++) {
        CGFloat offX = itemWidth * i + ( i+ 1 ) * itemSpace;
        WeAppCustomTabbarItem *btn = items[i];
        btn.frame = CGRectMake(offX, 0, itemWidth, itemHeight);
        [btn setupSubviews];
        btn.tag = i;
        [btn addTarget:self action:sel forControlEvents:UIControlEventTouchUpInside];
        [self addSubview:btn];
    }
}

- (void)setTabbar:(WATabbarStyle *)style {
    NSArray *items = style.list;
    if (!items || items.count < 2) return;
    NSMutableArray *mArr = [NSMutableArray new];
    for (int i = 0; i < items.count; i++) {
        WATabbarItemStyle *itemStyle = items[i];
        WeAppCustomTabbarItem *tabbarItem = [[WeAppCustomTabbarItem alloc] init];
        tabbarItem.itemStyle = itemStyle;
        tabbarItem.title = itemStyle.text;
        tabbarItem.normalColor = style.color ?: UIColor.lightGrayColor;
        tabbarItem.selectedColor = style.selectedColor ?: UIColor.blackColor;
        [mArr addObject:tabbarItem];
    }
    self.items = mArr;
}

#pragma mark - action
- (void)onBtnClick:(WeAppCustomTabbarItem *)sender {
    if (self.delegate && [self.delegate respondsToSelector:@selector(tabBar:didSelectIndex:)]) {
        [self.delegate tabBar:self didSelectIndex:sender.tag];
    }
}

@end

