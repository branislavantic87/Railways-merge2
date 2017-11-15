import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import axios from 'axios';
import Menu2 from './Menu2';

class MenuList extends Component {
    state = { menus: [], child: [] };

    componentWillMount() {
        axios.get('http://192.168.0.15:8000/railways')
        .then(response => this.setState({ menus: response.data.menuTrees[1].menuTree }));
    }

    renderMenus1() {
        return this.state.menus.map(menu => 
            <Menu2 key={menu.menuId} menu={menu} />
        );
    }

    render() {
        return (
            <ScrollView>
                {this.renderMenus1()}
            </ScrollView>
        );
    }
}

export default MenuList;
