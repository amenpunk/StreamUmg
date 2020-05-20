import React, {Component} from 'react';
import {Dimensions,StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import * as firebase from 'firebase';
import {NodePlayerView} from 'react-native-nodemediaclient';
import {GiftedChat} from 'react-native-gifted-chat';
import io from 'socket.io-client';
var { height  } = Dimensions.get('window');
var box_count = 3;
var box_height = height / box_count;

export default class WatchScreen extends Component {
    state = {
        messages: [],
    };
    componentDidMount() {
        this.socket = io('http://40.69.159.146:3000');
        this.socket.on('put', obj => {
            this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, obj),
            }));
        });
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? 'App' : 'Auth');
        });
    }
    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }));
    }

    addMessage = messages => {
        this.socket.emit('add', messages );
    };
    render() {
        return (
            <View style={styles.container}>
                    <View style={styles.media}>
                        <NodePlayerView
                            style={{height: 200}}
                            scaleMode={'ScaleAspectFit'}
                            ref={vp => {
                                this.vp = vp;
                            }}
                            inputUrl={
                                'rtmp://40.122.152.174/live/STREAM_NAME?sign=1903744798-dedca6058f361ce27fad457f658365fd'
                            }
                            bufferTime={300}
                            maxBufferTime={1000}
                            autoplay={true}
                        />
                    </View>

                <View style={styles.chat}>
                    <GiftedChat
                        messages={this.state.messages}
                        onSend={messages => this.addMessage(messages)}
                        user={{
                            _id: 2,
                            name: 'React Native',
                            avatar: 'https://placeimg.com/140/140/any',
                        }}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    media :{
        flex :1
    },
    chat : {
        flex :1
    },
    texto: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 0,
        width: 200,
    },
});
