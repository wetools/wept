
#import <WebKit/WebKit.h>

@interface WAWeakWKScriptMessageHandler : NSObject<WKScriptMessageHandler>
@property (nonatomic, weak) id<WKScriptMessageHandler> scriptDelegate;

- (instancetype)initWithDelegate:(id<WKScriptMessageHandler>)delegate;

@end


