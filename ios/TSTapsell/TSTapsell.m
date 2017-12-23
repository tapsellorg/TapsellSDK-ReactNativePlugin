#import "TSTapsell.h"

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
NSString *const ERROR_KEY = @"error_message";
NSString *const AD_ID_KEY = @"ad_id";
NSString *const ZONE_ID_KEY = @"zone_id";

@implementation TSTapsell

RCT_EXPORT_MODULE();

- (NSArray<NSString *> *)supportedEvents
{
    return @[ON_AD_AVAILABLE_EVENT,
             ON_NO_AD_AVAILABLE_EVENT,
             ON_ERROR_EVENT,
             ON_EXPIRING_EVENT,
             ON_OPENED_EVENT,
             ON_CLOSED_EVENT,
             ON_AD_AVAILABLE_NATIVE_BANNER_EVENT,
             ON_ERROR_NATIVE_BANNER_EVENT,
             ON_NO_AD_AVAILABLE_NATIVE_BANNER_EVENT,
             ON_NO_NETWORK_NATIVE_BANNER_EVENT,
             ON_AD_AVAILABLE_NATIVE_VIDEO_EVENT,
             ON_ERROR_NATIVE_VIDEO_EVENT,
             ON_NO_AD_AVAILABLE_NATIVE_VIDEO_EVENT,
             ON_NO_NETWORK_NATIVE_VIDEO_EVENT];
}

- (NSDictionary *)constantsToExport
{
    return @{
             @"ON_AD_AVAILABLE_EVENT" : ON_AD_AVAILABLE_EVENT,
             @"ON_NO_AD_AVAILABLE_EVENT" : ON_NO_AD_AVAILABLE_EVENT,
             @"ON_ERROR_EVENT" : ON_ERROR_EVENT,
             @"ON_EXPIRING_EVENT" : ON_EXPIRING_EVENT,
             @"ON_OPENED_EVENT" : ON_OPENED_EVENT,
             @"ON_CLOSED_EVENT" : ON_CLOSED_EVENT,
             @"ON_AD_AVAILABLE_NATIVE_BANNER_EVENT" : ON_AD_AVAILABLE_NATIVE_BANNER_EVENT,
             @"ON_ERROR_NATIVE_BANNER_EVENT" : ON_ERROR_NATIVE_BANNER_EVENT,
             @"ON_NO_AD_AVAILABLE_NATIVE_BANNER_EVENT" : ON_NO_AD_AVAILABLE_NATIVE_BANNER_EVENT,
             @"ON_NO_NETWORK_NATIVE_BANNER_EVENT" : ON_NO_NETWORK_NATIVE_BANNER_EVENT,
             @"ON_AD_AVAILABLE_NATIVE_VIDEO_EVENT" : ON_AD_AVAILABLE_NATIVE_VIDEO_EVENT,
             @"ON_ERROR_NATIVE_VIDEO_EVENT" : ON_ERROR_NATIVE_VIDEO_EVENT,
             @"ON_NO_AD_AVAILABLE_NATIVE_VIDEO_EVENT" : ON_NO_AD_AVAILABLE_NATIVE_VIDEO_EVENT,
             @"ON_NO_NETWORK_NATIVE_VIDEO_EVENT" : ON_NO_NETWORK_NATIVE_VIDEO_EVENT
         };
}

+ (NSMutableDictionary *)nativeVideos {
    static NSMutableDictionary *nativeVideos = nil;
    if (nativeVideos == nil) {
        nativeVideos = [[NSMutableDictionary alloc] init];
    }
    return nativeVideos;
}

RCT_EXPORT_METHOD(initialize:(NSString *)appKey) {
    [Tapsell initializeWithAppKey:appKey];
    self.tapsellAds = [[NSMutableDictionary alloc] init];
}

RCT_EXPORT_METHOD(requestAd:(NSString*)zoneId options:(NSInteger)cacheType) {
    TSAdRequestOptions* requestOptions = [[TSAdRequestOptions alloc] init];
    [requestOptions setCacheType:cacheType];
    
    [Tapsell requestAdForZone:zoneId
                   andOptions:requestOptions
                onAdAvailable:^(TapsellAd *ad){
                    [self.tapsellAds setObject:ad forKey:ad.getId];
                    [self sendEventWithName:ON_AD_AVAILABLE_EVENT
                                       body:@{ZONE_ID_KEY: ad.getZoneId, AD_ID_KEY: ad.getId}];
                }
              onNoAdAvailable:^{
                  [self sendEventWithName:ON_NO_AD_AVAILABLE_EVENT body:@{ZONE_ID_KEY: zoneId}];
              }
                      onError:^(NSString* error){
                          [self sendEventWithName:ON_ERROR_EVENT body:@{ZONE_ID_KEY: zoneId, ERROR_KEY: error}];
                      }
                   onExpiring:^(TapsellAd* ad){
                       [self sendEventWithName:ON_EXPIRING_EVENT body:@{ZONE_ID_KEY: zoneId, AD_ID_KEY: ad.getId}];
                   }];
}

