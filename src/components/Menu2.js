import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import Menu3 from './Menu3';

class Menu2 extends Component {

    renderMenus2() {
        if (this.props.menu2.children) {
            return this.props.menu2.children.map(child =>
                <Menu3 key={child.menuId} menu2={child} />
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

const styles = {

}

export default Menu2;