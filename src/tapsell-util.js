let Tapsell = require("react-native").NativeModules.TapsellReactNative;
let TapsellIOS = require("react-native").NativeModules.TSTapsell;
import { Platform } from "react-native";

if (Platform.OS === "ios") {
	module.exports = {
		initialize: function(appKey) {
			TapsellIOS.initialize(appKey);
		},
		setDebugMode: function(mode) {
			TapsellIOS.setDebugMode(mode);
		},
		isDebugMode: function(debugMode) {
			TapsellIOS.isDebugMode(debugMode);
		},
		setAppUserId: function(appUserId) {
			TapsellIOS.setAppUserId(getReactApplicationContext(), appUserId);
		},
		getAppUserId: function(userId) {
			TapsellIOS.getAppUserId(userId);
		},
		setPermissionHandlerConfig: function(permissionHandlerConfig) {},
		getVersion: function(version) {
			TapsellIOS.getVersion(version);
		},
		setMaxAllowedBandwidthUsage: function(maxBpsSpeed) {},
		setMaxAllowedBandwidthUsagePercentage: function(maxPercentage) {},
		clearBandwidthUsageConstrains: function() {}
	};
} else {
	module.exports = {
		initialize: function(appKey) {
			Tapsell.initialize(appKey, "4.5.0");
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
}
