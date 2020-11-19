//
//  WAAppURLProtocol.m
//
//  Created by lionvoom on 2019/8/15.
//  Copyright © 2019 wept. All rights reserved.
//

#import "WAAppURLProtocol.h"
#import "YYKit.h"
#import "WAAppEnum.h"
#import "WAUIKitUtil.h"
#import "WAFileMgr.h"
#import "MMContext.h"
#import "WAAppTaskMgr.h"

static NSString *const WAAppURLProtocol_hook_calibration = @"file:///calibration";
static NSString *const WAAppURLProtocol_hook_calibration_toHttp = @"http://calibration";

static NSString *const WAAppURLProtocol_hook_apihelper_assdk = @"file:///apihelper/assdk";
static NSString *const WAAppURLProtocol_hook_apihelper_assdk_toHttp = @"http://apihelper/assdk";

static NSString* const kURLHasHandle = @"URLHasHandle";

@interface WAAppURLProtocol ()<NSURLSessionDelegate>
@property (nonatomic, strong) NSURLSessionDataTask *task;
@end

@implementation WAAppURLProtocol

+ (BOOL)canInitWithRequest:(NSURLRequest *)request {
    //NSLog(@"%s: %@", __func__, request.URL);
    if ([self shouldHookScheme:request.URL]) {
        //处理过了，防止无限循环
        if ([NSURLProtocol propertyForKey:kURLHasHandle inRequest:request]) return NO;
        return YES;
    }
    return NO;
}

+ (NSURLRequest *)canonicalRequestForRequest:(NSURLRequest *)request {
    NSURL *url = request.URL;
    NSString *scheme = url.scheme;
    if ([scheme isEqualToString:kWAAppHookURLScheme_file]) {
        // "file:///" --> "'"http://"
        NSString *absoluteString = request.URL.absoluteString;
        if (([absoluteString hasPrefix:WAAppURLProtocol_hook_apihelper_assdk]
             || [absoluteString hasPrefix:WAAppURLProtocol_hook_calibration])) {
            NSString *httpURL = [@"http://" stringByAppendingString:[absoluteString substringFromIndex:@"file:///".length]];
            return [NSMutableURLRequest requestWithURL:[NSURL URLWithString:httpURL]];
            
        } else {//js绝对路径，需补全路径
            WAAppTaskMgr *appTaskMgr = [[MMContext currentContext] getService:WAAppTaskMgr.class];
            WAAppTask *app = [appTaskMgr currentForegroundTask];
            NSString *filePath = [NSString stringWithFormat:@"%@%@", [WAFileMgr WAAppPkgDir:app.appId], url.path];
            return [NSMutableURLRequest requestWithURL:[NSURL fileURLWithPath:filePath]];
        }
    }
    return request;
}

+ (BOOL)requestIsCacheEquivalent:(NSURLRequest *)a toRequest:(NSURLRequest *)b {
    return [super requestIsCacheEquivalent:a toRequest:b];
}

- (void)startLoading {
    NSMutableURLRequest *mutableReqeust = [self.request mutableCopy];
    //给我们处理过的请求设置一个标识符, 防止无限循环.
    [NSURLProtocol setProperty:@YES forKey:kURLHasHandle inRequest:mutableReqeust];
    
    NSURL *url = self.request.URL;
    NSString *scheme = url.scheme;
    
    NSString *absoluteString = url.absoluteString;
    absoluteString = [absoluteString stringByURLDecode];
    
    if ([scheme isEqualToString:kWAAppHookURLScheme_wxfile]) {
        [self hook_WAAppURLScheme:absoluteString];
        
    } else if ([scheme isEqualToString:kWAAppHookURLScheme_http]) {
        if ([absoluteString hasPrefix:WAAppURLProtocol_hook_apihelper_assdk_toHttp]) {
            [self hook_apihelper_assdk_toHttp:absoluteString];
            
        } else if ([absoluteString hasPrefix:WAAppURLProtocol_hook_calibration_toHttp]) {
            [self hook_calibration];
            
        } else {
            NSURLSession *session = [NSURLSession sessionWithConfiguration:[NSURLSessionConfiguration defaultSessionConfiguration] delegate:self delegateQueue:nil];
            self.task = [session dataTaskWithRequest:self.request];
            [self.task resume];
        }
        
    } else if ([scheme isEqualToString:kWAAppHookURLScheme_file]) {
        [self loadLocalFile:url];
        
    } else {
        NSURLSession *session = [NSURLSession sessionWithConfiguration:[NSURLSessionConfiguration defaultSessionConfiguration] delegate:self delegateQueue:nil];
        self.task = [session dataTaskWithRequest:self.request];
        [self.task resume];
    }
}

