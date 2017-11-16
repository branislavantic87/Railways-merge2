import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import Menu2 from './Menu2';

class Menu1 extends Component {

    constructor(props) {
        super(props);
        this.state = { isActive: props.isPressed };
    }

    renderMenus2() {
        if (this.props.menu1.children) {
            return this.props.menu1.children.map(child =>
                <Menu2 key={child.menuId} menu2={child} />
            );
        }
    }

    checkIfSelectedAndPrint2() {
        if(this.props.isPressed) {
            return this.renderMenus2();
        }
    }

    isActive() {
        if(this.props.isPressed) {
            return styles.active;
        } else {
            return styles.menu1Item;
        }
    }

    render() {
        return (
            <View>
                <TouchableOpacity onPress={this.props.onPress} style={this.isActive()}>
                    <Text>{this.props.menu1.title}</Text>
                </TouchableOpacity>
                <View>
                    {this.checkIfSelectedAndPrint2()} 
                </View>
            </View>
        );
    }
}

const styles = {
    menu1Item: {
        marginLeft: 5,
        marginRight: 5,
        backgroundColor: 'yellow',
        height: 20,
        padding: 20
    },
    active: {
        backgroundColor: 'green',
        marginLeft: 5,
        marginRight: 5,
        height: 20,
        padding: 20
    }
}

export default Menu1;