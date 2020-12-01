//
//  WAWebViewDelegate-Protocol.h
//  WeAppExample
//
//  Created by lionvoom on 2020/11/22.
//  Copyright © 2020 wept. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "WAWebViewController.h"

NS_ASSUME_NONNULL_BEGIN

@protocol WAWebViewDelegate <NSObject>

@optional
- (void)layoutCapsuleMenu;
- (void)setCapsuleMenuState:(NSInteger)state;

- (BOOL)webViewIsFirstPage:(WAWebViewController *)vc;

- (void)webViewClickCustomRightButton:(WAWebViewController *)vc;
- (void)webViewClickExitButton:(WAWebViewController *)vc;
- (void)webViewBeforeClickReturnButton:(WAWebViewController *)vc;

- (void)killAppFrom:(WAWebViewController *)vc animate:(BOOL)animate reason:(NSInteger)reason;
- (void)enterBackgroundFrom:(WAWebViewController *)vc mode:(NSInteger)mode animate:(BOOL)animate completion:(void (^)(void))completion;

- (void)webViewDidLoad:(WAWebViewController *)vc;
- (void)webViewDidDisappear:(WAWebViewController *)vc;
- (void)webViewDidAppear:(WAWebViewController *)vc;
- (void)webviewDidManuallyTerminated:(WAWebViewController *)vc;
- (void)webViewDidTerminateInContentProcess:(WAWebViewController *)vc;

@end

NS_ASSUME_NONNULL_END
