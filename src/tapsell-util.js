let Tapsell = require("react-native").NativeModules.TapsellReactNative;

module.exports = {
	initialize: function(appKey) {
		Tapsell.initialize(appKey);
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
