import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

class Search extends Component {
    render() {
        return(
            <View style={styles.searchCont} >
                <Text>SEARCH SECTION</Text>
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