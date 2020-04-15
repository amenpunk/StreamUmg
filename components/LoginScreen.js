import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from "react-native";
import * as firebase from 'firebase';

export default class LoginScreen extends Component {

    state = {
        email  : "",
        password : "",
        errorMessage : null
    }

    handleLogin = () =>{
        const {email, password} = this.state;
        firebase.auth().signInWithEmailAndPassword(email,password)
            .then( user => console.log(user))
            .catch(err => this.setState({errorMessage : err.message}))
    }

    render(){
        return (
            <View style={styles.container}>

                {/* <Text style={styles.greeting}>Hola!!!</Text> */}

                <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.errorMessage}> {this.state.errorMessage}</Text>}
                </View>

                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>Correo</Text>
                        <TextInput 
                            style={styles.input} 
                            autoCapitalize="none"
                            onChangeText = {email => this.setState({email})}
                            value={this.state.email}
                        ></TextInput>
                    </View>

                    <View style={{marginTop : 30}}>
                        <Text style={styles.inputTitle}>Contraseña</Text>
                        <TextInput 
                            style={styles.input} 
                            secureTextEntry
                            autoCapitalize="none"
                            onChangeText = {password => this.setState({password})}
                            value={this.state.password}
                        ></TextInput>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
                        <Text style={{ color : "#FFF", fontWeight : "500"}}>Ingresar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{  alignSelf : "center", marginTop : 32 }}
                        onPress={ () => this.props.navigation.navigate("Register")} >
                        <Text>
                            Eres nuevo? <Text style={{color : "blue"}}>Registrate</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
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

