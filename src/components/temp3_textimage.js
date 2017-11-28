import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import { Constants } from 'expo';
import Lightbox from 'react-native-lightbox';

export default class TextImage extends Component {
  renderPics() {
    return this.props.pics.map((pic,index) => 
      <View key={index}>
        <Lightbox>
          <Image style={styles.swiperPic} source={{ uri: this.props.pics[index].source }}
          />
        </Lightbox>
      </View>
    );
  }
  
  render() {

    return (

      <View style={mainView}>
       
        <View style={body}>

          <View>
            <Text style={[headingText, headingMain]}>{this.props.title}</Text>
            <Text style={headingText}>{this.props.subtitle}</Text>
          </View>

          <View style={contentContainer}>

            <View style={contentText}>
              <ScrollView>
                <Text style={{ fontSize: 15 }}>{this.props.text}</Text>
              </ScrollView>
            </View>

            <View style={contentPic}>
              
              <Swiper showsButtons={false} width={'100%'}>
                {this.renderPics()}
               
              </Swiper>

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
    paddingLeft: 40,
    paddingRight: 40,
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
  contentContainer: {
    marginTop: 20,
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    height: '100%',
    marginBottom: 25,
  },
  contentText: {
    flex: 2.5,
    backgroundColor: '#ebeced',
    height: '100%',
    padding: 20,
    paddingTop: 30
  },
  contentPic: {
    flex: 4.5,
    height: '100%',
    marginLeft: 30,
    backgroundColor: '#ebeced'
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