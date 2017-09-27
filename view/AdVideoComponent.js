import React, { Component } from "react";
import {
	NativeModules,
	requireNativeComponent,
	View,
	UIManager,
	findNodeHandle,
	Dimensions
} from "react-native";
import PropTypes from "prop-types";

const aspectRatio = 0.5625;

class AdVideoComponent extends Component {
	constructor(props) {
		super(props);
	}

	componentWillReceiveProps(nextProps) {
		let adId = "";
		let autoStart = false;
		let fullScreenOnClick = false;
		if (typeof nextProps.adId != "undefined") {
			adId = nextProps.adId;
		}
		if (typeof nextProps.autoStart != "undefined") {
			autoStart = nextProps.autoStart;
		}
		if (typeof nextProps.fullScreenOnClick != "undefined") {
			fullScreenOnClick = nextProps.fullScreenOnClick;
		}
		UIManager.dispatchViewManagerCommand(
			findNodeHandle(this),
			UIManager.AdVideo.Commands.setAdId,
			[adId, autoStart, fullScreenOnClick]
		);
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
	fullScreenOnClick: PropTypes.bool,
	autoStartVideo: PropTypes.bool,
	...View.propTypes
};

const AdVideo = requireNativeComponent(`AdVideo`, AdVideoComponent, {
	nativeOnly: {}
});

export default AdVideoComponent;
