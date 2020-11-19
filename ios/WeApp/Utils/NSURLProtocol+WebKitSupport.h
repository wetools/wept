
#import <Foundation/Foundation.h>

@interface NSURLProtocol (WebKitSupport)

/// 注册拦截scheme
+ (void)wk_registerScheme:(NSString*)scheme;

/// 注销拦截scheme
+ (void)wk_unregisterScheme:(NSString*)scheme;

@end

