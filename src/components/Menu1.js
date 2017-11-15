import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import Menu2 from './Menu2';

class Menu1 extends Component {

    renderMenus2() {
        if (this.props.menu1.children) {
            return this.props.menu1.children.map(child =>
                <Menu2 key={child.menuId} menu2={child} />
            );
        }
    }

    render() {
        return (
            <View>
                {this.renderMenus2()}
            </View>
        );
    }
}

export default Menu1;