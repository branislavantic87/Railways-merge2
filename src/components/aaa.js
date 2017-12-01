import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, StatusBar, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import MenuList from './MenuList';
import { Actions } from 'react-native-router-flux';
import expo, { FileSystem } from 'expo';


class aaa extends Component {

    componentWillMount() {
        FileSystem.getInfoAsync(FileSystem.documentDirectory + '1528.jpg', {md5: true, size: true})
        .then(res => { console.log('md5 je: ' + res.md5); console.log('size je: ' + res.size); })


    }



    render() {
        return(
            <View>
                <Image resizeMethod='scale'  source={{uri: FileSystem.documentDirectory + '1528.jpg'}} style={{width: 400, height: 400, backgroundColor: 'green'}} />
            </View>
        );
    }

}

export default aaa;