
#import <Foundation/Foundation.h>

@interface NSURLProtocol (WebKitSupport)

/**
 注册拦截schema
 */
+ (void)wk_registerScheme:(NSString*)scheme;

/**
 注销schema
 */
+ (void)wk_unregisterScheme:(NSString*)scheme;

@end

