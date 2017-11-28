import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import TestPage from './TestPage';
import { Actions } from 'react-native-router-flux';

class Menu3 extends Component {

    state = { filteredPages: [] }

    componentWillMount() {
        this.filterPages();
      }

    filterPages() {
        var a = this.props.pages.filter(elem => { return elem.menuId == this.props.menu3.menuId });
        this.setState({ filteredPages: a });
    }


    render() {
      let data= JSON.stringify(this.state.filteredPages)
        return (
            <View style={styles.menu3Item}>
                <TouchableOpacity onPress={() => Actions.bodyFooter({forwardData: data})}>
                    <Text numberOfLines={1} style={styles.menu3Text}>{this.props.menu3.title}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = {
    menu3Item: {
        padding: 10,
        width: 200,
    },
    menu3Text: {
        padding: 10,
        backgroundColor: 'transparent',
        borderWidth: 3,
        borderColor: '#E0E0E0'
    }
}

export default Menu3;
