//
//  WATabbarStyle.m
//  WeAppExample
//
//  Created by lionvoom on 2020/11/26.
//  Copyright © 2020 wept. All rights reserved.
//

#import "WATabbarStyle.h"
#import "WAUtility.h"

@implementation WATabbarItemStyle
@end



@implementation WATabbarStyle

- (BOOL)modelCustomTransformFromDictionary:(NSDictionary *)dic {
    NSDictionary *colorProperties =
    @{@"color": UIColor.whiteColor,
      @"selectedColor": UIColor.darkTextColor,
      @"backgroundColor": UIColor.whiteColor};
    for (NSString *key in colorProperties.allKeys) {
        NSString *value = dic[key];
        UIColor *color = colorProperties[key];
        if (value && [value isKindOfClass:NSString.class]) {
            color = [WAUtility colorWithHexString:value];
        }
        [self setValue:color forKey:key];
    }
    return YES;
}

+ (NSDictionary *)modelContainerPropertyGenericClass {
    return @{@"list" : WATabbarItemStyle.class};
}

@end
