#import <Foundation/Foundation.h>
#import <TapsellSDKv3/TapsellSDKv3.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTLog.h>
#import <React/RCTConvert.h>
#import <React/RCTEventEmitter.h>

@interface TSTapsell : RCTEventEmitter <RCTBridgeModule>
@property (strong, nonatomic) NSMutableDictionary * tapsellAds;
+ (NSMutableDictionary *)nativeVideos;
@end
