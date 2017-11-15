import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import axios from 'axios';

class Menu2 extends Component {

    renderMenus2() {
        return this.props.menu.children.map(child =>
            <View style={styles.textStyle} key={child.menuId}>
                <Text>{child.title}</Text>
                {this.renderMenus3(child)}
            </View>
        );
    }

    renderMenus3(child) {
        if (child.children) {
            return child.children.map(ch =>
                <View style={styles.textStyle} key={ch.menuId}>
                    <Text>{ch.title}</Text>
                </View>
            );
        }
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
        paddingLeft: 30
    }
}

export default Menu2;