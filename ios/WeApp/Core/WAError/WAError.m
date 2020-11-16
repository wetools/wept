
#import "WAError.h"

NSErrorDomain const WAErrorDomain = @"com.wept.weapp.errorDomain";

@implementation WAError

+ (NSString *)errorDescription:(NSInteger)errorCode {
    NSDictionary *descMap =
    @{@(WAErrorUnknown):                        @"未知错误",
      @(WAErrorParameter):                      @"参数错误",
      
      @(WAErrorFileReadError):                  @"文件读取失败",
      @(WAErrorFileUnzipFail):                  @"文件解压失败",
      @(WAErrorFileBroken):                     @"文件已损坏",
      
      @(WAErrorFileDownloadFail):               @"文件下载失败",
      
      @(WAErrorAppLaunchAbort):                 @"中止小程序启动",
    };
    NSString *desc = descMap[@(errorCode)];
    NSAssert(desc, @"please config errorCode desc");
    return desc ?: descMap[@(WAErrorUnknown)];
}

#pragma mark - init

+ (NSError *)error:(NSInteger)errorCode {
    return [self error:errorCode desc:nil];
}

+ (NSError *)error:(NSInteger)errorCode desc:(NSString *)desc {
    NSString *_desc = [self errorDescription:errorCode];
    if (desc && desc.length > 0) {
        _desc = [NSString stringWithFormat:@"%@\n%@", _desc, desc];
    }
    return [NSError errorWithDomain:WAErrorDomain code:errorCode userInfo:@{NSLocalizedDescriptionKey:_desc}];
}

+ (NSError *)errorFileRead:(NSString *)fileName {
    NSString *_desc = fileName ? [NSString stringWithFormat:@"read '%@' fail", fileName] : nil;
    return [self error:WAErrorFileReadError desc:_desc];
}

@end
