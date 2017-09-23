import React, { Component } from "react";
import { NativeModules, requireNativeComponent, View } from "react-native";
import PropTypes from "prop-types";

const aspectRatio = 0.5625;

class AdVideoComponent extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<AdVideo
				style={{
					aspectRatio: 1 / aspectRatio,
					flex: 1
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
