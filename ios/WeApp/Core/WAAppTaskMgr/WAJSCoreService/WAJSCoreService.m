//
//  WAJSCoreService.m
//  WeAppExample
//
//  Created by lionvoom on 2020/11/18.
//  Copyright © 2020 wept. All rights reserved.
//

#import "WAJSCoreService.h"
#import "YYKitMacro.h"
#import "WAWeakWKScriptMessageHandler.h"
#import "WAUIKitUtil.h"
#import "WAFileMgr.h"
#import "WAAppTask.h"
#import "WAJSEventHandler_BaseEvent.h"

#define Lock() dispatch_semaphore_wait(self->_lock, DISPATCH_TIME_FOREVER)
#define Unlock() dispatch_semaphore_signal(self->_lock)

@interface WAJSCoreService () <WKNavigationDelegate>
@property (nonatomic, strong) WKWebView *webView;
@property (nonatomic, assign) NSUInteger port;
@property (nonatomic, strong) NSMutableSet *eventHandlers;
@property (nonatomic, strong) dispatch_semaphore_t lock;
@end

@implementation WAJSCoreService

- (void)dealloc {
    NSLog(@"%s", __func__);
    if (_webView.superview) {
        [_webView removeFromSuperview];
    }
}

- (instancetype)initWithAppTask:(WAAppTask *)appTask port:(NSInteger)port {
    if (self = [super init]) {
        self.appTask = appTask;
        self.port = port;
        self.eventHandlers = [NSMutableSet set];
        self.lock = dispatch_semaphore_create(1);
    }
    return self;
}

- (void)startService {
    NSString *userAgent = [WAUIKitUtil UserAgent];
    userAgent = [NSString stringWithFormat:@"%@ wechatdevtools appservice port/%lu token/194c98b09147b6b1fb522e38cd983f54 appid/%@", userAgent, (unsigned long)self.port, self.appTask.appId];
    
    WKWebView *webView = [[WKWebView alloc] initWithFrame:(CGRect){0,-200,0,0} configuration:[self WKWebViewConfig]];
    webView.navigationDelegate = self;
    webView.customUserAgent = userAgent;
    self.webView = webView;
    
    //不添加到view上，跟safari联调看不到资源
    UIWindow *window = [WAUIKitUtil keyWindow];
    [window addSubview:webView];
    
    NSString *serviceFilePath = [WAFileMgr WAAppEnterencePath:self.appTask.appId isGame:self.appTask.isGameApp];
    NSString *basePath = [serviceFilePath stringByDeletingLastPathComponent];
    NSURL *baseURL = [NSURL fileURLWithPath:basePath];
//    NSError *error = nil;
//    NSString *html = [[NSString alloc] initWithContentsOfURL:[NSURL fileURLWithPath:serviceFilePath] encoding:NSUTF8StringEncoding error:&error];
//    [self.webView loadHTMLString:html baseURL:baseURL];
    
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(5 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        NSError *error = nil;
        NSString *html = [[NSString alloc] initWithContentsOfURL:[NSURL fileURLWithPath:serviceFilePath] encoding:NSUTF8StringEncoding error:&error];
        [self.webView loadHTMLString:html baseURL:baseURL];
    });
}

- (WKWebViewConfiguration *)WKWebViewConfig {
    WKWebViewConfiguration *configuration = WKWebViewConfiguration.new;
    [configuration.preferences setValue:@TRUE forKey:@"allowFileAccessFromFileURLs"];
    if (@available(iOS 10.0, *)) {
        [configuration setValue:@TRUE forKey:@"allowUniversalAccessFromFileURLs"];
    }
    return configuration;
}

- (void)setupInvokeHandler:(NSString *)api param:(NSDictionary *)args completionHandler:(void(^)(NSDictionary *res))completionHandler {
    NSString *apiName = [NSString stringWithFormat:@"%@%@", @"WAJSEventHandler_", api];
    Class cls = NSClassFromString(apiName);
    if (!cls) {
        NSLog(@"⚠️%@ not impl handle class", api);
        NSString *errMsg = [NSString stringWithFormat:@"%@:fail function not exist", api];
        if (completionHandler) completionHandler(@{@"errMsg": errMsg});
        return;
    }
    WAJSEventHandler_BaseEvent *eventHandler = [[cls alloc] init];
    eventHandler.api = api;
    eventHandler.args = args;
    eventHandler.appTask = self.appTask;
    Lock();
    [self.eventHandlers addObject:eventHandler];
    Unlock();
    @weakify(self);
    eventHandler.completionHandler = ^(WAJSEventHandler_BaseEvent * _Nonnull handler, NSDictionary * _Nonnull res) {
        @strongify(self);
        completionHandler(res);
        [self removeHandler:handler];
    };
    dispatch_async(dispatch_get_main_queue(), ^{
        [eventHandler handleJSEvent:args];
    });
}

- (void)removeHandler:(WAJSEventHandler_BaseEvent *)event {
    if (!event) return;
    Lock();
    [self.eventHandlers removeObject:event];
    Unlock();
}

@end
