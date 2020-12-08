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
@property(nonatomic, assign) NSInteger itemBaseTag;
@property(nonatomic, strong) NSArray *items;
@property(nonatomic, assign) NSInteger selectedIndex;
@end

@implementation WeAppCustomTabbar

- (instancetype)initWithFrame:(CGRect)frame {
    self = [super initWithFrame:frame];
    if (self) {
        self.backgroundColor = UIColor.whiteColor;
        self.itemBaseTag = 10;
    }
    return self;
}

- (void)setItems:(NSArray *)items {
    _items = items;
    [self removeAllSubviews];
    
    UIImageView *topLineView = [[UIImageView alloc] init];
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
        WeAppCustomTabbarItem *tabbarItem = items[i];
        tabbarItem.frame = CGRectMake(offX, 0, itemWidth, itemHeight);
        [tabbarItem setupSubviews];
        [tabbarItem addTarget:self action:sel forControlEvents:UIControlEventTouchUpInside];
        [self addSubview:tabbarItem];
    }
}

- (void)setTabbar:(WATabbarStyle *)style {
    NSArray *items = style.list;
    if (!items || items.count < 2) return;
    NSMutableArray *mArr = [NSMutableArray new];
    WeAppCustomTabbarItem *defaultTabbarItem;
    for (int i = 0; i < items.count; i++) {
        WATabbarItemStyle *itemStyle = items[i];
        WeAppCustomTabbarItem *tabbarItem = [[WeAppCustomTabbarItem alloc] init];
        tabbarItem.tag = self.itemBaseTag + i;
        tabbarItem.itemStyle = itemStyle;
        tabbarItem.title = itemStyle.text;
        tabbarItem.normalColor = style.color ?: UIColor.lightGrayColor;
        tabbarItem.selectedColor = style.selectedColor ?: UIColor.blackColor;
        [mArr addObject:tabbarItem];
        if (itemStyle.isDefaultPath) {
            defaultTabbarItem = tabbarItem;
        }
    }
    self.items = mArr;
    [self selectDefaultTabbarItem:defaultTabbarItem];
}

- (void)selectDefaultTabbarItem:(WeAppCustomTabbarItem *)tabbarItem {
    [self selectTabbarItem:tabbarItem];
    if (self.delegate && [self.delegate respondsToSelector:@selector(tabBar:didSelectDefaultIndex:)]) {
        [self.delegate tabBar:self didSelectDefaultIndex:tabbarItem.tag - self.itemBaseTag];
    }
}

- (void)selectTabbarItem:(WeAppCustomTabbarItem *)tabbarItem {
    NSInteger index = [self.items indexOfObject:tabbarItem];
    for (NSInteger i = 0; i < self.items.count; i++) {
        WeAppCustomTabbarItem *btn = [self viewWithTag:self.itemBaseTag + i];
        btn.selected = i == index;
    }
}

#pragma mark - action
- (void)onBtnClick:(WeAppCustomTabbarItem *)barItem {
    NSInteger index = [self.items indexOfObject:barItem];
    [self selectTabbarIndex:index];
}

- (void)selectTabbarIndex:(NSUInteger)tabbarIndex {
    WeAppCustomTabbarItem *barItem = self.items[tabbarIndex];
    BOOL isSelected = barItem.isSelected;
    if (!isSelected) [self selectTabbarItem:barItem];
    if (self.delegate && [self.delegate respondsToSelector:@selector(tabBar:didSelectIndex:isChangedSelected:)]) {
        [self.delegate tabBar:self didSelectIndex:barItem.tag - self.itemBaseTag isChangedSelected:!isSelected];
    }
}

@end

