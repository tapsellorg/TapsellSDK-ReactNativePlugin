let Tapsell = require("./src/tapsell.js");
let TapsellNativeBanner = require("./src/tapsell-native-banner.js");
let TapsellNativeVideo = require("./src/tapsell-native-video.js");
let Constants = require("./src/constants.js");

module.exports = {
	ROTATION_LOCKED_PORTRAIT: Constants.ROTATION_LOCKED_PORTRAIT,
	ROTATION_LOCKED_LANDSCAPE: Constants.ROTATION_LOCKED_LANDSCAPE,
	ROTATION_UNLOCKED: Constants.ROTATION_UNLOCKED,
	ROTATION_LOCKED_REVERSED_PORTRAIT:
		Constants.ROTATION_LOCKED_REVERSED_PORTRAIT,
	ROTATION_LOCKED_REVERSED_LANDSCAPE:
		Constants.ROTATION_LOCKED_REVERSED_LANDSCAPE,
	PERMISSION_HANDLER_DISABLED: Constants.PERMISSION_HANDLER_DISABLED,
	PERMISSION_HANDLER_AUTO: Constants.PERMISSION_HANDLER_AUTO,
	PERMISSION_HANDLER_AUTO_INSIST: Constants.PERMISSION_HANDLER_AUTO_INSIST,

	initialize: Tapsell.initialize,
	setDebugMode: Tapsell.setDebugMode,
	isDebugMode: Tapsell.isDebugMode,
	setAppUserId: Tapsell.setAppUserId,
	getAppUserId: Tapsell.getAppUserId,
	setPermissionHandlerConfig: Tapsell.setPermissionHandlerConfig,
	getVersion: Tapsell.getVersion,
	setMaxAllowedBandwidthUsage: Tapsell.setMaxAllowedBandwidthUsage,
	setMaxAllowedBandwidthUsagePercentage:
		Tapsell.setMaxAllowedBandwidthUsagePercentage,
	clearBandwidthUsageConstrains: Tapsell.clearBandwidthUsageConstrains,

	showAd: Tapsell.showAd,
	requestAd: Tapsell.requestAd,
	setRewardListener: Tapsell.setRewardListener,

	requestNativeBannerAd: TapsellNativeBanner.requestNativeBannerAd,
	requestNativeVideoAd: TapsellNativeVideo.requestNativeVideoAd,

	get AdVideo() {
		return require("./view/AdVideoComponent.js").default;
	}
};
