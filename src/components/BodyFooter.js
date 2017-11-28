import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, StatusBar, TouchableWithoutFeedback, TouchableOpacity, Alert, NetInfo } from 'react-native';
import axios from 'axios';
import expo, { FileSystem, Video } from 'expo';
import MenuList from './MenuList';
import md5 from 'md5';
import SlidingUpPanel from 'rn-sliding-up-panel';
import { Actions } from 'react-native-router-flux';
import Header from './Header';
import FullImage from './temp1_fullimage';
import ImageButtons from './temp2_imagebuttons';
import TextImage from './temp3_textimage';
import FullText from './temp4_fulltext';
import Swiper from 'react-native-swiper';

export default class BodyFooter extends Component {

  state = {
    fetchedData: {},
    data: {},
    isLoading: true,
    visible: false,
    allow: false,
    downloadedL: 0,
    downloaded: 0,
    hashing: 0,
    hashingL: 0,
  };

  openLanguage = () => {
    Alert.alert('Otvorili ste Language.')
  };
  openFavorites = () => {
    Alert.alert('Otvorili ste Favorites.')
  };
  openMenu = () => {
    Alert.alert('Otvorili ste Menu.')
  };
  openSearch = () => {
    Alert.alert('Otvorili ste Search.')
  };
  openFolder = () => {
    Alert.alert('Otvorili ste Folder.')
  };
  openSettings = () => {
    Actions.pop()
  };
  openPanel = () => {
    Alert.alert('Otvorili ste Panel (MAIN MENU).')
  };
  openVideos = () => {
    Alert.alert('Otvorili ste meni za izbor video snimaka.')
  };
  openHome = () => {
    this.setState({ visible: false }); this._panel.transitionTo(0);
    Actions.home()
  };


  
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
         console.log('govno');
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

    
        let title = 'Leading innovations';
        let subtitle = 'For highest performance and mobillity';
        let text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at egestas neque, vitae lacinia justo. Nullam sem ipsum, pulvinar in lobortis a, mollis interdum metus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur dapibus ante quis nisl imperdiet, ut auctor erat ultricies. In hac habitasse platea dictumst. Vivamus quis convallis est. In hac habitasse platea dictumst. Morbi fermentum interdum orci accumsan pharetra. Aenean ullamcorper sollicitudin augue. Maecenas lobortis, tortor aliquet placerat pellentesque, sapien metus aliquam lacus, in volutpat enim massa vel nunc. Praesent quam risus, placerat ut ligula vitae, ultricies ornare massa. Praesent a dictum leo. Phasellus pretium arcu nisl, malesuada ultrices sapien commodo sit amet. Mauris convallis efficitur elit sit amet consectetur. Aenean viverra ligula sed leo facilisis, nec dignissim ex consectetur. In hac habitasse platea dictumst. Mauris vehicula, urna vitae bibendum fringilla, turpis turpis auctor sem, porta egestas nisl justo ut libero. Integer aliquam molestie est vel venenatis. Phasellus felis turpis, placerat ut diam vitae, tincidunt malesuada neque. Ut id bibendum mauris. Maecenas quis luctus lorem. Sed volutpat sapien eu lectus semper, ultrices aliquam lectus elementum. Donec sed dui mollis, tincidunt tellus luctus, dapibus ligula. Nunc in mattis felis. Suspendisse commodo, ipsum at fermentum pellentesque, mi elit scelerisque enim, vitae mollis mauris orci eu tellus.Mauris vehicula, urna vitae bibendum fringilla, turpis turpis auctor sem, porta egestas nisl justo ut libero. Integer aliquam molestie est vel venenatis. Phasellus felis turpis, placerat ut diam vitae, tincidunt malesuada neque. Ut id bibendum mauris. Maecenas quis luctus lorem. Sed volutpat sapien eu lectus semper, ultrices aliquam lectus elementum. Donec sed dui mollis, tincidunt tellus luctus, dapibus ligula. Nunc in mattis felis. Suspendisse commodo, ipsum at fermentum pellentesque, mi elit scelerisque enim, vitae mollis mauris orci eu tellusMauris vehicula, urna vitae bibendum fringilla, turpis turpis auctor sem, porta egestas nisl justo ut libero. Integer aliquam molestie est vel venenatis. Phasellus felis turpis, placerat ut diam vitae, tincidunt malesuada neque. Ut id bibendum mauris. Maecenas quis luctus lorem. Sed volutpat sapien eu lectus semper, ultrices aliquam lectus elementum. Donec sed dui mollis, tincidunt tellus luctus, dapibus ligula. Nunc in mattis felis. Suspendisse commodo, ipsum at fermentum pellentesque, mi elit scelerisque enim, vitae mollis mauris orci eu tellusMauris vehicula, urna vitae bibendum fringilla, turpis turpis auctor sem, porta egestas nisl justo ut libero. Integer aliquam molestie est vel venenatis. Phasellus felis turpis, placerat ut diam vitae, tincidunt malesuada neque. Ut id bibendum mauris. Maecenas quis luctus lorem. Sed volutpat sapien eu lectus semper, ultrices aliquam lectus elementum. Donec sed dui mollis, tincidunt tellus luctus, dapibus ligula. Nunc in mattis felis. Suspendisse commodo, ipsum at fermentum pellentesque, mi elit scelerisque enim, vitae mollis mauris orci eu tellusMauris vehicula, urna vitae bibendum fringilla, turpis turpis auctor sem, porta egestas nisl justo ut libero. Integer aliquam molestie est vel venenatis. Phasellus felis turpis, placerat ut diam vitae, tincidunt malesuada neque. Ut id bibendum mauris. Maecenas quis luctus lorem. Sed volutpat sapien eu lectus semper, ultrices aliquam lectus elementum. Donec sed dui mollis, tincidunt tellus luctus, dapibus ligula. Nunc in mattis felis. Suspendisse commodo, ipsum at fermentum pellentesque, mi elit scelerisque enim, vitae mollis mauris orci eu tellus';
        let pics = [
            {
              source: 'http://lorempixel.com/output/people-q-c-800-500-9.jpg'
            },
            {
              source: 'http://lorempixel.com/output/people-q-c-800-500-2.jpg'
            },
            {
              source: 'http://lorempixel.com/output/people-q-c-800-500-3.jpg'
            },
          ];
        let img = require('./ico/32/sss.jpg');

