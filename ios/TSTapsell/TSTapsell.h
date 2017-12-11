#import <Foundation/Foundation.h>
#import <TapsellSDKv3/TapsellSDKv3.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTLog.h>
#import <React/RCTConvert.h>
#import <React/RCTEventEmitter.h>


NSString *const ON_AD_AVAILABLE_EVENT=@"onAdAvailable";
NSString *const ON_ERROR_EVENT=@"onError";
NSString *const ON_NO_AD_AVAILABLE_EVENT=@"onNoAdAvailable";
NSString *const ON_EXPIRING_EVENT=@"onExpiring";
NSString *const ON_OPENED_EVENT=@"onOpened";
NSString *const ON_CLOSED_EVENT=@"onClosed";
NSString *const ON_AD_AVAILABLE_NATIVE_BANNER_EVENT =@"onNativeBannerAdAvailable";
NSString *const ON_ERROR_NATIVE_BANNER_EVENT = @"onNativeBannerAdError";
NSString *const ON_NO_AD_AVAILABLE_NATIVE_BANNER_EVENT = @"onNoNativeBannerAdAvailable";
NSString *const ON_NO_NETWORK_NATIVE_BANNER_EVENT = @"onNativeBannerAdNoNetwork";
NSString *const ON_AD_AVAILABLE_NATIVE_VIDEO_EVENT = @"onNativeVideoAdAvailable";
NSString *const ON_ERROR_NATIVE_VIDEO_EVENT =  @"onNativeVideoAdError";
NSString *const ON_NO_AD_AVAILABLE_NATIVE_VIDEO_EVENT = @"onNoNativeVideoAdAvailable";
NSString *const ON_NO_NETWORK_NATIVE_VIDEO_EVENT = @"onNativeVideoAdNoNetwork";

NSString *const ROTATION_MODE_KEY = @"rotation_mode";
NSString *const BACK_DISABLED_KEY = @"back_disabled";
NSString *const SHOW_EXIT_DIALOG_KEY = @"show_exit_dialog";
NSString *const ERROR_KEY = @"error";
NSString *const AD_ID_KEY = @"ad_id";
NSString *const ZONE_ID_KEY = @"zone_id";

@interface TSTapsell : RCTEventEmitter <RCTBridgeModule>
@end
