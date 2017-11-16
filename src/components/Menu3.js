import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';

class Menu3 extends Component {

    render() {
        return (
            <View style={{paddingLeft: 20}}>
                <Text>{this.props.menu3.title}</Text>
            </View>
        );
    }
}


const styles = {

}

export default Menu3;