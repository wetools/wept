//
//  WAWebViewMutiFuncMenuView.h
//  WeAppExample
//
//  Created by lionvoom on 2020/11/27.
//  Copyright © 2020 wept. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "WAWebViewMutiFuncMenuViewDataSource-Protocol.h"
#import "WAWebViewMutiFuncMenuViewDelegate-Protocol.h"


NS_ASSUME_NONNULL_BEGIN

@interface WAWebViewMutiFuncMenuView : UIView
@property (nonatomic, weak) id<WAWebViewMutiFuncMenuViewDataSource> dataSource;
@property (nonatomic, weak) id<WAWebViewMutiFuncMenuViewDelegate> delegate;

- (void)startMenuTitleViewLoading;

- (void)stopMenuTitleViewLoading;

- (void)setMenuNavTitle:(NSString *)title;

- (void)setMenuNavTitleColor:(UIColor *)color;

- (void)setMenuNavBackgroundColor:(UIColor *)backgroundColor;

- (void)setLeftBtnHidden:(BOOL)hide;

@end

NS_ASSUME_NONNULL_END
