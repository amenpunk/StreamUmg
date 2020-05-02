import React, {Component, useState} from 'react';
import {
    TouchableHighlight,
    Image,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
} from 'react-native';
import * as firebase from 'firebase';

export default class FormScreen extends Component {
    state = {
        name: '',
        email: '',
        admin: false,
        url: 'https://us-central1-firstfire-f0b06.cloudfunctions.net/API',
        loading: false,
        streams: null,
    };

    deleteStream = URL => {
        fetch(`${this.state.url}/DeleteStream/`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Mail: this.state.email,
                apikey: this.state.email,
                URL: URL,
            }),
        })
            .then(res => {
                return res.json();
            })
            .then( async ( les ) => {
                console.debug(les);
                await fetch("http://40.122.152.174:3000/Restart")
                this.props.navigation.navigate("Mess")
            });
    };

    getStream = () => {
        this.setState({loading: true});
        fetch(`${this.state.url}/GetStream`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Mail: this.state.email,
                apikey: this.state.email,
            }),
        })
            .then(res => {
                console.debug(this.state.email);
                return res.json();
            })
            .then(les => {
                console.debug(les);
                this.setState({
                    streams: les,
                    loading: false,
                });
            });
    };
    componentWillMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? 'App' : 'Auth');
        });
        const {email, displayName, name} = firebase.auth().currentUser;
        this.setState({email, displayName, name});
    }
    componentDidMount() {
        this.getStream();
    }

    render() {
        if (this.state.loading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large" />
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <Text style={styles.usuario}>
                        Hola, {this.state.email || this.state.email}!
                    </Text>
                    <Text>
                        Estos son los streams hacia donde estas emitiendo
                    </Text>
                    <Text style={styles.alerta}>
                        Presiona sobre uno para eliminarlo
                    </Text>
                    <FlatList
                        data={this.state.streams}
                        renderItem={({item}) => {
                            return (
                                <TouchableHighlight
                                    key={item.key}
                                    onPress={() =>
                                        this.deleteStream(item.edge)
                                    }>
                                    <View style={styles.link}>
                                        <Text>{item.edge}</Text>
                                    </View>
                                </TouchableHighlight>
                            );
                        }}
                    />
                    <TouchableOpacity
                        style={styles.buton}
                        onPress={() => this.props.navigation.navigate('Add')}>
                        <Text>Agregar Nuevo</Text>
                    </TouchableOpacity>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    link: {
        color: '#1e1e1e',
        padding: 20,
        margin: 20,
        backgroundColor: '#72edd9',
        fontSize: 15,
    },
    usuario: {
        paddingTop: 50,
        flex: 1,
        fontSize: 20,
    },
    buton: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#ff1100',
        borderColor: '#ff1100',
        borderWidth: 3,
        borderRadius: 2,
        height: 50,
        paddingVertical: 10,
        paddingHorizontal: 30,
        elevation: 4,
        marginVertical: 10,
        backgroundColor: '#f03551',
    },
    none: {
        padding: 0,
        margin: 0,
    },
    alerta: {
        color: '#f54242',
        fontSize: 25,
    },
});
