import React, { Component } from 'react';
import { ScrollView, View, Text, Button, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Menu1 from './Menu1';

class MenuList extends Component {
    state = { menus: [], selected: 0 };

    componentWillMount() {
        axios.get('http://192.168.0.15:8000/railways')
        .then(response => this.setState({ menus: response.data.menuTrees[1].menuTree }));
    }

    setSelected(i) {
        this.setState({ selected: i});
        console.log(this.state.selected);
    }

    checkIsPressed(i) {
        if(this.state.selected == i) {
            return true;
        } else {
            return false;
        }
    }
/* onPress={this.setSelected(i)} */
/*

onPress={() => this.setSelected(i)}

isPressed={this.checkIsPressed(i)}

<TouchableOpacity onPress={() => {this.setState({selected: i})}}>
 </TouchableOpacity>
*/
    renderMenus1() {
        return this.state.menus.map((menu, i) => 
            <TouchableOpacity onPress={() => this.setState({selected: i})}>
                <Menu1 isPressed={this.checkIsPressed(i)} key={menu.menuId} menu1={menu} />
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={styles.mainCont}>
                <ScrollView horizontal={true} style={styles.menu1Container}>
                    {this.renderMenus1()}
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
        flex: 1,
        
    }
}

export default MenuList;
