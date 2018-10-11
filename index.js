let TapsellUtil = require("./src/tapsell-util.js");
let TapsellDirect = require("./src/tapsell-direct.js");
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

	CACHE_SIZE_MEDIUM : Constants.CACHE_SIZE_MEDIUM,
	CACHE_SIZE_SMALL : Constants.CACHE_SIZE_SMALL,
	CACHE_SIZE_NONE : Constants.CACHE_SIZE_NONE,

	BANNER_320x50: Constants.BANNER_320x50,
	BANNER_320x100: Constants.BANNER_320x100,
	BANNER_250x250: Constants.BANNER_250x250,
	BANNER_300x250: Constants.BANNER_300x250,

	initialize: TapsellUtil.initialize,
	setDebugMode: TapsellUtil.setDebugMode,
	isDebugMode: TapsellUtil.isDebugMode,
	setAppUserId: TapsellUtil.setAppUserId,
	getAppUserId: TapsellUtil.getAppUserId,
	setPermissionHandlerConfig: TapsellUtil.setPermissionHandlerConfig,
	getVersion: TapsellUtil.getVersion,
	setMaxAllowedBandwidthUsage: TapsellUtil.setMaxAllowedBandwidthUsage,
	setMaxAllowedBandwidthUsagePercentage:
		TapsellUtil.setMaxAllowedBandwidthUsagePercentage,
	clearBandwidthUsageConstrains: TapsellUtil.clearBandwidthUsageConstrains,

	showAd: TapsellDirect.showAd,
	requestAd: TapsellDirect.requestAd,
	setRewardListener: TapsellDirect.setRewardListener,

	createCache: TapsellNativeBanner.createCache,
	requestCachedNativeBannerAd: TapsellNativeBanner.requestCachedNativeBannerAd,

	requestNativeBannerAd: TapsellNativeBanner.requestNativeBannerAd,
	requestNativeVideoAd: TapsellNativeVideo.requestNativeVideoAd,

	get AdVideo() {
		return require("./view/AdVideoComponent.js").default;
	},

	get BannerAd() {
		return require("./view/BannerAdComponent.js").default;
	}
};
