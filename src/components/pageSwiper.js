import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class PgSwiper extends Component {
    
    render() {

        let templateList = this.props.renderPages.map((object, i) => {
            
        })

        return (
            <View style={body}>

                <View>
                    <Text style={[headingText, headingMain]}>{this.title}</Text>
                    <Text style={headingText}>{this.subtitle}</Text>
                </View>

                <View style={contentContainer}>

                    <View style={contentPic}>
                        <Swiper showsButtons={false} width={'100%'}>
                            {this.renderPics()}
                        </Swiper>
                    </View>

                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainView: {
        position: 'relative',
        height: '100%'
    },
    navContainer: {
        marginTop: 19,
        padding: 10,
        backgroundColor: '#e5e5e5'
    },
    navText: {
        textAlign: 'center',
        fontSize: 15
    },
    body: {
        height: '100%',
        paddingLeft: 10,
        paddingRight: 10,
    },
    headingText: {
        color: '#1496ba',
        fontSize: 15,
        paddingBottom: 35,
        paddingLeft: 30
    },
    headingMain: {
        paddingTop: 40,
        paddingBottom: 4,
        fontSize: 25
    },
    contentContainer: {
        marginTop: 20,
        flexDirection: 'row',
        flex: 1,
        width: '100%',
        height: '100%',
        marginBottom: 25,
    },
    contentPic: {
        flex: 3,
        height: '85%',
        backgroundColor: '#e5e5e5'
    },
    swiperPic: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    navFooter: {
        padding: 8,
        backgroundColor: '#e5e5e5',
        position: 'absolute',
        bottom: 0,
        width: '100%'
    },
    navFooterNav: {
        textAlign: 'left',
        paddingLeft: 30,
        fontSize: 25
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    }
});

const { mainView, navContainer, navText, body, headingText, headingMain, contentContainer, contentText, contentPic, swiperPic, navFooter, navFooterNav } = styles;