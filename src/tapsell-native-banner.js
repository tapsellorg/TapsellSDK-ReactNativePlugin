let Tapsell = require("react-native").NativeModules.TapsellReactNative;
let TapsellIOS = require("react-native").NativeModules.TSTapsell;
import { DeviceEventEmitter, Platform, NativeEventEmitter } from "react-native";
import Constants from "./constants.js";

let onNativeBannerAdShown = ad_id => {
	if (Platform.OS == "ios") {
		TapsellIOS.onNativeBannerAdShown(ad_id);
	} else {
		Tapsell.onNativeBannerAdShown(ad_id);
	}
};

let onNativeBannerAdClicked = ad_id => {
	if (Platform.OS == "ios") {
		TapsellIOS.onNativeBannerAdClicked(ad_id);
	} else {
		Tapsell.onNativeBannerAdClicked(ad_id);
	}
};

let callbacks = {};
callbacks[Constants.ON_AD_AVAILABLE_NATIVE_BANNER_EVENT] = {};
callbacks[Constants.ON_ERROR_NATIVE_BANNER_EVENT] = {};
callbacks[Constants.ON_NO_AD_AVAILABLE_NATIVE_BANNER_EVENT] = {};
callbacks[Constants.ON_NO_NETWORK_NATIVE_BANNER_EVENT] = {};
const appEventEmitter =
	Platform.OS === "ios"
		? new NativeEventEmitter(TapsellIOS)
		: DeviceEventEmitter;

// Native Banner Ad Events
appEventEmitter.addListener(
	Constants.ON_AD_AVAILABLE_NATIVE_BANNER_EVENT,
	event => {
		if (
			callbacks[Constants.ON_AD_AVAILABLE_NATIVE_BANNER_EVENT][
				event.zone_id
			]
		) {
			callbacks[Constants.ON_AD_AVAILABLE_NATIVE_BANNER_EVENT][
				event.zone_id
			](event, onNativeBannerAdShown, onNativeBannerAdClicked);
		}
	}
);
appEventEmitter.addListener(Constants.ON_ERROR_NATIVE_BANNER_EVENT, event => {
	if (callbacks[Constants.ON_ERROR_NATIVE_BANNER_EVENT][event.zone_id]) {
		callbacks[Constants.ON_ERROR_NATIVE_BANNER_EVENT][event.zone_id](
			event.error_message
		);
	}
});
appEventEmitter.addListener(
	Constants.ON_NO_AD_AVAILABLE_NATIVE_BANNER_EVENT,
	event => {
		if (
			callbacks[Constants.ON_NO_AD_AVAILABLE_NATIVE_BANNER_EVENT][
				event.zone_id
			]
		) {
			callbacks[Constants.ON_NO_AD_AVAILABLE_NATIVE_BANNER_EVENT][
				event.zone_id
			]();
		}
	}
);
appEventEmitter.addListener(
	Constants.ON_NO_NETWORK_NATIVE_BANNER_EVENT,
	event => {
		if (
			callbacks[Constants.ON_NO_NETWORK_NATIVE_BANNER_EVENT][
				event.zone_id
			]
		) {
			callbacks[Constants.ON_NO_NETWORK_NATIVE_BANNER_EVENT][
				event.zone_id
			]();
		}
	}
);

/**
 * @deprecated
 */
export var requestNativeBannerAd = (
	zoneId,
	onAdAvailable,
	onNoAdAvailable,
	onNoNetwork,
	onError
) => {
	callbacks[Constants.ON_AD_AVAILABLE_NATIVE_BANNER_EVENT][
		zoneId
	] = onAdAvailable;
	callbacks[Constants.ON_NO_AD_AVAILABLE_NATIVE_BANNER_EVENT][
		zoneId
	] = onNoAdAvailable;
	callbacks[Constants.ON_NO_NETWORK_NATIVE_BANNER_EVENT][
		zoneId
	] = onNoNetwork;
	callbacks[Constants.ON_ERROR_NATIVE_BANNER_EVENT][zoneId] = onError;
	if (Platform.OS == "ios") {
		TapsellIOS.requestNativeBannerAd(zoneId);
	} else {
		Tapsell.requestNativeBannerAd(zoneId);
	}
};

export var requestCachedNativeBannerAd = (
	zoneId,
	onAdAvailable,
	onError
) => {
	callbacks[Constants.ON_AD_AVAILABLE_NATIVE_BANNER_EVENT][zoneId] = onAdAvailable;
	callbacks[Constants.ON_ERROR_NATIVE_BANNER_EVENT][zoneId] = onError;
	if (Platform.OS == "android") {
		Tapsell.requestNativeBannerAd(zoneId);
	}
};

export const cacheSize = {
	MEDIUM : 'MEDIUM',
    SMALL : 'SMALL',
    NONE : 'NONE'
}

export var createCache = (zoneId, cacheSize) => {
	if (Platform.OS == "android") {
		Tapsell.createNativeAdCache(zoneId, cacheSize);
	}
};

//TODO fix
// export var getAllNativeAds = (
// 	zoneId,
// 	onResponse,
// 	onError
// ) => {
// 	callbacks[Constants.ON_AD_AVAILABLE_NATIVE_BANNER_EVENT][zoneId] = onResponse;
// 	callbacks[Constants.ON_ERROR_NATIVE_BANNER_EVENT][zoneId] = onError;
// 	if (Platform.OS == "android") {
// 		Tapsell.getAllBannerAds(zoneId);
// 	}
// };