import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import Menu2 from './Menu2';

class Menu1 extends Component {

    constructor(props) {
        super(props);
        this.state = { menu1: props.menu1, index: props.index, isSelected: false }
    }

    renderMenus2() {
        if (this.state.menu1.children) {
            return this.state.menu1.children.map(child =>
                <Menu2 key={child.menuId} menu2={child} />
            );
        }
    }

    checkIfSelected() {
        if(this.state.isSelected) {
            return this.renderMenus2();
        }
    }

    render() {
        return (
            <View>
                <TouchableOpacity onPress={() => { this.setState({isSelected: true}) }} style={styles.menu1Item}>
                    <Text>{this.state.menu1.title}</Text>
                </TouchableOpacity>
                <View>
                    {this.checkIfSelected()}
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
        height: 5,
        padding: 20
    }
}

export default Menu1;