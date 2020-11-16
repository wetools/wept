//
//  ViewController.m
//  WeAppExample
//
//  Created by lionvoom on 2020/11/16.
//  Copyright © 2020 wept. All rights reserved.
//

#import "ViewController.h"
#import "WAFileMgr.h"
#import "WAAppPreloader.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    NSString *path = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES).firstObject;
    NSLog(@"NSDocumentDirectory:%@", path);
}

- (IBAction)openWeApp:(UIButton *)sender {
    //准备debug包
    [WAFileMgr WAAppPrepareDebugPackage:@"weapp-demo"];
    
    WAAppOpenParameter *parameter = [[WAAppOpenParameter alloc] init];
    parameter.m_nsAppId = @"weapp-demo";
    parameter.m_nsUserName = @"wept-user";
    [[WAAppPreloader shared] openApp:parameter taskExtInfo:nil handlerWrapper:nil];
}


@end
