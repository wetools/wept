//
//  WAJSCoreService.m
//  WeAppExample
//
//  Created by wulinfeng on 2020/11/18.
//  Copyright © 2020 wept. All rights reserved.
//

#import "WAJSCoreService.h"
#import "WAWeakWKScriptMessageHandler.h"
#import "WAUIKitUtil.h"
#import "WAFileMgr.h"
#import "WAAppTask.h"

@interface WAJSCoreService () <WKNavigationDelegate>
@property (nonatomic, strong) WKWebView *webView;
@property (nonatomic, assign) NSUInteger port;
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
    }
    return self;
}

- (void)startService {
    NSString *userAgent = [WAUIKitUtil UserAgent];
    userAgent = [NSString stringWithFormat:@"%@ wechatdevtools appservice port/%lu token/194c98b09147b6b1fb522e38cd983f54 appid/%@", userAgent, (unsigned long)self.port, self.appTask.appId];
    
    WKWebView *webView = [[WKWebView alloc] initWithFrame:CGRectZero configuration:[self WKWebViewConfig]];
    webView.navigationDelegate = self;
    webView.customUserAgent = userAgent;
    self.webView = webView;
    
    NSString *serviceFilePath = [WAFileMgr WAAppEnterencePath:self.appTask.appId isGame:self.appTask.isGameApp];
    NSString *basePath = [serviceFilePath stringByDeletingLastPathComponent];
    NSURL *baseURL = [NSURL fileURLWithPath:basePath];
    NSError *error = nil;
    NSString *html = [[NSString alloc] initWithContentsOfURL:[NSURL fileURLWithPath:serviceFilePath] encoding:NSUTF8StringEncoding error:&error];
    [self.webView loadHTMLString:html baseURL:baseURL];
    
    //    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(5 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
    //        NSError *error = nil;
    //        NSString *html = [[NSString alloc] initWithContentsOfURL:[NSURL fileURLWithPath:serviceFilePath] encoding:NSUTF8StringEncoding error:&error];
    //        [self.webView loadHTMLString:html baseURL:baseURL];
    //    });
}

- (WKWebViewConfiguration *)WKWebViewConfig {
    WKWebViewConfiguration *configuration = WKWebViewConfiguration.new;
    [configuration.preferences setValue:@TRUE forKey:@"allowFileAccessFromFileURLs"];
    if (@available(iOS 10.0, *)) {
        [configuration setValue:@TRUE forKey:@"allowUniversalAccessFromFileURLs"];
    }
    return configuration;
}

@end
