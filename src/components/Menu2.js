import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import Menu3 from './Menu3';

class Menu2 extends Component {

    renderMenus2() {
        if (this.props.menu1.children) {
            return this.props.menu1.children.map(child =>
                <Menu3 key={child.menuId} menu2={child} />
            );
        }
    }

    render() {
        return (
            <View>
                <View>
                    <Text>{this.props.menu1.menuId}</Text>
                    <Text>{this.props.menu1.title}</Text>
                </View>
                <View>
                    {this.renderMenus2()}
                </View>
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