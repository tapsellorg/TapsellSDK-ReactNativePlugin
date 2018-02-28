let Tapsell = require("react-native").NativeModules.TapsellReactNative;
let TapsellIOS = require("react-native").NativeModules.TSTapsell;
import { DeviceEventEmitter, Platform, NativeEventEmitter } from "react-native";
import Constants from "./constants.js";

let onNativeVideoAdShown = ad_id => {
	if (Platform.OS == "ios") TapsellIOS.onNativeVideoAdShown(ad_id);
	else Tapsell.onNativeVideoAdShown(ad_id);
};

let onNativeVideoAdClicked = ad_id => {
	if (Platform.OS == "ios") TapsellIOS.onNativeVideoAdClicked(ad_id);
	else Tapsell.onNativeVideoAdClicked(ad_id);
};

let callbacks = {};
callbacks[Constants.ON_AD_AVAILABLE_NATIVE_VIDEO_EVENT] = {};
callbacks[Constants.ON_ERROR_NATIVE_VIDEO_EVENT] = {};
callbacks[Constants.ON_NO_AD_AVAILABLE_NATIVE_VIDEO_EVENT] = {};
callbacks[Constants.ON_NO_NETWORK_NATIVE_VIDEO_EVENT] = {};

const appEventEmitter =
	Platform.OS === "ios"
		? new NativeEventEmitter(TapsellIOS)
		: DeviceEventEmitter;
// Native Video Ad Events
appEventEmitter.addListener(
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
appEventEmitter.addListener(Constants.ON_ERROR_NATIVE_VIDEO_EVENT, event => {
	if (callbacks[Constants.ON_ERROR_NATIVE_VIDEO_EVENT][event.zone_id]) {
		callbacks[Constants.ON_ERROR_NATIVE_VIDEO_EVENT][event.zone_id](
			event.error_message
		);
	}
});
appEventEmitter.addListener(
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
appEventEmitter.addListener(
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
	if (Platform.OS == "ios") TapsellIOS.requestNativeVideoAd(zoneId);
	else Tapsell.requestNativeVideoAd(zoneId);
};
