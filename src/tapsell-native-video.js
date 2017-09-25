let Tapsell = require("react-native").NativeModules.TapsellReactNative;
import { DeviceEventEmitter } from "react-native";
import Constants from "./constants.js";

let onNativeVideoAdShown = ad_id => {
	Tapsell.onNativeAdShown(ad_id);
};

let onNativeVideoAdClicked = ad_id => {
	Tapsell.onNativeAdClicked(ad_id);
};

let callbacks = {};
callbacks[Constants.ON_AD_AVAILABLE_NATIVE_VIDEO_EVENT] = {};
callbacks[Constants.ON_ERROR_NATIVE_VIDEO_EVENT] = {};
callbacks[Constants.ON_NO_AD_AVAILABLE_NATIVE_VIDEO_EVENT] = {};
callbacks[Constants.ON_NO_NETWORK_NATIVE_VIDEO_EVENT] = {};

// Native Video Ad Events
DeviceEventEmitter.addListener(
	Constants.ON_AD_AVAILABLE_NATIVE_VIDEO_EVENT,
	event => {
		if (
			callbacks[Constants.ON_AD_AVAILABLE_NATIVE_VIDEO_EVENT][
				event.zone_id
			]
		) {
			callbacks[Constants.ON_AD_AVAILABLE_NATIVE_VIDEO_EVENT][
				event.zone_id
			](event, onNativeVideoAdShown, onNativeVideoAdClicked);
		}
	}
);
DeviceEventEmitter.addListener(Constants.ON_ERROR_NATIVE_VIDEO_EVENT, event => {
	if (callbacks[Constants.ON_ERROR_NATIVE_VIDEO_EVENT][event.zone_id]) {
		callbacks[Constants.ON_ERROR_NATIVE_VIDEO_EVENT][event.zone_id](
			event.error_message
		);
	}
});
DeviceEventEmitter.addListener(
	Constants.ON_NO_AD_AVAILABLE_NATIVE_VIDEO_EVENT,
	event => {
		if (
			callbacks[Constants.ON_NO_AD_AVAILABLE_NATIVE_VIDEO_EVENT][
				event.zone_id
			]
		) {
			callbacks[Constants.ON_NO_AD_AVAILABLE_NATIVE_VIDEO_EVENT][
				event.zone_id
			]();
		}
	}
);
DeviceEventEmitter.addListener(
	Constants.ON_NO_NETWORK_NATIVE_VIDEO_EVENT,
	event => {
		if (
			callbacks[Constants.ON_NO_NETWORK_NATIVE_VIDEO_EVENT][event.zone_id]
		) {
			callbacks[Constants.ON_NO_NETWORK_NATIVE_VIDEO_EVENT][
				event.zone_id
			]();
		}
	}
);

export var requestNativeVideoAd = (
	zoneId,
	onAdAvailable,
	onNoAdAvailable,
	onNoNetwork,
	onError
) => {
	callbacks[Constants.ON_AD_AVAILABLE_NATIVE_VIDEO_EVENT][
		zoneId
	] = onAdAvailable;
	callbacks[Constants.ON_NO_AD_AVAILABLE_NATIVE_VIDEO_EVENT][
		zoneId
	] = onNoAdAvailable;
	callbacks[Constants.ON_NO_NETWORK_NATIVE_VIDEO_EVENT][zoneId] = onNoNetwork;
	callbacks[Constants.ON_ERROR_NATIVE_VIDEO_EVENT][zoneId] = onError;
	Tapsell.requestNativeVideoAd(zoneId);
};
