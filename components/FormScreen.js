import React, { Component } from "react";
import {FlatList, StyleSheet, Text, View, ActivityIndicator} from "react-native";
import * as firebase from 'firebase';

export default class FormScreen extends Component {

    state = {
        name : "",
        email : "",
        displayName : "",
        admin: false,
        url :  "https://us-central1-firstfire-f0b06.cloudfunctions.net/API/GetStream/",
        loading : false,
        streams : null
    }

    getStream = () => {
        this.setState({loading :true})
        fetch(this.state.url, {
            method : 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body : JSON.stringify({
                Mail : this.state.email
            })
        }).then( res => { 
            console.debug(this.state.email)
            return res.json()
        }).then( les => {
            console.debug(les)
            this.setState({
                streams: les,
                loading: false
            })
        })
    }
    componentWillMount(){
        firebase.auth().onAuthStateChanged( user => {
            this.props.navigation.navigate(user ? "App" : "Auth")
        })
        const { email,displayName, name} = firebase.auth().currentUser;
        this.setState({email,displayName,name});
    }
    componentDidMount(){
        this.getStream()
    }

    render(){
        if(this.state.loading){
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large">
                    </ActivityIndicator>
                </View>
            )
        }else{
            return (
                <View style={styles.container}>
                    <Text>Hola, {this.state.email || this.state.email}!</Text>
                    <Text>Estos son los streams hacia donde estas emitiendo: </Text>
                    <FlatList 
                        data={this.state.streams} 
                        renderItem={
                            ({item}) => <Text> {item.edge} </Text> 
                        }/> 
                </View>
            )
        }
    }
}


const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : "center",
        alignItems: "center"
    }
})
