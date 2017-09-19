let Tapsell = require("react-native").NativeModules.TapsellReactNative;
import { DeviceEventEmitter } from "react-native";
import {
	onNativeBannerAdShown,
	onNativeBannerAdClicked
} from "./tapsell-native";

const ON_AD_AVAILABLE_EVENT = Tapsell.ON_AD_AVAILABLE_EVENT;
const ON_ERROR_EVENT = Tapsell.ON_ERROR_EVENT;
const ON_NO_AD_AVAILABLE_EVENT = Tapsell.ON_NO_AD_AVAILABLE_EVENT;
const ON_NO_NETWORK_EVENT = Tapsell.ON_NO_NETWORK_EVENT;
const ON_EXPIRING_EVENT = Tapsell.ON_EXPIRING_EVENT;
const ON_OPENED_EVENT = Tapsell.ON_OPENED_EVENT;
const ON_CLOSED_EVENT = Tapsell.ON_CLOSED_EVENT;

const ROTATION_LOCKED_PORTRAIT = Tapsell.ROTATION_LOCKED_PORTRAIT;
const ROTATION_LOCKED_LANDSCAPE = Tapsell.ROTATION_LOCKED_LANDSCAPE;
const ROTATION_UNLOCKED = Tapsell.ROTATION_UNLOCKED;
const ROTATION_LOCKED_REVERSED_PORTRAIT =
	Tapsell.ROTATION_LOCKED_REVERSED_PORTRAIT;
const ROTATION_LOCKED_REVERSED_LANDSCAPE =
	Tapsell.ROTATION_LOCKED_REVERSED_LANDSCAPE;

const PERMISSION_HANDLER_DISABLED = Tapsell.PERMISSION_HANDLER_DISABLED;
const PERMISSION_HANDLER_AUTO = Tapsell.PERMISSION_HANDLER_AUTO;
const PERMISSION_HANDLER_AUTO_INSIST = Tapsell.PERMISSION_HANDLER_AUTO_INSIST;

const ON_AD_AVAILABLE_NATIVE_EVENT = Tapsell.ON_AD_AVAILABLE_NATIVE_EVENT;
const ON_ERROR_NATIVE_EVENT = Tapsell.ON_ERROR_NATIVE_EVENT;
const ON_NO_AD_AVAILABLE_NATIVE_EVENT = Tapsell.ON_NO_AD_AVAILABLE_NATIVE_EVENT;
const ON_NO_NETWORK_NATIVE_EVENT = Tapsell.ON_NO_NETWORK_NATIVE_EVENT;

let callbacks = {};
callbacks.ON_AD_AVAILABLE_EVENT = {};
callbacks.ON_ERROR_EVENT = {};
callbacks.ON_NO_AD_AVAILABLE_EVENT = {};
callbacks.ON_NO_NETWORK_EVENT = {};
callbacks.ON_EXPIRING_EVENT = {};
callbacks.ON_OPENED_EVENT = {};
callbacks.ON_CLOSED_EVENT = {};

// Direct Ad Events
DeviceEventEmitter.addListener(ON_AD_AVAILABLE_EVENT, event => {
	if (callbacks.ON_AD_AVAILABLE_EVENT[event.zone_id])
		callbacks.ON_AD_AVAILABLE_EVENT[event.zone_id](
			event.zone_id,
			event.ad_id
		);
});
DeviceEventEmitter.addListener(ON_ERROR_EVENT, event => {
	if (callbacks.ON_ERROR_EVENT[event.zone_id])
		callbacks.ON_ERROR_EVENT[event.zone_id](
			event.zone_id,
			event.error_message
		);
});
DeviceEventEmitter.addListener(ON_NO_AD_AVAILABLE_EVENT, event => {
	if (callbacks.ON_NO_AD_AVAILABLE_EVENT[event.zone_id])
		callbacks.ON_NO_AD_AVAILABLE_EVENT[event.zone_id](event.zone_id);
});
DeviceEventEmitter.addListener(ON_NO_NETWORK_EVENT, event => {
	if (callbacks.ON_NO_NETWORK_EVENT[event.zone_id])
		callbacks.ON_NO_NETWORK_EVENT[event.zone_id](event.zone_id);
});
DeviceEventEmitter.addListener(ON_EXPIRING_EVENT, event => {
	if (callbacks.ON_EXPIRING_EVENT[event.zone_id])
		callbacks.ON_EXPIRING_EVENT[event.zone_id](event.zone_id, event.ad_id);
});
DeviceEventEmitter.addListener(ON_OPENED_EVENT, event => {
	if (callbacks.ON_OPENED_EVENT[event.ad_id])
		callbacks.ON_OPENED_EVENT[event.ad_id](event.zone_id, event.ad_id);
});
DeviceEventEmitter.addListener(ON_CLOSED_EVENT, event => {
	if (callbacks.ON_CLOSED_EVENT[event.ad_id])
		callbacks.ON_CLOSED_EVENT[event.ad_id](event.zone_id, event.ad_id);
});

