import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import { Constants } from 'expo';
import ImageZoom from 'react-native-image-pan-zoom';
import LightBox from 'react-native-lightbox';
import HTML from 'react-native-render-html';

export default class TextImage extends Component {
  renderPics() {
    console.log('ajsad');
    console.log(this.props.imgs)

    return this.props.imgs.map((pic, index) =>
      <View key={index}>
        <LightBox style={{height:'100%'}}>
          <Image  style={styles.swiperPic} source={{ uri: pic }}
          />
        </LightBox>
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
              <HTML html={this.props.text} />
              </ScrollView>
            </View>

            <View style={contentPic}>
              <ScrollView style={{height: "100%"}} horizontal={true} howsHorizontalScrollIndicator={true} pagingEnabled>
                {this.renderPics()}
              </ScrollView>
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
    alignItems: 'center'
  },
  contentText: {
    flex: 2.5,
    backgroundColor: '#ebeced',
    padding: 20,
    paddingTop: 30
  },
  contentPic: {
    flex: 4.5,
    width: '100%',
    height: '100%',
     marginLeft: 30,
 
  },
  swiperPic: {
    alignSelf: 'center',
    width: 700,
    height: 600,

  },
});

const { mainView, body, headingText, headingMain, contentContainer, contentText, contentPic, swiperPic } = styles;