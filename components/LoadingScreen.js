import React, { Component } from "react";
import { StyleSheet, Text, View, ActivityIndicator} from "react-native";
import * as firebase from 'firebase';

export default class LoadingScreen extends Component {

    componentDidMount(){
        firebase.auth().onAuthStateChanged( user => {
            this.props.navigation.navigate(user ? "App" : "Auth")
        })
    }

    render(){
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large">
                </ActivityIndicator>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : "center",
        alignItems: "center"
    }
})
