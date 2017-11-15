import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import axios from 'axios';

class Menu2 extends Component {

    renderMenus2() {
        return this.props.menu.children.map(child => 
            
                <Text style={styles.textStyle} key={child.menuId}> {child.title} </Text>
            
        );
    }
    render() {
        return (
            <View style={styles.menu1Container}>
                <Text>{this.props.menu.menuId}</Text>
                <Text>{this.props.menu.title}</Text>
                {this.renderMenus2()}
            </View>
        );
    }
}

const styles = {
    menu1Container: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderBottomWidth: 0
    },
    textStyle: {
        paddingLeft: 15
    }
}

export default Menu2;