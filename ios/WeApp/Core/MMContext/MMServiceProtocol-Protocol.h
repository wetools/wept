//
//  MMServiceProtocol-Protocol.h
//  WeAppExample
//
//  Created by lionvoom on 2020/11/17.
//  Copyright © 2020 wept. All rights reserved.
//

#import <Foundation/Foundation.h>

@protocol MMServiceProtocol <NSObject>

@optional
- (void)onServiceInit;
- (void)onServiceTerminate;
- (void)onServiceClearData;
- (void)onServiceMemoryWarning;
- (void)onServiceEnterForeground;
- (void)onServiceEnterBackground;
@end
