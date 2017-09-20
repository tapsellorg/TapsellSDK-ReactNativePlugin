let Tapsell = require("react-native").NativeModules.TapsellReactNative;

export var onNativeBannerAdShown = ad_id => {
	Tapsell.onNativeBannerAdShown(ad_id);
};

export var onNativeBannerAdClicked = ad_id => {
	Tapsell.onNativeBannerAdClicked(ad_id);
};
