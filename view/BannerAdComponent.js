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
let Constants = require("./../src/constants.js");
let width = 320,
	height = 50;

class BannerAdComponent extends Component {
	constructor(props) {
		super(props);
		if (
			typeof this.props.zoneId != "undefined" &&
			typeof this.props.bannerType != "undefined"
		) {
			switch (this.props.bannerType) {
				case Constants.BANNER_320x50:
					width = 320;
					height = 50;
					break;
				case Constants.BANNER_320x100:
					width = 320;
					height = 100;
					break;
				case Constants.BANNER_250x250:
					width = 250;
					height = 250;
					break;
				case Constants.BANNER_300x250:
					width = 300;
					height = 250;
					break;
			}
		}
	}

	shouldComponentUpdate(nextProps, nextState) {}

	componentDidMount() {
		if (
			typeof this.props.zoneId != "undefined" &&
			typeof this.props.bannerType != "undefined"
		) {
			UIManager.dispatchViewManagerCommand(
				findNodeHandle(this),
				UIManager.BannerAd.Commands.loadBanner,
				[this.props.zoneId, this.props.bannerType]
			);
		}
	}

	componentWillReceiveProps(nextProps) {
		let zoneId = "";
		let bannerType = 0;
		if (typeof nextProps.zoneId != "undefined") {
			zoneId = nextProps.zoneId;
		}
		if (typeof nextProps.bannerType != "undefined") {
			bannerType = nextProps.bannerType;
			switch (bannerType) {
				case Constants.BANNER_320x50:
					width = 320;
					height = 50;
					break;
				case Constants.BANNER_320x100:
					width = 320;
					height = 100;
					break;
				case Constants.BANNER_250x250:
					width = 250;
					height = 250;
					break;
				case Constants.BANNER_300x250:
					width = 300;
					height = 250;
					break;
			}
		}
		if (
			typeof nextProps.zoneId != "undefined" &&
			typeof nextProps.bannerType != "undefined"
		) {
			UIManager.dispatchViewManagerCommand(
				findNodeHandle(this),
				UIManager.BannerAd.Commands.loadBanner,
				[zoneId, bannerType]
			);
		}
	}

	render() {
		return (
			<BannerAd
				style={{
					width: width,
					backgroundColor: "black",
                    height: height,
				}}
				{...this.props}
			/>
		);
	}
}

BannerAdComponent.propTypes = {
	zoneId: PropTypes.string.isRequired,
	bannerType: PropTypes.number.isRequired,
	...View.propTypes
};

const BannerAd = requireNativeComponent(`BannerAd`, BannerAdComponent, {
	nativeOnly: {}
});

export default BannerAdComponent;
