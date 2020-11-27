//
//  WAWebViewPageDataLoader.h
//  WeAppExample
//
//  Created by lionvoom on 2020/11/26.
//  Copyright © 2020 wept. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "WAWebViewPageData.h"
#import "WAAppTask.h"

NS_ASSUME_NONNULL_BEGIN

@interface WAPageDataGenerator : NSObject

+ (WAWebViewPageData *)genSinglePageWithOpenType:(NSString *)openType pagePath:(NSString *)pagePath appTask:(WAAppTask *)appTask;

+ (WATabbarStyle *)genTabbarStyleWithEntryPagePath:(NSString *)pagePath appTask:(WAAppTask *)appTask;

+ (NSArray<WAWebViewPageData*> *)genTabbarWithTabbarStyle:(WATabbarStyle *)style openType:(NSString *)openType appTask:(WAAppTask *)appTask;

@end

NS_ASSUME_NONNULL_END
