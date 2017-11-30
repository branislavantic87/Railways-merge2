import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import Menu2 from './Menu2';

class Menu1 extends Component {

    render() {
        return (
            <View>
                <View>
                    <TouchableOpacity onPress={this.props.onPress} style={[styles.menu1Item, { backgroundColor: this.props.isPressed ? 'green' : 'yellow' }]}>
                        <Text>{this.props.menu1.title}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = {
    menu1Item: {
        marginLeft: 5,
        marginRight: 5,
        height: 20,
        padding: 50
    },
}

export default Menu1;