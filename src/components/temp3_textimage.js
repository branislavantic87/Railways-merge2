import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import { Constants } from 'expo';
import Lightbox from 'react-native-lightbox';

export default class TextImage extends Component {


  renderPics() {
    return this.props.img.map((pic, index) =>

      <View key={index} style={{ width: 150, height: 20, backgroundColor: 'blue', flex: 1 }}>
        {/*<Image key={index} style={{width: '100%', height: '100%', backgroundColor: 'green'}} source={{ uri: pic }} />*/}
        <Text>AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</Text>
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

              <Swiper showsButtons={false} width={180} height={50} style={{ backgroundColor: 'green' }}>
                {/*this.renderPics()*/}
                <View style={{ width: 50, height: 50, backgroundColor: 'yellow' }} />
                <View style={{ width: 50, height: 50, backgroundColor: 'orange' }} />
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
    flex: 1,
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
  },
  contentText: {
    flex: 1,
    backgroundColor: '#ebeced',
    height: '100%',
    padding: 20,
    paddingTop: 30
  },
  contentPic: {
    //position: 'relative',
    width: 200,
    height: 200,
    marginLeft: 30,
    backgroundColor: 'red'
  },
  swiperPic: {
    width: 100,
    height: 100,



  },
});

const { mainView, body, headingText, headingMain, contentContainer, contentText, contentPic, swiperPic } = styles;