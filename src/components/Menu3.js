import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';

class Menu3 extends Component {

    renderMenus() {
        if (this.props.menu3.children) {
            return this.props.menu3.children.map(ch =>
                <View>
                    
                    <Text>{ch.title}</Text>
                </View>
            );
        }
    }

    render() {
        return (
            <View>
                {this.renderMenus()}
            </View>
        );
    }
}


const styles = {

}

export default Menu3;