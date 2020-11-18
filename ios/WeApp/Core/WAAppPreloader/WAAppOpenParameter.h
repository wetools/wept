//
//  WAAppOpenParameter.h
//  WeAppExample
//
//  Created by lionvoom on 2020/11/16.
//  Copyright © 2020 wept. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface WAAppOpenParameter : NSObject
@property(weak, nonatomic) UINavigationController *m_navigationController;
@property(copy, nonatomic) NSDictionary *m_nsExtraParamInfo;
@property(copy, nonatomic) NSString *m_nsPagePath;
@property(copy, nonatomic) NSString *m_nsAppId;
@property(copy, nonatomic) NSString *m_nsAppName;
@property(copy, nonatomic) NSString *m_nsUserName;
@property(assign, nonatomic) BOOL m_isGameApp;
@end

NS_ASSUME_NONNULL_END
