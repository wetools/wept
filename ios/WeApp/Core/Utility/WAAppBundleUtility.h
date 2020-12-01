//
//  WAAppBundleUtility.h
//  WeAppExample
//
//  Created by lionvoom on 2020/11/27.
//  Copyright © 2020 wept. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface WAAppBundleUtility : NSObject

+ (NSString *)filePathWithName:(NSString *)fileName;

+ (UIImage *)imageWithName:(NSString *)imageName;

+ (NSString *)textWithName:(NSString *)fileName;

@end

NS_ASSUME_NONNULL_END
