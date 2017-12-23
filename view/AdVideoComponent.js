import React, { Component } from "react";
import {
	NativeModules,
	requireNativeComponent,
	View,
	UIManager,
	findNodeHandle,
	Platform,
	Dimensions
} from "react-native";
import PropTypes from "prop-types";
let TapsellIOS = require("react-native").NativeModules.RNTAdVideoManager;

const aspectRatio = 0.5625;

let AdVideoKey = "AdVideo";
if (Platform.OS == "ios") AdVideoKey = "RNTAdVideo";

class AdVideoComponent extends Component {
	constructor(props) {
		super(props);
	}

	componentWillReceiveProps(nextProps) {
		let adId = "";
		let autoStartVideo = false;
		let fullScreenOnClick = false;
		if (typeof nextProps.adId != "undefined") {
			adId = nextProps.adId;
		}
		if (typeof nextProps.autoStartVideo != "undefined") {
			autoStartVideo = nextProps.autoStartVideo;
		}
		if (typeof nextProps.fullScreenOnClick != "undefined") {
			fullScreenOnClick = nextProps.fullScreenOnClick;
		}
		if (Platform.OS == "android") {
			UIManager.dispatchViewManagerCommand(
				findNodeHandle(this),
				UIManager.AdVideo.Commands.setAdId,
				[adId, autoStartVideo, fullScreenOnClick]
			);
		} else if (Platform.OS == "ios") {
			TapsellIOS.loadAd(nextProps.adId);
		}
	}

	render() {
		let { height, width } = Dimensions.get("window");
		return (
			<AdVideo
				style={{
					width: width,
					backgroundColor: "black",
					height: width * aspectRatio
				}}
				{...this.props}
			/>
		);
	}
}

AdVideoComponent.propTypes = {
	adId: PropTypes.string.isRequired,
	...View.propTypes
};

const AdVideo = requireNativeComponent(AdVideoKey, AdVideoComponent, {
	nativeOnly: {}
});

export default AdVideoComponent;