RCT_EXPORT_METHOD(showAd:(NSDictionary*) options) {
    TSAdShowOptions* showOptions = [[TSAdShowOptions alloc] init];
    [showOptions setOrientation:[RCTConvert NSInteger:options[ROTATION_MODE_KEY]]];
    [showOptions setBackDisabled:[RCTConvert BOOL:options[BACK_DISABLED_KEY]]];
    [showOptions setShowDialoge:[RCTConvert BOOL:options[SHOW_EXIT_DIALOG_KEY]]];
    NSString* adId = [RCTConvert NSString:options[AD_ID_KEY]];
    
    TapsellAd* ad = self.tapsellAds[adId];
    [ad showWithOptions:showOptions
      andOpenedCallback:^(TapsellAd * _Nullable ad){
          [self sendEventWithName:ON_OPENED_EVENT body:@{ZONE_ID_KEY: ad.getZoneId, AD_ID_KEY: ad.getId}];
      }
      andClosedCallback:^(TapsellAd * _Nullable ad){
          [self sendEventWithName:ON_CLOSED_EVENT body:@{ZONE_ID_KEY: ad.getZoneId, AD_ID_KEY: ad.getId}];
      }];
}

RCT_EXPORT_METHOD(requestNativeBannerAd:(NSString*)zoneId) {
    [Tapsell requestNativeBannerAdForZone:zoneId onAdAvailable:^(TSNativeBannerAdWrapper *nativeBannerAd) {
        [self sendEventWithName:ON_AD_AVAILABLE_NATIVE_BANNER_EVENT body:@{@"ad_id": nativeBannerAd.adId, @"zone_id": zoneId, @"title": nativeBannerAd.title, @"description": nativeBannerAd.htmlDescription, @"call_to_action_text": nativeBannerAd.callToActionText, @"icon_url": nativeBannerAd.logoUrl, @"portriat_static_image_url": nativeBannerAd.portriatImageUrl, @"landscape_static_image_url": nativeBannerAd.landscapeImageUrl}];
    } onNoAdAvailable:^{
        [self sendEventWithName:ON_NO_AD_AVAILABLE_NATIVE_BANNER_EVENT body:@{ZONE_ID_KEY: zoneId}];
    } onError:^(NSString * _Nullable error) {
        [self sendEventWithName:ON_ERROR_NATIVE_BANNER_EVENT body:@{ZONE_ID_KEY: zoneId, ERROR_KEY: error}];
    }];
}

RCT_EXPORT_METHOD(onNativeBannerAdShown:(NSString*)adId) {
    [Tapsell nativeBannerAdShowWithAdId:adId];
}
    
RCT_EXPORT_METHOD(onNativeBannerAdClicked:(NSString*)adId) {
    [Tapsell nativeBannerAdClickedWithAdId:adId];
}

RCT_EXPORT_METHOD(requestNativeVideoAd:(NSString*)zoneId) {
    [Tapsell requestNativeVideoAdForZone:zoneId onAdAvailable:^(TSNativeVideoAdWrapper *nativeVideoAd) {
        [[TSTapsell nativeVideos] setObject:nativeVideoAd.videoUrl forKey:nativeVideoAd.adId];
        [self sendEventWithName:ON_AD_AVAILABLE_NATIVE_VIDEO_EVENT body:@{@"ad_id": nativeVideoAd.adId, @"zone_id": zoneId, @"title": nativeVideoAd.title, @"description": nativeVideoAd.htmlDescription, @"call_to_action_text": nativeVideoAd.callToActionText, @"icon_url": nativeVideoAd.logoUrl, @"video_url": nativeVideoAd.videoUrl}];
    } onNoAdAvailable:^{
        [self sendEventWithName:ON_NO_AD_AVAILABLE_NATIVE_VIDEO_EVENT body:@{ZONE_ID_KEY: zoneId}];
    } onError:^(NSString * _Nullable error) {
        [self sendEventWithName:ON_ERROR_NATIVE_VIDEO_EVENT body:@{ZONE_ID_KEY: zoneId, ERROR_KEY: error}];
    }];
}

RCT_EXPORT_METHOD(onNativeVideoAdShown:(NSString*)adId) {
    [Tapsell nativeVideoAdShowWithAdId:adId];
}

RCT_EXPORT_METHOD(onNativeVideoAdClicked:(NSString*)adId) {
    [Tapsell nativeVideoAdClickedWithAdId:adId];
}


RCT_EXPORT_METHOD(setRewardListener:(RCTResponseSenderBlock)callback) {
    [Tapsell setAdShowFinishedCallback:^(TapsellAd *ad, BOOL completed) {
        callback(@[ad.getZoneId,
                   ad.getId,
                   [NSNumber numberWithBool:completed],
                   [NSNumber numberWithBool:ad.isRewardedAd]]);
    }];
}
@end