// Native Ad Events
DeviceEventEmitter.addListener(ON_AD_AVAILABLE_NATIVE_EVENT, event => {
	if (callbacks.ON_AD_AVAILABLE_NATIVE_EVENT[event.zone_id]) {
		callbacks.ON_AD_AVAILABLE_NATIVE_EVENT[event.zone_id](
			event,
			onNativeBannerAdShown,
			onNativeBannerAdClicked
		);
	}
});
DeviceEventEmitter.addListener(ON_ERROR_NATIVE_EVENT, event => {
	if (callbacks.ON_ERROR_NATIVE_EVENT[event.zone_id]) {
		callbacks.ON_ERROR_NATIVE_EVENT[event.zone_id](event.error_message);
	}
});
DeviceEventEmitter.addListener(ON_NO_AD_AVAILABLE_NATIVE_EVENT, event => {
	if (callbacks.ON_NO_AD_AVAILABLE_NATIVE_EVENT[event.zone_id]) {
		callbacks.ON_NO_AD_AVAILABLE_NATIVE_EVENT[event.zone_id]();
	}
});
DeviceEventEmitter.addListener(ON_NO_NETWORK_NATIVE_EVENT, event => {
	if (callbacks.ON_NO_NETWORK_NATIVE_EVENT[event.zone_id]) {
		callbacks.ON_NO_NETWORK_NATIVE_EVENT[event.zone_id]();
	}
});

module.exports = {
	ROTATION_LOCKED_PORTRAIT,
	ROTATION_LOCKED_LANDSCAPE,
	ROTATION_UNLOCKED,
	ROTATION_LOCKED_REVERSED_PORTRAIT,
	ROTATION_LOCKED_REVERSED_LANDSCAPE,
	PERMISSION_HANDLER_DISABLED,
	PERMISSION_HANDLER_AUTO,
	PERMISSION_HANDLER_AUTO_INSIST,
	initialize: function(appKey) {
		Tapsell.initialize(appKey);
	},
	showAd: function(adOptions) {
		Tapsell.showAd(
			adOptions.ad_id,
			adOptions.back_disabled,
			adOptions.immersive_mode,
			adOptions.rotation_mode,
			adOptions.show_exit_dialog
		);
	},
	showAd: function(adOptions, onOpened, onClosed) {
		callbacks.ON_CLOSED_EVENT[adOptions.ad_id] = onClosed;
		callbacks.ON_OPENED_EVENT[adOptions.ad_id] = onOpened;
		Tapsell.showAd(
			adOptions.ad_id,
			adOptions.back_disabled,
			adOptions.immersive_mode,
			adOptions.rotation_mode,
			adOptions.show_exit_dialog
		);
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
		callbacks.ON_AD_AVAILABLE_EVENT[zoneId] = onAdAvailable;
		callbacks.ON_NO_AD_AVAILABLE_EVENT[zoneId] = onNoAdAvailable;
		callbacks.ON_NO_NETWORK_EVENT[zoneId] = onNoNetwork;
		callbacks.ON_ERROR_EVENT[zoneId] = onError;
		callbacks.ON_EXPIRING_EVENT[zoneId] = onExpiring;
		Tapsell.requestAd(zoneId, isCached);
	},
	requestNativeAd: function(
		zoneId,
		onAdAvailable,
		onNoAdAvailable,
		onNoNetwork,
		onError
	) {
		callbacks.ON_AD_AVAILABLE_NATIVE_EVENT[zoneId] = onAdAvailable;
		callbacks.ON_NO_AD_AVAILABLE_NATIVE_EVENT[zoneId] = onNoAdAvailable;
		callbacks.ON_NO_NETWORK_NATIVE_EVENT[zoneId] = onNoNetwork;
		callbacks.ON_ERROR_NATIVE_EVENT[zoneId] = onError;
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
