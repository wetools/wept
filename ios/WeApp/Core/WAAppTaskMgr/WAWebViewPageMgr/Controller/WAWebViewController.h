//
//  WAWebViewController.h
//  WeAppExample
//
//  Created by lionvoom on 2020/11/22.
//  Copyright © 2020 wept. All rights reserved.
//

#import "WABaseViewController.h"
#import "WAWebViewDelegate-Protocol.h"

NS_ASSUME_NONNULL_BEGIN

@interface WAWebViewController : WABaseViewController
@property (nonatomic, weak) id<WAWebViewDelegate> delegate;
@property (nonatomic, assign) BOOL viewDidLoadFlag;
@property (nonatomic, assign) BOOL firstTimeViewDidAppear;
@end

NS_ASSUME_NONNULL_END
