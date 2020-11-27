//
//  WACapsuleMenuDelegate-Protocol.h
//  WeAppExample
//
//  Created by lionvoom on 2020/11/22.
//  Copyright © 2020 wept. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@class WAWebViewController;

@protocol WACapsuleMenuDelegate <NSObject>

@optional
- (void)onMenuLongPressMore;
- (void)onMenuExit;
- (void)onMenuMore;
- (WAWebViewController *)getCurrentWebView;
@end

NS_ASSUME_NONNULL_END