- (void)stopLoading {
    if (self.task) {
        [self.task cancel];
    }
}

- (void)URLSession:(NSURLSession *)session dataTask:(NSURLSessionDataTask *)dataTask didReceiveResponse:(NSURLResponse *)response completionHandler:(void (^)(NSURLSessionResponseDisposition))completionHandler {
    [[self client] URLProtocol:self didReceiveResponse:response cacheStoragePolicy:NSURLCacheStorageAllowed];
    completionHandler(NSURLSessionResponseAllow);
}

- (void)URLSession:(NSURLSession *)session dataTask:(NSURLSessionDataTask *)dataTask didReceiveData:(NSData *)data {
    [[self client] URLProtocol:self didLoadData:data];
}

- (void)URLSession:(NSURLSession *)session task:(NSURLSessionTask *)task didCompleteWithError:(nullable NSError *)error {
    [self.client URLProtocolDidFinishLoading:self];
}

#pragma mark - hook
- (void)hook_calibration {
    [self _httpCallback:@{}];
}

- (void)hook_apihelper_assdk_toHttp:(NSString *)originPath {
    NSString *pre = @"http://apihelper/assdk?t=";
    NSString *paramsStr = [originPath substringFromIndex:pre.length];
    NSLog(@"[SYNC]==>: %@", paramsStr);
    NSDictionary *data = [paramsStr jsonValueDecoded];
    
    WAAppTaskMgr *appTaskMgr = [[MMContext currentContext] getService:WAAppTaskMgr.class];
    WAAppTask *app = [appTaskMgr currentForegroundTask];
    
    if (!data || ![data isKindOfClass:NSDictionary.class]) return;
    NSString *api = data[@"api"];
    if (!api || ![api isKindOfClass:NSString.class]) return;
    NSDictionary *args = data[@"args"];
    if (!args || ![args isKindOfClass:NSDictionary.class]) return;
    
    @weakify(self);
    [app.appService setupInvokeHandler:api param:args completionHandler:^(NSDictionary * _Nonnull res) {
        @strongify(self);
        [self _httpCallback:res ?: @{}];
    }];
}

- (void)hook_WAAppURLScheme:(NSString *)originPath {
    NSString *appId = [NSURL URLWithString:originPath].host;
    NSString *formatFilePath = [WAFileMgr searchFileInApp:originPath appId:appId];
    [self loadLocalFile:[NSURL fileURLWithPath:formatFilePath]];
}

#pragma mark -
+ (BOOL)shouldHookScheme:(NSURL *)url {
    NSString *scheme = url.scheme;
    if ([scheme isEqualToString:kWAAppHookURLScheme_wxfile]) {
        return YES;
    } else if ([scheme isEqualToString:kWAAppHookURLScheme_file]) {
        return [self shouldHookFilePath:url];
    }
    return NO;
}

+ (BOOL)shouldHookFilePath:(NSURL *)url {
    NSString *absoluteString = url.absoluteString;
    if ([absoluteString hasPrefix:WAAppURLProtocol_hook_apihelper_assdk]
        || [absoluteString hasPrefix:WAAppURLProtocol_hook_calibration]
        || ![self isFilePathFullPath:url])
    {
        return YES;
    }
    return NO;
}

