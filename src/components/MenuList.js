import React, { Component } from 'react';
import { ScrollView, View, Text, Button, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Menu1 from './Menu1';
import Menu2 from './Menu2';

class MenuList extends Component {
    state = { menus: [], selected: 0, languange: 'English' };

    componentWillMount() {
        axios.get('http://192.168.0.15:8000/railways')
        .then(response => this.setState({ menus: response.data.menuTrees[1].menuTree }));
    }

    renderMenus1() {
        return this.state.menus.map((menu, i) => 
            <Menu1  onPress={() => {
                if(this.state.selected == i) {
                this.setState({ selected: -1});
                } else {
                this.setState({ selected: i});
                }
            }}
                    isPressed={this.state.selected == i ? true : false} 
                    key={menu.menuId} 
                    menu1={menu} 
            />
        );
    }

    renderMenus2() {
        if(this.state.menus[this.state.selected]) {
            if (this.state.menus[this.state.selected].children) {
                return this.state.menus[this.state.selected].children.map(child =>
                    <Menu2 key={child.menuId} menu2={child} />
                );
            }
        }
    }

    render() {
        return (
            <View style={styles.mainCont}>
                <ScrollView horizontal={true} style={styles.menu1Container}>
                    {this.renderMenus1()}
                </ScrollView>

                <ScrollView horizontal={true} style={{flexDirection: 'row'}}>
                    {this.renderMenus2()}
                </ScrollView>
            </View>
        );
    }
}

const styles = {
    menu1Container: {
        flexDirection: 'row',
        marginTop: 50
        
    },
    mainCont: {
        
        
    }
}

export default MenuList;
