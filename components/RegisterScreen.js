import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import * as firebase from 'firebase';

export default class RegisterScreen extends Component {
    state = {
        name: '',
        email: '',
        secret: '',
        password: '',
        errorMessage: null,
    };

    handleSigUp = () => {
        const pass = "12345678"
        const {email, password} = this.state;
        firebase
            .auth()
            .createUserWithEmailAndPassword(
                this.state.email,
                pass
            )
            .then(async nuevo => {
                let id = nuevo.user.uid;
                await fetch(
                    `https://us-central1-firstfire-f0b06.cloudfunctions.net/API/User/Add/`,
                    {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            Email: this.state.email,
                            Name: this.state.name,
                            UserID: id,
                        }),
                    },
                );
                nuevo.user.updateProfile({displayName: this.state.name});
            })
            .catch(err => this.setState({errorMessage: err.message}));
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.greeting}>Registrate</Text>

                <View style={styles.errorMessage}>
                    {this.state.errorMessage && (
                        <Text style={styles.errorMessage}>
                            {' '}
                            {this.state.errorMessage}
                        </Text>
                    )}
                </View>

                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>Nombre</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={name => this.setState({name})}
                            value={this.state.name}
                        />
                    </View>

                    <View style={{marginTop: 32}}>
                        <Text style={styles.inputTitle}>Correo</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={email => this.setState({email})}
                            value={this.state.email}
                        />
                    </View>

                    <View style={{marginTop: 30}}>
                        <Text style={styles.inputTitle}>Contraseña</Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry
                            autoCapitalize="none"
                            onChangeText={password => this.setState({password})}
                            value={this.state.password}
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.handleSigUp}>
                        <Text style={{color: '#FFF', fontWeight: '500'}}>
                            Registrarse
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    greeting: {
        marginTop: 32,
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'center',
    },
    errorMessage: {
        marginTop: 30,
        color: 'red',
        height: 72,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 30,
    },
    form: {
        marginBottom: 48,
        marginHorizontal: 30,
    },
    inputTitle: {
        color: '#8A8F9E',
        fontSize: 10,
        textTransform: 'uppercase',
    },
    input: {
        borderBottomColor: '#8A8F9E',
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: '#1e1e1e',
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: '#E9446A',
        borderRadius: 4,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
    },
    error: {
        textAlign: 'center',
        color: 'red',
        fontSize: 13,
        fontWeight: '600',
    },
});
