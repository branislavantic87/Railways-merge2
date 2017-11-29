import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import MenuList from './MenuList';

class Footer extends Component {

    state = {
        visible: false
    }

    render() {
        return (
            <View style={styles.footbar}>

                
                
               <TouchableOpacity onPress={this.props.onPress}>
                    <Image style={styles.ico} source={require('./ico/main_menu_2.png')} />
                </TouchableOpacity>


                {/*<TouchableOpacity onPress={() => this.setState({ visible: true })}>
                    <Image style={styles.ico} source={require('./ico/main_menu_2.png')} />
            </TouchableOpacity>*/}







            </View>
        );
    }
}

/*
<SlidingUpPanel
                    ref={c => this._panel = c}
                    visible={this.state.visible}
                    allowDragging={this.state.allow}
                    onRequestClose={() => this.setState({ visible: false })}>
                   
                </SlidingUpPanel>
*/

const styles = StyleSheet.create({
    footbar: {
        height: 50,
        width: '100%',
        backgroundColor: 'white',
        borderColor: 'white',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingLeft: 10,
        marginTop: 50
    },
    ico: {
        height: 24,
        width: 24,
        marginRight: 15,
    },
    main_panel: {
        height: '50%',
        marginTop: '22%',
        backgroundColor: 'white',
    },
    menuList: {
        position: 'absolute',
        height: '50%',
        marginTop: '22%',
        backgroundColor: 'white',
    }
});

export default Footer;