/// 文件全路径
+ (BOOL)isFilePathFullPath:(NSURL *)url {
    NSString *path = url.path;
    if ([path hasPrefix:@"/var"] || [path hasPrefix:@"/private/var"] //真机根目录
        || [path hasPrefix:@"/Users"]) { //模拟器根目录
        return YES;
    }
    return NO;
}

- (void)loadLocalFile:(NSURL *)url {
    NSString *MIMEType = [WAUIKitUtil MIMETypeForLocalFilePath:url.path];
    
    @weakify(self);
    void(^successBlock)(NSData *data) = ^(NSData *data){
        @strongify(self);
        NSURLResponse* response = [[NSURLResponse alloc] initWithURL:url MIMEType:MIMEType expectedContentLength:data.length textEncodingName:nil];
        [self _callback:response data:data];
    };
    
    void(^failureBlock)(void) = ^{
        @strongify(self);
        NSError *error = [NSError errorWithDomain:NSPOSIXErrorDomain code:NSFileReadNoSuchFileError userInfo:@{NSLocalizedDescriptionKey: [NSString stringWithFormat:@"file not found at path: %@", url.path]}];
        [self _callback:error];
        NSLog(@"%s error:%@", __func__, error);
    };
    
    if (!MIMEType) {
        failureBlock();
        return;
    }
    
    NSData *data = [NSData dataWithContentsOfURL:url];
    if (data) {
        successBlock(data);
        return;
    }
    
    [[YYWebImageManager sharedManager] requestImageWithURL:url options:YYWebImageOptionIgnoreDiskCache progress:nil transform:nil completion:^(UIImage * _Nullable image, NSURL * _Nonnull url, YYWebImageFromType from, YYWebImageStage stage, NSError * _Nullable error) {
        YYImage *_image = (YYImage *)image;
        NSData *data = _image.animatedImageData;
        if (!data && _image) {
            data = UIImagePNGRepresentation(_image);
        }
        if (data) {
            successBlock(data);
        } else {
            failureBlock();
        }
    }];
}

- (NSString *)_appIdFromUserAgent:(NSString *)userAgent {
    NSArray *items = [userAgent componentsSeparatedByString:@" "];
    NSString *regex = @"cg_oauth_client_id/.+";
    NSPredicate *pre = [NSPredicate predicateWithFormat:@"SELF MATCHES %@", regex];
    NSString *appId = [items filteredArrayUsingPredicate:pre].firstObject;
    return [[appId componentsSeparatedByString:@"/"] lastObject];
}

- (void)_httpCallback:(NSDictionary *)dict {
    NSString *dataStr = [dict jsonStringEncoded];
    NSLog(@"[SYNC]<==: %@", dataStr);
    NSData *data = [dict modelToJSONData];
    NSDictionary *header =
    @{@"Access-Control-Allow-Origin": @"*",
      @"Content-Length": @(data.length).stringValue};
    
    NSHTTPURLResponse *response = [[NSHTTPURLResponse alloc] initWithURL:self.request.URL statusCode:200 HTTPVersion:(__bridge NSString *)kCFHTTPVersion1_1 headerFields:header];
    [self _callback:response data:data];
}

- (void)_callback:(NSURLResponse *)response data:(NSData *)data {
    @try {
        [self.client URLProtocol:self didReceiveResponse:response cacheStoragePolicy:NSURLCacheStorageAllowed];
        [self.client URLProtocol:self didLoadData:data];
        [self.client URLProtocolDidFinishLoading:self];
    } @catch (NSException *exception) {
        NSLog(@"%@", exception);
    }
}

- (void)_callback:(NSError *)error {
    @try {
        [self.client URLProtocol:self didFailWithError:error];
    } @catch (NSException *exception) {
        NSLog(@"%@", exception);
    }
}

@end
