import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';

class Menu3 extends Component {

    renderMenus3() {
        if (this.props.menu2.children) {
            return this.props.menu2.children.map(ch =>
                <View key={ch.menuId}>
                    <Text>{ch.title}</Text>
                </View>
            );
        }
    }

    render() {
        return (
            <View>
                <View>
                    <Text>{this.props.menu2.menuId}</Text>
                    <Text>{this.props.menu2.title}</Text>
                </View>

                <View>
                    {this.renderMenus3()}
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

export default Menu3;