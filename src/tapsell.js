let Tapsell = require("react-native").NativeModules.TapsellReactNative;
import { DeviceEventEmitter } from "react-native";
import {
	onNativeBannerAdShown,
	onNativeBannerAdClicked
} from "./tapsell-native";
import Constants from "./constants.js";

let callbacks = {};
callbacks[Constants.ON_AD_AVAILABLE_EVENT] = {};
callbacks[Constants.ON_ERROR_EVENT] = {};
callbacks[Constants.ON_NO_AD_AVAILABLE_EVENT] = {};
callbacks[Constants.ON_NO_NETWORK_EVENT] = {};
callbacks[Constants.ON_EXPIRING_EVENT] = {};
callbacks[Constants.ON_OPENED_EVENT] = {};
callbacks[Constants.ON_CLOSED_EVENT] = {};
callbacks[Constants.ON_AD_AVAILABLE_NATIVE_EVENT] = {};
callbacks[Constants.ON_ERROR_NATIVE_EVENT] = {};
callbacks[Constants.ON_NO_AD_AVAILABLE_NATIVE_EVENT] = {};
callbacks[Constants.ON_NO_NETWORK_NATIVE_EVENT] = {};

// Direct Ad Events
DeviceEventEmitter.addListener(Constants.ON_AD_AVAILABLE_EVENT, event => {
	if (callbacks[Constants.ON_AD_AVAILABLE_EVENT][event.zone_id])
		callbacks[Constants.ON_AD_AVAILABLE_EVENT][event.zone_id](
			event.zone_id,
			event.ad_id
		);
});
DeviceEventEmitter.addListener(Constants.ON_ERROR_EVENT, event => {
	if (callbacks[Constants.ON_ERROR_EVENT][event.zone_id])
		callbacks[Constants.ON_ERROR_EVENT][event.zone_id](
			event.zone_id,
			event.error_message
		);
});
DeviceEventEmitter.addListener(Constants.ON_NO_AD_AVAILABLE_EVENT, event => {
	if (callbacks[Constants.ON_NO_AD_AVAILABLE_EVENT][event.zone_id])
		callbacks[Constants.ON_NO_AD_AVAILABLE_EVENT][event.zone_id](
			event.zone_id
		);
});
DeviceEventEmitter.addListener(Constants.ON_NO_NETWORK_EVENT, event => {
	if (callbacks[Constants.ON_NO_NETWORK_EVENT][event.zone_id])
		callbacks[Constants.ON_NO_NETWORK_EVENT][event.zone_id](event.zone_id);
});
DeviceEventEmitter.addListener(Constants.ON_EXPIRING_EVENT, event => {
	if (callbacks[Constants.ON_EXPIRING_EVENT][event.zone_id])
		callbacks[Constants.ON_EXPIRING_EVENT][event.zone_id](
			event.zone_id,
			event.ad_id
		);
});
DeviceEventEmitter.addListener(Constants.ON_OPENED_EVENT, event => {
	if (callbacks[Constants.ON_OPENED_EVENT][event.ad_id])
		callbacks[Constants.ON_OPENED_EVENT][event.ad_id](
			event.zone_id,
			event.ad_id
		);
});
DeviceEventEmitter.addListener(Constants.ON_CLOSED_EVENT, event => {
	if (callbacks[Constants.ON_CLOSED_EVENT][event.ad_id])
		callbacks[Constants.ON_CLOSED_EVENT][event.ad_id](
			event.zone_id,
			event.ad_id
		);
});

