import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import Temptest from './Temptest';

class Menu3 extends Component {

    state = { filteredPages: []}

    componentWillMount() {
        this.filterPages();
    }

    filterPages() {
        var a = this.props.pages.filter(elem => { return elem.menuId == this.props.menu3.menuId});
        this.setState({filteredPages: a});
    }

    render() {
        return (
            <View style={styles.menu3Item}>
                <TouchableOpacity onPress={() => console.log(this.state.filteredPages)}>
                    <Text numberOfLines={1} style={styles.menu3Text}>{this.props.menu3.title}</Text>
                    
                </TouchableOpacity>
            </View>
        );
    }
}


const styles = {
    menu3Item: {
        padding: 10,
        width: 200
    },
    menu3Text: {
        padding: 10,
        backgroundColor: 'pink'
    }
}

export default Menu3;