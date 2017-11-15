import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';

class Menu3 extends Component {

    renderMenus3(child) {
        if (child.children) {
            return child.children.map(ch =>
                <View style={styles.textStyle} key={ch.menuId}>
                    <Text>{ch.title}</Text>
                </View>
            );
        }
    }

}

export default Menu3;