import React, { Component } from "react";
import { Image, StyleSheet, Text, View, Dimensions, TouchableOpacity, PermissionsAndroid, Platform } from "react-native";
import * as firebase from 'firebase';
import Video from "react-native-video";
import { NodeCameraView } from "react-native-nodemediaclient";

const deviceWidth = Dimensions.get("window").width;
const settings = {
	camera: { cameraId: 1, cameraFrontMirror: true },
	audio: { bitrate: 32000, profile: 1, samplerate: 44100 },
	video: {
		preset: 24,
		bitrate: 400000,
		profile: 2,
		fps: 30,
		videoFrontMirror: true,
	},
};

export default class HomeScreen extends Component {
	state = {
		name: "",
		email: "",
		displayName: "",
		admin: false,
		isPublishing: false,
		userComment: '',
		hasPermission: false,
		paused: true,
	}

	onPressAdminBtn = async () => {
		const { admin: adminState, hasPermission } = this.state;
		this.setState({ admin: !adminState });
		if (!adminState) {
			if (Platform.OS === 'android') {
				if (!hasPermission) {
					await this.checkPermissions();
				}
			}
		}
	};

	onPressPlayBtn = () => {
		const { paused: pausedState } = this.state;
		this.setState({ paused: !pausedState });
	};

	renderPlayerView = () => {
		const { paused } = this.state;
		const source = {
			uri: 'http://40.69.159.146/live/STREAM_NAME?sign=1903744798-dedca6058f361ce27fad457f658365fd/index.m3u8',
		};
		return (
			<Video
				source={source} // Can be a URL or a local file.
				/* eslint-disable */
				ref={ref => {
					this.player = ref;
				}} // Store reference
				/* eslint-enable */
				onBuffer={this.onBuffer} // Callback when remote video is buffering
				onError={this.onError} // Callback when video cannot be loaded
				style={styles.nodePlayerView}
				fullscreen={false}
				resizeMode="cover"
				paused={paused}
			/>
		);
	};

	onBuffer = buffer => {
		console.log('onBuffer: ', buffer);
	};

	onError = error => {
		console.log('onError: ', error);
	};

	renderCameraView = () => {
		const { hasPermission } = this.state;
		if (Platform.OS === 'android' && !hasPermission) {
			return <View />;
		}

		return (
			<NodeCameraView
				style={styles.nodeCameraView}
				/* eslint-disable */
				ref={vb => {
					this.vb = vb;
				}}
				outputUrl="rtmp://40.69.159.146/live/STREAM_NAME?sign=1903744798-dedca6058f361ce27fad457f658365fd"
				camera={settings.camera}
				audio={settings.audio}
				video={settings.video}
				autopreview
			/>
		);
	};

	checkPermissions = async () => {
		console.log('Checking Permissions Android');
		try {
			const granted = await PermissionsAndroid.requestMultiple([
				PermissionsAndroid.PERMISSIONS.CAMERA,
				PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
				PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
			]);
			let hasAllPermissions = true;
			Object.keys(granted).forEach(key => {
				// key: the name of the object key
				// index: the ordinal position of the key within the object
				if (granted[key] !== 'granted') {
					console.log('Does not have permission for: ', granted[key]);
					hasAllPermissions = false;
				}
			});
			console.log('hasAllPermissions: ', hasAllPermissions);
			this.setState({ hasPermission: hasAllPermissions });
		} catch (err) {
			console.warn(err);
		}
	};

	onPressPublishBtn = async () => {
		const { isPublishing: publishingState, hasPermission } = this.state;
		if (Platform.OS === 'android') {
			if (!hasPermission) {
				this.checkPermissions();
				return;
			}
		}

		if (publishingState) {
			this.vb.stop();
		} else {
			this.vb.start();
		}

		this.setState({ isPublishing: !publishingState });
	};


	componentDidMount() {
		const { email, displayName, name } = firebase.auth().currentUser;
		this.setState({ email, displayName, name });
	}

	signOutUser = () => {
		firebase.auth().signOut();
	}

	render() {
		const { admin, paused, isPublishing } = this.state;
		return (
			<View style={styles.container}>
				{admin ? this.renderCameraView() : this.renderPlayerView()}

				<TouchableOpacity
					style={styles.playBtn}
					onPress={this.onPressAdminBtn}>
					<View style={styles.btnText}>
						<Image source={{ uri: 'https://img.icons8.com/plasticine/2x/camera.png' }}
							style={{ width: 50, height: 50 }} />
					</View>
				</TouchableOpacity>

				<TouchableOpacity style={styles.playBtn} onPress={() => this.props.navigation.navigate("Form")} >
					<Image source={{ uri: 'https://img.icons8.com/bubbles/2x/list.png' }}
						style={{ width: 50, height: 50 }} />
				</TouchableOpacity>



				<TouchableOpacity onPress={this.onPressPublishBtn}>
					<View style={styles.goLive}>
						<Text style={styles.btnText}>
							{isPublishing ? 'END LIVE' : 'GO LIVE'}
						</Text>
					</View>
				</TouchableOpacity>
			</View>
		);
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: '#FFFFFF',
		flexDirection: 'row', flexWrap: 'wrap'
	}, buton: {
		marginTop: 32,
		marginHorizontal: 30,
		backgroundColor: "#0d8d9e",
		borderRadius: 4,
		height: 30,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 30
	},
	nodePlayerView: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	},
	nodeCameraView: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	},
	playBtn: {
		color: "#FFFFFF",
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		height: 50,
		width: deviceWidth / 3,
		paddingVertical: 10,
		paddingHorizontal: 30,
		marginVertical: 10,
	},
	playBtnContainer: {
		position: 'absolute',
		bottom: 100,
		left: 0,
		right: 0,
		marginVertical: 20,
	},
	goLive: {
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		backgroundColor: '#cc0000',
		borderRadius: 100,
		height: 50,
		width: deviceWidth / 3,
		paddingVertical: 10,
		paddingHorizontal: 30,
		elevation: 4,
		marginVertical: 10,
	},
	adminBtnContainer: {
		position: 'absolute',
		top: 0,
		right: 0,
		margin: 30,
		marginTop: 60,
	},
	adminBtn: {
		padding: 10,
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 4,
	},
	btnText: { color: '#FFF', fontSize: 18 },
})
