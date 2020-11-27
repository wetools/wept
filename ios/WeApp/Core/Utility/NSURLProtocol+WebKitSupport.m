
#import "NSURLProtocol+WebKitSupport.h"
#import <WebKit/WebKit.h>

FOUNDATION_STATIC_INLINE Class ContextControllerClass() {
    static Class cls;
    if (!cls) {
        //browsingContextController
        NSString *key = [NSString stringWithFormat:@"%@%@", @"browsingC", @"ontextController"];
        cls = [[[WKWebView new] valueForKey:key] class];
    }
    return cls;
}

@implementation NSURLProtocol (WebKitSupport)

+ (void)wk_registerScheme:(NSString *)scheme {
    Class cls = ContextControllerClass();
    NSString *selStr = [NSString stringWithFormat:@"%@%@", @"registerSchemeF", @"orCustomProtocol:"];
    SEL sel = NSSelectorFromString(selStr);
    if ([(id)cls respondsToSelector:sel]) {
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Warc-performSelector-leaks"
        [(id)cls performSelector:sel withObject:scheme];
#pragma clang diagnostic pop
    }
}

+ (void)wk_unregisterScheme:(NSString *)scheme {
    Class cls = ContextControllerClass();
    NSString *selStr = [NSString stringWithFormat:@"%@%@", @"unregisterSchemeF", @"orCustomProtocol:"];
    SEL sel = NSSelectorFromString(selStr);
    if ([(id)cls respondsToSelector:sel]) {
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Warc-performSelector-leaks"
        [(id)cls performSelector:sel withObject:scheme];
#pragma clang diagnostic pop
    }
}

@end





