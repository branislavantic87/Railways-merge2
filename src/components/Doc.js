import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableWithoutFeedback, WebView } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class DocumentView extends Component {

    componentWillMount() {
        console.log('doc.js: ' + this.props.docuri);
    }
    render() {

        return (
            <View style={styles.mainView}>
                <View style={{ flex: 12 }}>
                    <WebView
                        bounces={false}
                        scrollEnabled={false}
                        source={{uri: this.props.docuri }}
                    />
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
        height: 50,
        width: 50,
        marginRight: 15,
    },
});

