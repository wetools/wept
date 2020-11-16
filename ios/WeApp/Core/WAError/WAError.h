
#import <Foundation/Foundation.h>

FOUNDATION_EXPORT NSErrorDomain const WAErrorDomain;

/// 小程序错误码
NS_ERROR_ENUM(WAErrorDomain) {
    WAErrorUnknown                      = -1,
    WAErrorParameter                    = -2,
    
    WAErrorFileReadError                = -10001,
    WAErrorFileUnzipFail                = -10002,
    WAErrorFileBroken                   = -10003,
    
    WAErrorFileDownloadFail             = -20001,
    
    WAErrorAppLaunchAbort               = -30001,
};



@interface WAError : NSObject

#pragma mark - init

+ (NSError *)error:(NSInteger)errorCode;

+ (NSError *)error:(NSInteger)errorCode desc:(NSString *)desc;

+ (NSError *)errorFileRead:(NSString *)fileName;

@end
