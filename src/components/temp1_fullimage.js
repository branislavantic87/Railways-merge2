import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import { Constants } from 'expo';
import Lightbox from 'react-native-lightbox';

export default class FullImage extends Component {


  render() {

    return (
      <View style={mainView}>


        <View style={body}>

          <View style={contentContainer}>

            <View style={contentPic}>

              <Image style={{flex: 1, width: '100%'}} source={{uri: this.props.img}} />

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
  body: {
    height: '100%',
    paddingLeft: 10,
    paddingRight: 10,
  },
  contentContainer: {
    marginTop: 20,
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    height: '100%',
    marginBottom: 25,
  },
  swiperPic: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  contentPic: {
    flex: 3,
    height: '100%',
    backgroundColor: '#e5e5e5'
  },
});

const { mainView, body, contentContainer, contentPic } = styles;