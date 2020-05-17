import React, {Component} from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import * as firebase from 'firebase';
import {NodePlayerView  } from 'react-native-nodemediaclient';
import { GiftedChat  } from 'react-native-gifted-chat';

export default class WatchScreen extends Component {
    state = {
        messages: [],
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? 'App' : 'Auth');
        });
    }
    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),

        }))

    }


    render() {
        return (
            <View style={styles.mainContainer} >
                <View style={styles.body}>

                    <View style={styles.navBar}>
                        <NodePlayerView
                            style={{ height: 200  }}
                            scaleMode={"ScaleAspectFit"}
                            ref={vp => {
                                this.vp = vp;
                            }}
                            inputUrl={'rtmp://40.122.152.174/live/STREAM_NAME?sign=1903744798-dedca6058f361ce27fad457f658365fd'}
                            bufferTime={300}
                            maxBufferTime={1000}
                            autoplay={true}
                        />
                    </View>

                    <GiftedChat
                        messages={this.state.messages}
                        onSend={messages => this.onSend(messages)}
                        user={{
                            _id: 1,

                        }}
                    />
                </View>


            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        
    },
    navBar: {
        flex : 3,

    },
    body: {
          flex: 3,
          display: 'flex',
        
    },
    container: {
        flex: 1,
    },
    texto : {
        textAlign: 'center', 
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 0,
        width: 200,
    }
});
