import React, { Component } from "react";
import { Alert,Image, StyleSheet, Text, View, Dimensions, TouchableOpacity, PermissionsAndroid, Platform } from "react-native";
import * as firebase from 'firebase';

const deviceWidth = Dimensions.get("window").width;
const settings = {
	camera: { cameraId: 2, cameraFrontMirror: true },
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
		userComment: '',
		hasPermission: false,
        paused: true,
        fileData: '',
        fileUri: '',
        filePath : '',
        Mime : '',
        photoURL : ''
	}


	componentDidMount() {
		const { email, displayName, name, photoURL } = firebase.auth().currentUser;
		this.setState({ email, displayName, name, photoURL });
	}

	signOutUser = () => {
		firebase.auth().signOut();
	}

	render() {
		const { admin, paused, isPublishing } = this.state;
		return (
			<View style={styles.container}>

				<View>
                    <Text style={styles.name}>Hola, {this.state.displayName || this.state.email}!</Text>
				</View>
                <Image source={{ uri: this.state.photoURL ? this.state.photoURL :'https://cdn.pixabay.com/photo/2016/03/31/19/58/avatar-1295431_960_720.png' }}
                    style={{ width: 175, height: 210 }} />
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Image")} style={styles.playBtn}>
                    <Text >Actualizar Avatar</Text>
                </TouchableOpacity>

				<TouchableOpacity style={styles.playBtn} onPress={() => this.props.navigation.navigate("Watch")} >
					<Text>Entrar a Stream</Text>
				</TouchableOpacity>

                {this.state.email === "admin@admin.com" ?
                <TouchableOpacity
                    style={styles.playBtn}
                    onPress={() => this.props.navigation.navigate("Emit")} >
                    <View >
                        <Text style={styles.btnText}>
                            Panel de admin
                        </Text>
                    </View>
                </TouchableOpacity>  : false
                } 

                <TouchableOpacity style={styles.playBtn} onPress={this.signOutUser}>
                    <Text>Salir</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({

	container: {
		flex: 1,
		// backgroundColor: '#FFFFFF',
		justifyContent: 'center',
		alignItems: "center"
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
	playBtn: {
		color: "#FFFFFF",
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		backgroundColor: '#4287f5',
		borderColor: '#4287f5',
		borderWidth: 3,
		borderRadius: 2,
		height: 50,
		width: deviceWidth / 2,
		paddingVertical: 10,
		paddingHorizontal: 30,
		elevation: 4,
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
		borderColor: '#d1a667',
		borderWidth: 3,
		borderRadius: 2,
		height: 50,
		width: deviceWidth / 2,
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
		backgroundColor: '#006D9E',
		padding: 10,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
		elevation: 4,
	},
	btnText: { color: '#FFF', fontSize: 18 },
    btnSection: {
            width: 225,
            height: 50,
            backgroundColor: '#DCDCDC',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 3,
            marginBottom:10
          
    },name : {
        fontSize : 30,
        padding : 5
    }
})
