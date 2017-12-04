import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

class Languages extends Component {
    openLanguage = () => {
        return global.projectJson.languages.map((object, index) =>
        <View key={index}>
            <Text style={{ fontSize: 25, color: 'white' }}>{object.language}</Text>
            <View style={{borderBottomWidth: 3, borderColor: 'white', }}/>
            </View>
        );
    };

    render() {
        return (
            <View style={styles.langCont} >
                {this.openLanguage()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    langCont: {
        position: 'absolute',
        backgroundColor: '#4169e1',
        top: 50,
        height: 70,
        width: '100%',
        zIndex: 3,
        alignItems: 'center'
    },
    textInput: {
        width: 300,
        height: 50
    }
});

export default Languages;