import React, { Component } from "react";
import {TouchableOpacity, StyleSheet, Text, View, ActivityIndicator} from "react-native";
import * as firebase from 'firebase';
import ImagePicker from 'react-native-image-picker';

export default class ImageScreen extends Component {

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
        Mime : ''
	}
    componentDidMount(){
        firebase.auth().onAuthStateChanged( user => {
            this.props.navigation.navigate(user ? "App" : "Auth")
        })
    }
    
    launchImageLibrary = () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',

            },

        };
        ImagePicker.launchImageLibrary(options, (response) => {

            if (response.didCancel) {
                console.log('User cancelled image picker');

            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);

            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);

            } else {
                const source = { uri: response.uri  };
// console.log('response', JSON.stringify(response.uri));
                this.setState({
                    filePath: response,
                    fileData: response.data,
                    fileUri: response.uri,
                    Mime : response.type
                });

            }

        });
    }
    uriToBlob = (uri) => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function() {
                resolve(xhr.response);
            };
            xhr.onerror = function() {
                reject(new Error('uriToBlob failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', uri, true);
            xhr.send(null);
        });
    }

    upload = async () => {
        const uri = this.state.fileUri;
        const image = this.state.fileData;
        const path = this.state.filePath;
        const mime = this.state.Mime
        const user = firebase.auth().currentUser.uid;
        const Ref = firebase.storage().ref('Avatar').child(user)
        const blob = await this.uriToBlob(uri)
        console.log(blob)
        Ref.put(blob, {contentType : mime}).then(function(snapshot) {
            console.debug('Uploaded a blob or file!');
            console.log(snapshot)
        }).then(() => {
            return Ref.getDownloadURL()
        }).then( url => {
            console.log(url)
            firebase.auth().currentUser.updateProfile({
                photoURL : url
            })
        } )

    }
    render(){
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.launchImageLibrary} style={styles.btnSection}  >
                    <Text style={styles.btnText}>Seleccionar Imagen</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.upload} style={styles.btnSection}  >
                    <Text style={styles.btnText}>Subir Imagen</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex :1,
        alignItems : 'center',
            justifyContent: 'center'
    },
    ImageSections: {
            display: 'flex',
            flexDirection: 'row',
            paddingHorizontal: 8,
            paddingVertical: 8,
            justifyContent: 'center'
          
    },
    images: {
            width: 150,
            height: 150,
            borderColor: 'black',
            borderWidth: 1,
            marginHorizontal: 3
          
    },
    btnParentSection: {
            alignItems: 'center',
            marginTop:10
          
    },
    btnSection: {
            width: 225,
            height: 50,
            backgroundColor: '#DCDCDC',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 3,
            marginBottom:10
          
    },
    btnText: {
            textAlign: 'center',
            color: 'gray',
            fontSize: 14,
            fontWeight:'bold'
          
    }
    
});
