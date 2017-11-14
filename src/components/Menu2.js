import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import axios from 'axios';

class Menu2 extends Component {

    /*menu2Children() {
        if (this.props.menu.children) {

        }
    }*/
    render() {
        return (
            <View style={styles.menu1Container}>
                <Text>{this.props.menu.menuId}</Text>
                <Text>{this.props.menu.title}</Text>
            </View>
        );
    }
}

const styles = {
    menu1Container: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderBottomWidth: 0
    }
}

export default Menu2;