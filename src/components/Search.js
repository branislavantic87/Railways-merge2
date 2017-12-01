import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Image, Modal, TouchableHighlight, TextInput } from 'react-native';
import expo, { FileSystem, Video } from 'expo';

class Search extends Component {
    render() {
        return(
            <View style={styles.searchCont} >
                <Text>OVO JE SEARCH</Text>
                <TextInput style={styles.textInput} />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    searchCont: {
        position: 'absolute',
        backgroundColor: 'white',
        top: 30,
        height: 200,
        width: '100%',
        zIndex: 3
    },
    textInput: {
        width: 300,
        height: 50
    }
});

export default Search;