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
                    <Text style={styles.menu1Text}>{this.props.menu1.title}</Text>
                </View>
                {this.renderMenus2()}
            </View>
        );
    }
}

const styles = {
    menu1View: {
        
    },
    menu1Text: {
        color: 'red'
    }
}

export default Menu2;