import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';

class Menu3 extends Component {

    renderMenus3() {
        if (this.props.menu.children) {
            return this.props.menu.children.map(ch =>
                <View key={ch.menuId}>
                    <Text>{ch.title}</Text>
                </View>
            );
        }
    }

    render() {
        return (
            <View style={styles.textStyle}>
                <Text>{this.props.menu.menuId}</Text>
                <Text>{this.props.menu.title}</Text>
                {this.renderMenus3()}
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