import React, { Component, PropTypes } from "react";
import { NativeModules, requireNativeComponent, View } from "react-native";

class AdVideoComponent extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <AdVideo {...this.props} />;
	}
}

AdVideoComponent.propTypes = {
	adId: PropTypes.string,
	...View.propTypes
};

const AdVideo = requireNativeComponent(`AdVideo`, AdVideoComponent, {
	nativeOnly: {}
});

export default AdVideoComponent;
