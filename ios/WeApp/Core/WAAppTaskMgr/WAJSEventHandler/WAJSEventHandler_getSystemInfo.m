//
//  WAJSEventHandler_getSystemInfo.m
//  WeAppExample
//
//  Created by lionvoom on 2020/11/19.
//  Copyright © 2020 wept. All rights reserved.
//

#import "WAJSEventHandler_getSystemInfo.h"
#import "NSString+YYAdd.h"

@implementation WAJSEventHandler_getSystemInfo

- (void)handleJSEvent:(NSDictionary *)args {
    NSString *str =
    @"{\"benchmarkLevel\":1,\"language\":\"en\",\"spUserId\":\"aik5cAUdtB4=\",\"safeArea\":{\"right\":375,\"height\":647,\"top\":20,\"width\":375,\"left\":0,\"bottom\":667},\"brand\":\"devtools\",\"SDKVersion\":\"2.8.2\",\"screenHeight\":667,\"miniFrameworkVersion\":\"2.2\",\"windowHeight\":667,\"system\":\"iOS 13.7\",\"fontSizeSetting\":17,\"version\":\"1.0\",\"statusBarHeight\":20,\"windowWidth\":375,\"pixelRatio\":2,\"platform\":\"devtools\",\"errMsg\":\"getSystemInfo:ok\",\"appId\":\"aik5cAUdtB4=\",\"batteryLevel\":100,\"model\":\"Simulator\",\"screenWidth\":375,\"hostVersion\":\"1.0\"}";
    [self endWithOk:[str jsonValueDecoded]];
}

@end
