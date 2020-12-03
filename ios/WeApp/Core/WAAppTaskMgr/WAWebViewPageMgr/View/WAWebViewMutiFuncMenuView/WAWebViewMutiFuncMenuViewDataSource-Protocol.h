//
//  WAWebViewMutiFuncMenuViewDataSource-Protocol.h
//  WeAppExample
//
//  Created by lionvoom on 2020/11/27.
//  Copyright © 2020 wept. All rights reserved.
//

#import <Foundation/Foundation.h>
typedef NS_ENUM(NSUInteger, WAWebViewNavLeftButtonType) {
    WAWebViewNavLeftButtonType_BackPreviousPage,
    WAWebViewNavLeftButtonType_BackHomePage,
};

NS_ASSUME_NONNULL_BEGIN
@class WAWebViewMutiFuncMenuView;
@protocol WAWebViewMutiFuncMenuViewDataSource <NSObject>

- (WAWebViewNavLeftButtonType)leftButtonTypeForMultiFuncMenuView:(WAWebViewMutiFuncMenuView *)view;

@end

NS_ASSUME_NONNULL_END
