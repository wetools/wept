//
//  WAWebViewController.m
//  WeAppExample
//
//  Created by lionvoom on 2020/11/22.
//  Copyright © 2020 wept. All rights reserved.
//

#import "WAWebViewController.h"
#import <WebKit/WebKit.h>
#import "YYKit.h"
#import "Masonry.h"
#import "WAUtility.h"
#import "WAConfigMgr.h"
#import "WAAppTask.h"
#import "WACapsuleView.h"
#import "WAWebViewMutiFuncMenuView.h"

@interface WAWebViewController () <WKUIDelegate, WKNavigationDelegate>
@property (nonatomic, strong) WAWebViewMutiFuncMenuView *menuView;
@property (nonatomic, strong) WACapsuleView *capsuleView;
@property (nonatomic, strong) WKWebView *webView;
@end

@implementation WAWebViewController

- (void)dealloc {
    NSLog(@"%s", __func__);
}

- (void)viewDidLoad {
    [super viewDidLoad];
    self.automaticallyAdjustsScrollViewInsets = NO;
    self.view.backgroundColor = UIColor.whiteColor;
    [self setupWebView];
    [self setupMenuView];
    [self setupCapsuleView];
    [self updateNavView];
    [self loadWebViewContent];
}

- (void)viewWillLayoutSubviews {
    [super viewWillLayoutSubviews];
    
    CGFloat capsuleWidth = 88;
    CGFloat capsuleHeight = 32;
    CGFloat statusBarHeight = [UIApplication sharedApplication].statusBarFrame.size.height;
    CGFloat top = statusBarHeight ? (statusBarHeight + (capsuleWidth/2-capsuleHeight)/2.0) : 10;
    [self.capsuleView mas_updateConstraints:^(MASConstraintMaker *make) {
        make.top.equalTo(self.view).mas_offset(top);
        make.right.equalTo(self.view).offset(-8);
        make.size.mas_equalTo(CGSizeMake(capsuleWidth, capsuleHeight));
    }];
}

- (void)setupWebView {
    self.automaticallyAdjustsScrollViewInsets = NO;
    self.view.backgroundColor = UIColor.whiteColor;

    self.webView = [[WKWebView alloc] initWithFrame:CGRectZero configuration:[self webviewConfig]];
    self.webView.scrollView.showsVerticalScrollIndicator = NO;
    self.webView.customUserAgent = [self userAgent];
    self.webView.UIDelegate = self;
    self.webView.navigationDelegate = self;
    [self.view addSubview:self.self.webView];
    
    CGFloat navHeight = [self.pageModel.pageStyle navigationStyleDefault] ? 64 : 0;
    [self.webView mas_makeConstraints:^(MASConstraintMaker *make) {
        make.top.equalTo(self.view).mas_offset(navHeight);
        make.left.right.equalTo(self.view);
        make.height.equalTo(self.view).mas_offset(-navHeight);
    }];
    
    //fix:scrollView内容下移状态栏高度
    if (@available(iOS 11.0, *)) {
        self.webView.scrollView.contentInsetAdjustmentBehavior = UIScrollViewContentInsetAdjustmentNever;
    } else { // Fallback on earlier versions
        self.edgesForExtendedLayout = UIRectEdgeNone;
    }
}

- (void)setupMenuView {
    if (![self.pageModel.pageStyle navigationStyleDefault]) return;
    self.menuView = [[WAWebViewMutiFuncMenuView alloc] initWithFrame:CGRectMake(0, 0, kScreenWidth, 64)];
    [self.view addSubview:self.menuView];
}

- (void)setupCapsuleView {
    CGFloat capsuleWidth = 88;
    CGFloat capsuleHeight = 32;
    self.capsuleView = [[WACapsuleView alloc] initWithFrame:CGRectMake(0, 0, capsuleWidth, capsuleHeight)];
    self.capsuleView.delegate = self.appTask;
    [self.view addSubview:self.capsuleView];
}

