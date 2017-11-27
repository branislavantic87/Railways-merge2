import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import Menu2 from './Menu2';

class Menu1 extends Component {

    render() {
        return (
            <View>
<<<<<<< HEAD
                <View style={styles.pdt}>
                    <TouchableOpacity onPress={this.props.onPress} style={[styles.menu1Item, { backgroundColor: this.props.isPressed ? '#2980b9' : '#E0E0E0' }]}>
                        <Text numberOfLines={1} style={{ paddingBottom: 6, fontSize: 16, color: this.props.isPressed ? 'white' : '#424242' }}>{this.props.menu1.title}</Text>
=======
                <View>
                    <TouchableOpacity onPress={this.props.onPress} style={[styles.menu1Item, { backgroundColor: this.props.isPressed ? 'green' : 'yellow' }]}>
                        <Text>{this.props.menu1.title}</Text>
>>>>>>> c653b03e11d1513f423fccb28b389e684f2cce28
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = {
    menu1Item: {
<<<<<<< HEAD
        marginLeft: 1,
        marginRight: 1,
        height: 40,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10

    },
    pdt: {
        paddingTop: 10
    }
=======
        marginLeft: 5,
        marginRight: 5,
        height: 20,
        padding: 50
    },
>>>>>>> c653b03e11d1513f423fccb28b389e684f2cce28
}

export default Menu1;