import React, { Component } from 'react';
import { ScrollView, View, Text, Button, TouchableOpacity } from 'react-native';
import Menu1 from './Menu1';
import Menu2 from './Menu2';

class MenuList extends Component {

    state = {   menus: this.props.data.menuTrees[1].menuTree, 
                selected: 0, 
                languange: 'English' 
            };

    componentDidUpdate() {
        this.refs._scrollView2.scrollTo({y:0, x:0, animated: true});
    }

    renderMenus1() {
        return this.state.menus.map((menu, i) => 
            <Menu1  onPress={() => this.state.selected == i ? this.setState({selected: -1}) : this.setState({selected: i})}
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
                <ScrollView horizontal={true} style={styles.menu1Container} showsHorizontalScrollIndicator={false}>
                    {this.renderMenus1()}
                </ScrollView>

                <ScrollView ref='_scrollView2' showsHorizontalScrollIndicator={false} horizontal={true} style={{flexDirection: 'row'}}>
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
