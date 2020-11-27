//
//  WAPageStyle.m
//  WeAppExample
//
//  Created by lionvoom on 2020/11/26.
//  Copyright © 2020 wept. All rights reserved.
//

#import "WAPageStyle.h"
#import "WAUtility.h"

@implementation WAPageStyle

- (BOOL)modelCustomTransformFromDictionary:(NSDictionary *)dic {
    NSDictionary *colorProperties =
    @{@"navigationBarBackgroundColor": UIColor.whiteColor,
      @"backgroundColor": UIColor.whiteColor};
    for (NSString *key in colorProperties.allKeys) {
        NSString *value = dic[key];
        UIColor *color = colorProperties[key];
        if (value && [value isKindOfClass:NSString.class]) {
            color = [WAUtility colorWithHexString:value];
        }
        [self setValue:color forKey:key];
    }
    
    _navigationBarTextStyle = [dic[@"navigationBarTextStyle"] isEqualToString:@"#000000"] ? @"white" : @"black";
    return YES;
}

- (BOOL)navigationStyleDefault {
    return ![self.navigationStyle isEqualToString:@"custom"];
}

@end
