import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import Header from './Header';
import Footer from './Footer';

class HBF extends Component {

    state = {
        visible: false,
        data: this.props.data
    }

    componentWillMount() {

    }

    render() {
        return (
            <View>
                <Header />


                {this.state.visible &&
                    <MenuList data={this.state.contentJson} />
                }
                <Footer data={this.state.contentJson} onPress={() => { this.state.visible ? this.setState({ visible: false }) : this.setState({ visible: true }); console.log(this.state.visible) }} />
            </View>
        );
    }

}

export default HBF;

/*
<Body />
<Footer />
*/