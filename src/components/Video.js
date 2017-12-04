import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableWithoutFeedback } from 'react-native';
import { Video } from 'expo';
import { Actions } from 'react-native-router-flux';

export default class VideoView extends Component {

    render() {

        return (
            <View style={styles.mainView}>
                <View style={{ flex: 12 }}>
                    <Video source={{ uri: this.props.videouri }}
                        rate={1.0}
                        volume={1.0}
                        muted={false}
                        resizeMode="cover"
                        shouldPlay
                        isLooping
                        style={{ width: '100%', height: '100%' }} />
                </View>
                <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                    <TouchableWithoutFeedback onPress={() => Actions.pop()}><Image style={styles.ico} source={require('./ico/back.png')} /></TouchableWithoutFeedback>
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    ico: {
        height: 45,
        width: 45,
        padding: 10,
        marginLeft: 10
    },
});

