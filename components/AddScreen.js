import React, {Component} from 'react';
import {
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
} from 'react-native';
import * as firebase from 'firebase';

export default class AddScreen extends Component {
    state = {
        name: '',
        email: '',
        displayName: '',
        admin: false,
        url:
            'https://us-central1-firstfire-f0b06.cloudfunctions.net/API/GetStream/',
        loading: false,
        streams: null,
    };

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
