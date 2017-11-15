import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import Menu3 from './Menu3';

class Menu2 extends Component {

    renderMenus2() {
        if (this.props.menu.children) {
            return this.props.menu.children.map(child =>
                <Menu3 key={child.menuId} menu={child} />
            );
        }
    }

    render() {
        return (
            <View style={[styles.menu1Container, styles.textStyle]}>
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