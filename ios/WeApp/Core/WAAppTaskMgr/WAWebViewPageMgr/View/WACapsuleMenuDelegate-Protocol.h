//
//  WACapsuleMenuDelegate-Protocol.h
//  WeAppExample
//
//  Created by wulinfeng on 2020/11/27.
//  Copyright © 2020 wept. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@protocol WACapsuleMenuDelegate <NSObject>
@optional
- (void)onMenuExit;
- (void)onMenuMore;
@end

NS_ASSUME_NONNULL_END