      return (
        <View style={styles.container}>
          <Header />

          <View style={styles.content}>

            <Swiper showsButtons={false} width={'100%'}>
              {this.renderPics()}
            </Swiper>

          {/*<FullText title={title} subtitle={subtitle} text={text}/>*/}
          {/*<FullImage img={img}/>*/}
          {/*<TextImage title={title} subtitle={subtitle} text={text} pics={pics}/>*/}
          {/*<ImageButtons title={title} subtitle={subtitle} img={img}/>*/}







            <SlidingUpPanel
              ref={c => this._panel = c}
              visible={this.state.visible}
              allowDragging={this.state.allow}
              onRequestClose={() => this.setState({ visible: false })}>
              <View style={styles.main_panel}>
                <MenuList data={this.state.data} />
              </View>
            </SlidingUpPanel>

          </View>
          <View style={styles.footbar}>
            <TouchableOpacity onPress={() => { this.setState({ visible: true }); this._panel.transitionTo(0); }}  >
              <Image style={styles.ico} source={require('./ico/main_menu_2.png')} />
            </TouchableOpacity>

          </View>
        </View>
      );
    }
    
  }


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4169e1',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  navbar: {
    height: '7%',
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row'
  },
  content: {
    backgroundColor: 'white',
    width: '100%',
    flex: 1,
    position: 'relative',
  },
  footbar: {
    height: '7%',
    width: '100%',
    backgroundColor: 'white',
    borderColor: 'white',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 10
  },
  menuButton: {
    width: 200,
    alignItems: 'center',
    height: 50,
  },
  subMenuButton: {
    width: 200,
    alignItems: 'center',
    height: 50,
    backgroundColor: 'white',
  },
  main_panel: {
    height: '50%',
    marginTop: '22%',
    backgroundColor: 'white',
  },
  scroll: {
    flexDirection: 'row',
    backgroundColor: 'red',
    height: 50,
  },
  ico: {
    height: 24,
    width: 24,
    marginRight: 15,
  },
  headerIcons: {
    flex: 1,
    backgroundColor: "white",
    height: 40,
    width: '50%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 20
  },
  content2: {
    position: 'absolute',
    justifyContent: 'flex-start',
    marginLeft: '15%'

  },
  content3: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: '15%'
  },
  videotour: {
    backgroundColor: '#4169e1',
    width: 270,
    height: 39,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 90,
    paddingTop: 50
  },
  ico2: {
    width: 24,
    marginRight: 20,
    height: 24,
    marginTop: 10
  }


});
console.disableYellowBox = true;
