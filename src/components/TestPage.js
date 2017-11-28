import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, StatusBar, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import MenuList from './MenuList';
import { Actions } from 'react-native-router-flux';
import Swiper from 'react-native-swiper';
import Lightbox from 'react-native-lightbox';
import expo, { FileSystem } from 'expo';
import FullImage from './temp1_fullimage';



  export default class TestPage extends Component {



  renderPics() {
    // let a = JSON.parse(this.props.forwardData);
    // console.log(a);

    // return a.map((slide,index) => {
    //   if(slide.files) {
    //     return slide.files.map(file => {
    //       return (
    //         <View>
    //           <Image style={{width: 400, height: 400}} source={{uri: FileSystem.documentDirectory + 'files/' + file.fileId + '.' + file.ext}} />
    //         </View>
    //       );
    //     });
    //   }
    // }
    // );

    let data = JSON.parse(this.props.forwardData);
    console.log(data);

    let img, title, subtitle, text;

    return data.map((slide,index) => {
      let templateId = slide.templateId;

      if (slide.files) {
        slide.files.map(file => {
          img = FileSystem.documentDirectory + 'files/' + file.fileId + '.' + file.ext;

        });
      }

      title = slide.title;
      subtitle = slide.subtitle;
      text = slide.text;

      switch(templateId) {
        case '1':
        return <Text>1</Text>
        break;

        case '2':
          console.log('bla');
        break;

        case '3':
        return <Text>3</Text>
        break;

        case '4':
        return <Text>4</Text>
        break;

        default:
        console.log('WTF SHKK?!');

      }

      console.log(img);
      console.log(title);
      console.log(subtitle);
      console.log(text);
    });

  }

render() {


        return (
        <View style={styles.container}>
          <Swiper showsButtons={false} width={'100%'}>
            {this.renderPics()}
          </Swiper>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  swiperPic: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
}
)