- (WKWebViewConfiguration *)webviewConfig {
    WKWebViewConfiguration *configuration = [WKWebViewConfiguration new];
    @try {
        [configuration.preferences setValue:@TRUE forKey:@"allowFileAccessFromFileURLs"];
        if (@available(iOS 10.0, *)) {
            [configuration setValue:@TRUE forKey:@"allowUniversalAccessFromFileURLs"];
        }
    } @catch (NSException *exception) {
        NSLog(@"%@", exception);
    }
    configuration.allowsInlineMediaPlayback = YES;
    configuration.mediaTypesRequiringUserActionForPlayback = NO;
    return configuration;
}

- (NSString *)userAgent {
    NSString *userAgent = [WAUtility UserAgent];
    if (self.appTask.isGameApp) {
        userAgent = [NSString stringWithFormat:@"%@ wechatdevtools/1.02.1907300 MicroMessenger/7.0.4 Language/zh_CN webview/20000 gameservice port/%ld token/f53dc3dbba0f3b878cde6645b4605ebb", userAgent, (long)self.appTask.socketServer.port];
    } else {
        userAgent = [NSString stringWithFormat:@"%@ wechatdevtools/1.02.1907242 MicroMessenger/7.0.4 Language/zh_CN webview/%ld miniprogram port/%ld token/179478efb7cff7b357da18e907ca52e7", userAgent, (long)self.pageModel.pageId, (long)self.appTask.socketServer.port];
    }
    return userAgent;
}

- (void)loadWebViewContent {
    NSString *pkgDir = [WAConfigMgr WAAppPkgDir:self.appTask.appId];
    NSString *pagePath = [WAUtility formatHtmlUrlAndRemoveQuery:self.pageModel.pagePath];
    NSString *fullPathPath = [pkgDir stringByAppendingPathComponent:pagePath];
    NSError *error = nil;
    NSString *html = [[NSString alloc] initWithContentsOfURL:[NSURL fileURLWithPath:fullPathPath] encoding:NSUTF8StringEncoding error:&error];

    if (!html) {
        NSLog(@"%@", error.localizedDescription);
        //TODO: page 404
        return;
    }
    
    NSURL *baseUrl = [NSURL fileURLWithPath:pkgDir];
    if (self.appTask.isGameApp) {
        [self.webView loadHTMLString:html baseURL:baseUrl];

    } else {
        NSString *templateHtml = [self.appTask.templateHtml stringByAppendingString:html];
        [self.webView loadHTMLString:templateHtml baseURL:baseUrl];
//        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(5 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
//            [self.webView loadHTMLString:templateHtml baseURL:baseUrl];
//        });
    }
}

#pragma mark - update UI
- (void)updateNavView {
    WAPageStyle *style = self.pageModel.pageStyle;
    UIColor *textColor = [style.navigationBarTextStyle isEqualToString:@"white"] ? UIColor.whiteColor : UIColor.blackColor;
    [self.menuView setMenuNavTitle:style.navigationBarTitleText];
    [self.menuView setMenuNavTitleColor:textColor];
    [self.menuView setLeftBtnHidden:YES];
}

- (void)setNavLoading:(BOOL)loading {
    if (loading) {
        [self.menuView startMenuTitleViewLoading];
    } else {
        [self.menuView stopMenuTitleViewLoading];
    }
}

#pragma mark - WKNavigationDelegate
- (void)webView:(WKWebView *)webView didStartProvisionalNavigation:(null_unspecified WKNavigation *)navigation {
    NSLog(@"%s", __func__);
}

- (void)webView:(WKWebView *)webView didFinishNavigation:(WKNavigation *)navigation {
    NSLog(@"%s", __func__);
}

- (void)webView:(WKWebView *)webView didFailNavigation:(WKNavigation *)navigation withError:(NSError *)error {
    NSLog(@"%s", __func__);
}

@end


