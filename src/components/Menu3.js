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
                {this.renderMenus3()}
            </View>
        );
    }
}


const styles = {

}

export default Menu3;