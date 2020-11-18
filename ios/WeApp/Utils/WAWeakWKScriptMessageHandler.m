
#import "WAWeakWKScriptMessageHandler.h"

@implementation WAWeakWKScriptMessageHandler

- (instancetype)initWithDelegate:(id<WKScriptMessageHandler>)delegate {
    if (self = [super init]) {
        self.scriptDelegate = delegate;
    }
    
    return self;
}

- (void)userContentController:(WKUserContentController *)userContentController didReceiveScriptMessage:(WKScriptMessage *)message {
    if (!self.scriptDelegate) return;
    
    if (self.scriptDelegate && [self.scriptDelegate respondsToSelector:@selector(userContentController:didReceiveScriptMessage:)]) {
        [self.scriptDelegate userContentController:userContentController didReceiveScriptMessage:message];
    }
}


@end

