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
@property(nonatomic, weak) UINavigationController *m_navigationController;
@property(nonatomic, copy) NSDictionary *m_nsExtraParamInfo;
@property(nonatomic, copy) NSString *m_nsPagePath;
@property(nonatomic, copy) NSString *m_nsAppId;
@property(nonatomic, copy) NSString *m_nsAppName;
@property(nonatomic, copy) NSString *m_nsUserName;
@property(nonatomic, assign) BOOL m_isGameApp;
@end

NS_ASSUME_NONNULL_END
