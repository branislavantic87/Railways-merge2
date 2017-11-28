import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    TouchableOpacity,
    TouchableHighlight,
} from 'react-native';


import { Actions } from 'react-native-router-flux';

export default class ImageButtons extends Component {



    render() {
        return (
           
            <View style={styles.container}>
                <View>
                    <Text style={[headingText, headingMain]}>{this.props.titles}</Text>
                    <Text style={headingText}>{this.props.subtitle}</Text>
                </View>
                <View style={styles.imgContainer}>
                    <Image
                        style={styles.contentImage}
                        source={{ uri: this.props.img}}
                    />
                    <View style={styles.ButtonContainer}>
                        <TouchableOpacity style={styles.ButtonContent}  >
                            <Image
                                style={styles.ButtonIconStyle}
                                source={require('./ico/menu1.png')}
                            />
                            <Text style={styles.ButtonTextStyle}>CONTENT</Text>
                        </TouchableOpacity >
                        <TouchableOpacity style={styles.ButtonContent}  >
                            <Image
                                style={styles.ButtonIconStyle2}
                                source={require('./ico/play-button.png')}
                            />
                            <Text style={styles.ButtonTextStyle}>VIDEO</Text>
                        </TouchableOpacity >
                        <TouchableOpacity style={styles.ButtonContent}>
                            <Image
                                style={styles.ButtonIconStyle}
                                source={require('./ico/file.png')}

                            />

                            <Text style={styles.ButtonTextStyle}>DOCUMENT</Text>
                        </TouchableOpacity >
                    </View>
                </View>


            </View>

          

        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'white',
        height: 25,

    },
    container: {
       
        height: '100%'
    },

    ButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        
        bottom: 0,
        right: 50,
        marginBottom: 50,
        width: '51%',
        justifyContent: 'space-between'


    },
  
    ButtonIconStyle: {
        marginRight: 10,

    },
    menuContainer: {
        alignItems: 'flex-start',
        justifyContent: 'flex-end',

    },
    menuImage: {
        width: 50,
        height: 50,
    },
    contentImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    imgContainer: {
        flex: 1,
      
        justifyContent: 'center',
       
      
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
    ButtonTextStyle: {
        fontSize: 20,
        color: '#fff'

    },
    ButtonIconStyle2: {
        marginRight: 10,
        width: 32,
        height: 32
    },
    headingText: {
        color: '#1496ba',
        fontSize: 15,
        paddingBottom: 35
      },
      headingMain: {
        paddingTop: 40,
        paddingBottom: 4,
        fontSize: 25
      }, 
});

const { mainView, navContainer, navText, body, headingText, headingMain, contentContainer, contentText, contentPic, swiperPic, navFooter, navFooterNav } = styles;