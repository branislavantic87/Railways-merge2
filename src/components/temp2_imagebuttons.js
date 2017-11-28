import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import { Constants } from 'expo';
import Lightbox from 'react-native-lightbox';

export default class ImageButtons extends Component {


    render() {
        return (
            <View style={mainView}>

                <View style={body}>

                    <View>
                        <Text style={[headingText, headingMain]}>{this.props.templateTitle}</Text>
                        <Text style={headingText}>{this.props.subtitle}</Text>
                    </View>

                    <View style={contentContainer}>

                        <View style={contentPic}>
                            <Image style={{flex: 1, width: '100%'}} source={{uri: this.props.img}} />
                            <View style={ButtonContainer}>
                                <TouchableOpacity style={ButtonContent}  >
                                    <Image
                                        style={ButtonIconStyle}
                                        source={require('./ico/menu1.png')}
                                    />
                                    <Text style={ButtonTextStyle}>CONTENT</Text>
                                </TouchableOpacity >
                                <TouchableOpacity style={ButtonContent}  >
                                    <Image
                                        style={ButtonIconStyle2}
                                        source={require('./ico/play-button.png')}
                                    />
                                    <Text style={ButtonTextStyle}>VIDEO</Text>
                                </TouchableOpacity >
                                <TouchableOpacity style={ButtonContent}>
                                    <Image
                                        style={ButtonIconStyle}
                                        source={require('./ico/file.png')}
                                    />
                                    <Text style={ButtonTextStyle}>DOCUMENT</Text>
                                </TouchableOpacity >
                            </View>
                        </View>

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

    ButtonIconStyle: {
        marginRight: 10,

    },
    ButtonTextStyle: {
        fontSize: 20,
        color: '#fff'

    },
    ButtonIconStyle2: {
        marginRight: 10,
        width: 32,
        height: 32
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
        position: 'relative',
    },
    contentPic: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#e5e5e5',
        position: 'relative',
        alignItems: 'center'
    },
    ButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        right: 50,
        marginBottom: 50,
        width: '51%',
        justifyContent: 'space-between'
    },
    ButtonContent: {
        borderColor: '#fff',
        borderWidth: 3,
        borderRadius: 4,
        paddingHorizontal: 40,
        backgroundColor: '#0082B3',
        padding: 18,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
});

const { mainView, navContainer, navText, body, headingText, headingMain, contentContainer, contentText, contentPic, swiperPic, navFooter, navFooterNav, ButtonContent, ButtonIconStyle, ButtonIconStyle2, ButtonTextStyle, ButtonContainer } = styles;