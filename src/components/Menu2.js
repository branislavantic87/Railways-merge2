import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import Menu3 from './Menu3';

class Menu2 extends Component {

    renderMenus2() {
        if (this.props.menu2.children) {
            return this.props.menu2.children.map(child =>
                <Menu3 key={child.menuId} menu3={child} />
            );
        }
    }

    render() {
        return (
            <View>
                <TouchableOpacity>
                    <Text>{this.props.menu2.title}</Text>
                </TouchableOpacity>
                <View>
                    {/*this.renderMenus2()*/}
                </View>

            </View>
        );
    }
}

const styles = {

}

export default Menu2;