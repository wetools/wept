//
//  WAWebViewMutiFuncMenuViewDelegate-Protocol.h
//  WeAppExample
//
//  Created by lionvoom on 2020/11/27.
//  Copyright © 2020 wept. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@protocol WAWebViewMutiFuncMenuViewDelegate <NSObject>
@optional
- (void)onWebViewMenuBackHomePage;
- (void)onWebViewMenuBackPreviousPage;
@end

NS_ASSUME_NONNULL_END
