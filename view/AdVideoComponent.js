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
		UIManager.dispatchViewManagerCommand(
			findNodeHandle(this),
			UIManager.AdVideo.Commands.setAdId,
			[nextProps.adId]
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
	...View.propTypes
};

const AdVideo = requireNativeComponent(`AdVideo`, AdVideoComponent, {
	nativeOnly: {}
});

export default AdVideoComponent;
