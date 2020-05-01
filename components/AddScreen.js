import React, {Component} from 'react';
import {
    TouchableOpacity,
    TextInput,
    FlatList,
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
} from 'react-native';
import * as firebase from 'firebase';

export default class AddScreen extends Component {

    state = {
        name  : "",
        email  : "",
        password : "",
        errorMessage : "",
        URL : "",
        url:
            'https://us-central1-firstfire-f0b06.cloudfunctions.net/API',
        loading: false,
        streams: null,
    };
    
    componentDidMount() {
        const { email,displayName, name} = firebase.auth().currentUser;
        this.setState({email,displayName,name});
    }

    AddStream = () => {
        const URL = this.state.URL; 
        console.debug(URL)
        fetch(`${this.state.url}/AddStream`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Mail: this.state.email,
                apikey: this.state.email,
                URL : this.state.URL
            })
        })
            .then(res => {
                return res.json();
            })
            .then(les => {
                console.debug(les);
                return this.props.navigation.navigate("Mess")
            });
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.greeting}>Agrega un nuevo Stream</Text>

                <View style={styles.form}>
                    <View style={{marginTop: 30}}>
                        <Text style={styles.inputTitle}>RTMP URL</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={ URL => this.setState({URL})}
                            value={this.state.URL}
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.AddStream}>
                        <Text style={{color: '#FFF', fontWeight: '500'}}>
                            Agregar
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container : {
        flex : 1,
    },
    greeting : {
        marginTop : 32,
        fontSize : 18,
        fontWeight : "400",
        textAlign : "center"

    },
    errorMessage : {
        marginTop : 30,
        color : "red",
        height: 72,
        alignItems: "center",
        justifyContent : "center",
        marginHorizontal : 30
    },
    form:{
        marginBottom : 48,
        marginHorizontal : 30,
    },
    inputTitle : {
        color : "#8A8F9E",
        fontSize : 10,
        textTransform : "uppercase"
    },
    input : {
        borderBottomColor : "#8A8F9E",
        borderBottomWidth : StyleSheet.hairlineWidth,
        height : 40,
        fontSize : 15,
        color : "#1e1e1e"
    },
    button : {
        marginHorizontal :30,
        backgroundColor : "#E9446A",
        borderRadius : 4,
        height : 52,
        alignItems : "center",
        justifyContent : "center",
        marginTop : 30
    },
    error : {
        textAlign : "center",
        color : "red",
        fontSize : 13,
        fontWeight : "600"
    }
})
