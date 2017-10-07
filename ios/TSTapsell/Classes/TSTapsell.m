#import "TSTapsell.h"

@implementation TSTapsell

RCT_EXPORT_MODULE();

- (NSArray<NSString *> *)supportedEvents
{
  return @[ON_AD_AVAILABLE_EVENT,
           ON_NO_AD_AVAILABLE_EVENT,
           ON_ERROR_EVENT,
           ON_EXPIRING_EVENT,
           ON_OPENED_EVENT,
           ON_CLOSED_EVENT];
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

RCT_EXPORT_METHOD(setRewardListener:(RCTResponseSenderBlock)callback) {
  [Tapsell setAdShowFinishedCallback:^(TapsellAd *ad, BOOL completed) {
    callback(@[ad.getZoneId,
               ad.getId,
               [NSNumber numberWithBool:completed],
               [NSNumber numberWithBool:ad.isRewardedAd]]);
  }];
}
@end
