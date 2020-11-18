//
//  MMContext.m
//  WeAppExample
//
//  Created by lionvoom on 2020/11/17.
//  Copyright © 2020 wept. All rights reserved.
//

#import "MMContext.h"
#import "MMService.h"

@interface MMContext()
@property (nonatomic, strong) NSMutableDictionary *m_dictService;
@property (nonatomic, strong) NSLock *m_lock;
@end

@implementation MMContext

+ (instancetype)currentContext {
    static MMContext *instance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        instance = [[self alloc] init];
        instance.m_dictService = [NSMutableDictionary dictionary];
        instance.m_lock = [[NSLock alloc] init];
    });
    return instance;
}

- (id)getService:(Class)cls {
    if (![cls isSubclassOfClass:MMService.class]) return nil;
    MMService *obj;
    [self.m_lock lock];
    NSString *key = NSStringFromClass(cls);
    obj = [self.m_dictService objectForKey:key];
    if (!obj) {
        obj = [[cls alloc] init];
        [obj onServiceInit];
        self.m_dictService[key] = obj;
    }
    [self.m_lock unlock];
    return obj;;
}

@end
