import React, { Component } from "react";
import { Image, StyleSheet, Text, View, ActivityIndicator} from "react-native";
import * as firebase from 'firebase';

export default class MessageScreen extends Component {

    componentDidMount(){
        firebase.auth().onAuthStateChanged( user => {
            this.id = setTimeout(() =>  this.props.navigation.navigate("Home"), 2000)
        })
    }

    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.exito}>
                    Operacion compleatada exitosamente!!
                </Text>
                <Image style={styles.image} 
                    source={{uri:'https://icons-for-free.com/iconfiles/png/512/complete+done+green+success+valid+icon-1320183462969251652.png' }} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : "center",
        alignItems: "center"
    },
    image: {
        height: 230,
        width: 230
    },
    exito : {
        textAlign: 'center', 
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 0,
        width: 200,
    }
})
