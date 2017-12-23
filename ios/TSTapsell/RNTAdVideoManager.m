#import "RNTAdVideoManager.h"
#import "TSTapsell.h"

@implementation RNTAdVideoManager
RCT_EXPORT_MODULE()

- (UIView *)view
{
    TSNativeVideoAdView* videoView = [[TSNativeVideoAdView alloc] init];
    TSNativeVideoContainerView* videoContainer = [[TSNativeVideoContainerView alloc] init];
    [videoContainer setTag:4];
    [videoView addSubview:videoContainer];
    [videoContainer setFrame:CGRectMake(videoView.bounds.origin.x, videoView.bounds.origin.y, videoView.frame.size.width, videoView.frame.size.height)];
    _videoView = videoView;
    return videoView;
}

RCT_EXPORT_METHOD(loadAd:(NSString*)adId) {
    if (adId != nil) {
        [_videoView fillVideoView:adId withUrl:[[TSTapsell nativeVideos] objectForKey:adId]];
    }
}

@end
