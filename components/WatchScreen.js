import React, {Component} from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import * as firebase from 'firebase';
import {NodePlayerView  } from 'react-native-nodemediaclient';

export default class WatchScreen extends Component {
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? 'App' : 'Auth');
        });
    }

    render() {
        return (
            <NodePlayerView
                style={{height: 200}}
                ref={vp => {
                    this.vp = vp;
                }}
                inputUrl={'rtmp://40.122.152.174/live/STREAM_NAME?sign=1903744798-dedca6058f361ce27fad457f658365fd'}
                scaleMode={'ScaleAspectFit'}
                bufferTime={300}
                maxBufferTime={1000}
                autoplay={true}
            />
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