// Native Ad Events
DeviceEventEmitter.addListener(
	Constants.ON_AD_AVAILABLE_NATIVE_EVENT,
	event => {
		if (callbacks[Constants.ON_AD_AVAILABLE_NATIVE_EVENT][event.zone_id]) {
			callbacks[Constants.ON_AD_AVAILABLE_NATIVE_EVENT][event.zone_id](
				event,
				onNativeBannerAdShown,
				onNativeBannerAdClicked
			);
		}
	}
);
DeviceEventEmitter.addListener(Constants.ON_ERROR_NATIVE_EVENT, event => {
	if (callbacks[Constants.ON_ERROR_NATIVE_EVENT][event.zone_id]) {
		callbacks[Constants.ON_ERROR_NATIVE_EVENT][event.zone_id](
			event.error_message
		);
	}
});
DeviceEventEmitter.addListener(
	Constants.ON_NO_AD_AVAILABLE_NATIVE_EVENT,
	event => {
		if (
			callbacks[Constants.ON_NO_AD_AVAILABLE_NATIVE_EVENT][event.zone_id]
		) {
			callbacks[Constants.ON_NO_AD_AVAILABLE_NATIVE_EVENT][
				event.zone_id
			]();
		}
	}
);
DeviceEventEmitter.addListener(Constants.ON_NO_NETWORK_NATIVE_EVENT, event => {
	if (callbacks[Constants.ON_NO_NETWORK_NATIVE_EVENT][event.zone_id]) {
		callbacks[Constants.ON_NO_NETWORK_NATIVE_EVENT][event.zone_id]();
	}
});

module.exports = {
	initialize: function(appKey) {
		Tapsell.initialize(appKey);
	},
	showAd: function(adOptions, onOpened, onClosed) {
		if (onOpened) {
			if (onClosed) {
				callbacks[Constants.ON_CLOSED_EVENT][
					adOptions.ad_id
				] = onClosed;
				callbacks[Constants.ON_OPENED_EVENT][
					adOptions.ad_id
				] = onOpened;
				Tapsell.showAd(
					adOptions.ad_id,
					adOptions.back_disabled,
					adOptions.immersive_mode,
					adOptions.rotation_mode,
					adOptions.show_exit_dialog,
					onOpened,
					onClosed
				);
			}
		} else {
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
		Tapsell.requestAd(zoneId, isCached);
	},
	requestNativeAd: function(
		zoneId,
		onAdAvailable,
		onNoAdAvailable,
		onNoNetwork,
		onError
	) {
		callbacks[Constants.ON_AD_AVAILABLE_NATIVE_EVENT][
			zoneId
		] = onAdAvailable;
		callbacks[Constants.ON_NO_AD_AVAILABLE_NATIVE_EVENT][
			zoneId
		] = onNoAdAvailable;
		callbacks[Constants.ON_NO_NETWORK_NATIVE_EVENT][zoneId] = onNoNetwork;
		callbacks[Constants.ON_ERROR_NATIVE_EVENT][zoneId] = onError;
		Tapsell.requestNativeBannerAd(zoneId);
	},
	setRewardListener: function(onAdShowFinished) {
		Tapsell.setRewardListener(onAdShowFinished);
	},
	setDebugMode: function(mode) {
		Tapsell.setDebugMode(mode);
	},
	isDebugMode: function(debugMode) {
		Tapsell.isDebugMode(debugMode);
	},
	setAppUserId: function(appUserId) {
		Tapsell.setAppUserId(getReactApplicationContext(), appUserId);
	},
	getAppUserId: function(userId) {
		Tapsell.getAppUserId(userId);
	},
	setPermissionHandlerConfig: function(permissionHandlerConfig) {
		Tapsell.setPermissionHandlerConfig(permissionHandlerConfig);
	},
	getVersion: function(version) {
		Tapsell.getVersion(version);
	},
	setMaxAllowedBandwidthUsage: function(maxBpsSpeed) {
		Tapsell.setMaxAllowedBandwidthUsage(maxBpsSpeed);
	},
	setMaxAllowedBandwidthUsagePercentage: function(maxPercentage) {
		Tapsell.setMaxAllowedBandwidthUsagePercentage(maxPercentage);
	},
	clearBandwidthUsageConstrains: function() {
		Tapsell.clearBandwidthUsageConstrains();
	}
};
