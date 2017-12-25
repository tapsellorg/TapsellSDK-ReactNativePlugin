#import "RNTAdVideoManager.h"
#import "TSTapsell.h"

@implementation RNTAdVideoManager
RCT_EXPORT_MODULE()
CGFloat aspectRatio = 0.5625;

- (UIView *)view
{
    CGRect screenRect = [[UIScreen mainScreen] bounds];
    CGFloat screenWidth = screenRect.size.width;
    _videoView = [[TSNativeVideoAdView alloc] initWithFrame:CGRectMake(0, 0, screenWidth, screenWidth*aspectRatio)];
    TSNativeVideoContainerView* videoContainer = [[TSNativeVideoContainerView alloc] init];
    [videoContainer setTag:4];
    [videoContainer setFrame:CGRectMake(_videoView.bounds.origin.x, _videoView.bounds.origin.y, _videoView.frame.size.width, _videoView.frame.size.height)];
    [_videoView addSubview:videoContainer];
    return _videoView;
}

RCT_EXPORT_METHOD(loadAd:(NSString*)adId) {
    if (adId != nil) {
        dispatch_async(dispatch_get_main_queue(), ^{
            [_videoView fillVideoView:adId withUrl:[[TSTapsell nativeVideos] objectForKey:adId]];
        });
    }
}

@end
