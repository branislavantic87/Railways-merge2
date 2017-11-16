import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';

class Menu3 extends Component {

    render() {
        return (
            <View style={styles.menu3Item}>
                <TouchableOpacity>
                    <Text style={styles.menu3Text}>{this.props.menu3.title}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


const styles = {
    menu3Item: {
        padding: 10,
        paddingLeft: 20,
    },
    menu3Text: {
        padding: 10,
        backgroundColor: 'pink'
    }
}

export default Menu3;