import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Dimensions, TouchableOpacity, Video, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';


export default class VB extends Component {
    blank() {
        return (
            <Video style={{width: 3.0, heigth: 2.0}} source = {{uri: this.props.videouri}}/>
        );
    }

    render() {

        return (
            <View style={{marginRight: 15}}>
            
                <TouchableOpacity style={styles.ButtonContent} onPress = {Alert.alert('Otvorili ste Folder.')} >
                    <Image
                        style={styles.ButtonIconStyle2}
                        source={require('./ico/play-button.png')}
                    />
                    <Text style={styles.ButtonTextStyle}>VIDEO</Text>
                </TouchableOpacity >

            </View>
        );
    }
}

const styles = StyleSheet.create({

    ButtonTextStyle: {
        fontSize: 20,
        color: '#fff'

    },
    ButtonIconStyle2: {
        marginRight: 10,
        width: 32,
        height: 32
    },
    ButtonContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        right: 50,
        marginBottom: 50,
        width: '51%',

    },
    ButtonContent: {
        borderColor: '#fff',
        borderWidth: 3,
        borderRadius: 4,
        paddingHorizontal: 40,
        backgroundColor: '#0082B3',
        padding: 18,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});