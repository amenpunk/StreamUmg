import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity} from "react-native";
import * as firebase from 'firebase';

export default class HomeScreen extends Component {
    state = {
        email : "",
        displayName : ""
    }


    componentDidMount() {
        const { email,displayName} = firebase.auth().currentUser;
        this.setState({email,displayName});
    }

    signOutUser = () =>{
        firebase.auth().signOut();
    }

    render(){
        return (
            <View style={styles.container}>
                <Text>Hola, {this.state.email}!</Text>
                <TouchableOpacity style={styles.buton} onPress={this.signOutUser}>
                    <Text>Salir</Text>
                </TouchableOpacity>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : "center",
        alignItems: "center"
    },buton : { marginTop : 32,
        marginHorizontal :30,
        backgroundColor : "#E9446A",
        borderRadius : 4,
        height : 52,
        alignItems : "center",
        justifyContent : "center",
        marginTop : 30
    }
})
