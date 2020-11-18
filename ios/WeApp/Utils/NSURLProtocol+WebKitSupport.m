
#import "NSURLProtocol+WebKitSupport.h"
#import <WebKit/WebKit.h>

/// 混淆字符串
FOUNDATION_STATIC_INLINE NSString * Obfuscator(NSString * str) {
    NSRange range = [str rangeOfString:@"[Obfu]->"];
    NSString *todoString = [str substringFromIndex:range.length];
    NSData *nsdataFromBase64String = [[NSData alloc] initWithBase64EncodedString:todoString options:0];
    // Decoded NSString from the NSData
    NSString *base64Decoded = [[NSString alloc] initWithData:nsdataFromBase64String encoding:NSUTF8StringEncoding];
    return base64Decoded;
}

FOUNDATION_STATIC_INLINE Class ContextControllerClass() {
    static Class cls;
    if (!cls) {
        //[Orginial]---->'browsingContextController'
        NSString *str = @"[Obfu]->YnJvd3NpbmdDb250ZXh0Q29udHJvbGxlcg==";
        cls = [[[WKWebView new] valueForKey:Obfuscator(str)] class];
    }
    return cls;
}

FOUNDATION_STATIC_INLINE SEL RegisterSchemeSelector() {
    //[Orginial]---->'registerSchemeForCustomProtocol:'
    NSString *str = @"[Obfu]->cmVnaXN0ZXJTY2hlbWVGb3JDdXN0b21Qcm90b2NvbDo=";
    return NSSelectorFromString(Obfuscator(str));
}

FOUNDATION_STATIC_INLINE SEL UnregisterSchemeSelector() {
    //[Orginial]---->'unregisterSchemeForCustomProtocol:'
    NSString *str = @"[Obfu]->dW5yZWdpc3RlclNjaGVtZUZvckN1c3RvbVByb3RvY29sOg==";
    return NSSelectorFromString(Obfuscator(str));
}

@implementation NSURLProtocol (WebKitSupport)

+ (void)wk_registerScheme:(NSString *)scheme {
    Class cls = ContextControllerClass();
    SEL sel = RegisterSchemeSelector();
    if ([(id)cls respondsToSelector:sel]) {
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Warc-performSelector-leaks"
        [(id)cls performSelector:sel withObject:scheme];
#pragma clang diagnostic pop
    }
}

+ (void)wk_unregisterScheme:(NSString *)scheme {
    Class cls = ContextControllerClass();
    SEL sel = UnregisterSchemeSelector();
    if ([(id)cls respondsToSelector:sel]) {
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Warc-performSelector-leaks"
        [(id)cls performSelector:sel withObject:scheme];
#pragma clang diagnostic pop
    }
}

@end





