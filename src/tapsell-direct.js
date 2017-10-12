let Tapsell = require("react-native").NativeModules.TapsellReactNative;
let TapsellIOS = require("react-native").NativeModules.TSTapsell;
import { DeviceEventEmitter, Platform, NativeEventEmitter } from "react-native";
import Constants from "./constants.js";

let callbacks = {};
callbacks[Constants.ON_AD_AVAILABLE_EVENT] = {};
callbacks[Constants.ON_ERROR_EVENT] = {};
callbacks[Constants.ON_NO_AD_AVAILABLE_EVENT] = {};
callbacks[Constants.ON_NO_NETWORK_EVENT] = {};
callbacks[Constants.ON_EXPIRING_EVENT] = {};
callbacks[Constants.ON_OPENED_EVENT] = {};
callbacks[Constants.ON_CLOSED_EVENT] = {};

const appEventEmitter =
	Platform.OS === "ios" ? NativeEventEmitter : DeviceEventEmitter;

// Direct Ad Events
appEventEmitter.addListener(Constants.ON_AD_AVAILABLE_EVENT, event => {
	if (callbacks[Constants.ON_AD_AVAILABLE_EVENT][event.zone_id])
		callbacks[Constants.ON_AD_AVAILABLE_EVENT][event.zone_id](
			event.zone_id,
			event.ad_id
		);
});
appEventEmitter.addListener(Constants.ON_ERROR_EVENT, event => {
	if (callbacks[Constants.ON_ERROR_EVENT][event.zone_id])
		callbacks[Constants.ON_ERROR_EVENT][event.zone_id](
			event.zone_id,
			event.error_message
		);
});
appEventEmitter.addListener(Constants.ON_NO_AD_AVAILABLE_EVENT, event => {
	if (callbacks[Constants.ON_NO_AD_AVAILABLE_EVENT][event.zone_id])
		callbacks[Constants.ON_NO_AD_AVAILABLE_EVENT][event.zone_id](
			event.zone_id
		);
});
appEventEmitter.addListener(Constants.ON_NO_NETWORK_EVENT, event => {
	if (callbacks[Constants.ON_NO_NETWORK_EVENT][event.zone_id])
		callbacks[Constants.ON_NO_NETWORK_EVENT][event.zone_id](event.zone_id);
});
appEventEmitter.addListener(Constants.ON_EXPIRING_EVENT, event => {
	if (callbacks[Constants.ON_EXPIRING_EVENT][event.zone_id])
		callbacks[Constants.ON_EXPIRING_EVENT][event.zone_id](
			event.zone_id,
			event.ad_id
		);
});
appEventEmitter.addListener(Constants.ON_OPENED_EVENT, event => {
	if (callbacks[Constants.ON_OPENED_EVENT][event.ad_id])
		callbacks[Constants.ON_OPENED_EVENT][event.ad_id](
			event.zone_id,
			event.ad_id
		);
});
appEventEmitter.addListener(Constants.ON_CLOSED_EVENT, event => {
	if (callbacks[Constants.ON_CLOSED_EVENT][event.ad_id])
		callbacks[Constants.ON_CLOSED_EVENT][event.ad_id](
			event.zone_id,
			event.ad_id
		);
});

module.exports = {
	showAd: function(adOptions, onOpened, onClosed) {
		callbacks[Constants.ON_CLOSED_EVENT][adOptions.ad_id] = onClosed;
		callbacks[Constants.ON_OPENED_EVENT][adOptions.ad_id] = onOpened;
		if (Platform.OS === "ios") {
			TapsellIOS.showAd({
				ad_id: adOptions.ad_id,
				back_disabled: adOptions.back_disabled,
				immersive_mode: adOptions.immersive_mode,
				rotation_mode: adOptions.rotation_mode,
				show_exit_dialog: adOptions.show_exit_dialog
			});
		} else if (Platform.OS === "android") {
			Tapsell.showAd(
				adOptions.ad_id,
				adOptions.back_disabled,
				adOptions.immersive_mode,
				adOptions.rotation_mode,
				adOptions.show_exit_dialog
			);
		}
	},
	requestAd: function(
		zoneId,
		isCached,
		onAdAvailable,
		onNoAdAvailable,
		onNoNetwork,
		onError,
		onExpiring
	) {
		callbacks[Constants.ON_AD_AVAILABLE_EVENT][zoneId] = onAdAvailable;
		callbacks[Constants.ON_NO_AD_AVAILABLE_EVENT][zoneId] = onNoAdAvailable;
		callbacks[Constants.ON_NO_NETWORK_EVENT][zoneId] = onNoNetwork;
		callbacks[Constants.ON_ERROR_EVENT][zoneId] = onError;
		callbacks[Constants.ON_EXPIRING_EVENT][zoneId] = onExpiring;
		if (Platform.OS === "ios") {
			TapsellIOS.requestAd(zoneId, isCached);
		} else if (Platform.OS === "android") {
			Tapsell.requestAd(zoneId, isCached);
		}
	},
	setRewardListener: function(onAdShowFinished) {
		if (Platform.OS === "ios") {
			TapsellIOS.setRewardListener(onAdShowFinished);
		} else if (Platform.OS === "android") {
			Tapsell.setRewardListener(onAdShowFinished);
		}
	}
};
