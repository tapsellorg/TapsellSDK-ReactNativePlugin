#import "RNTBannerAdManager.h"

@implementation RNTBannerAdManager
RCT_EXPORT_MODULE()

- (UIView *)view
{
    _bannerView = [[TSBannerAdView alloc] initWithFrame:CGRectMake(0, 0, 300, 250)];
    return _bannerView;
}

RCT_EXPORT_METHOD(loadAd:(NSString*)zoneId andBannerType:(nonnull NSNumber*)bannerType) {
    if (zoneId != nil) {
        NSLog(@"zoneid: %@, bannerType: %@", zoneId, bannerType);
        dispatch_async(dispatch_get_main_queue(), ^{
            [_bannerView loadAdWithZoneId:zoneId andBannerType:bannerType];
        });
    }
}

@end
