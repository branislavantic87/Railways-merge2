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
        console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
        console.log(typeof img);

        switch(templateId) {
          case '2':
          return <ImageButtons templateTitle={title} subtitle={subtitle} img={img} />
          break;

          case '3':
          return <TextImage templateTitle={title} subtitle={subtitle} img={img} text = {text} />
          break;      

          case '4':
          return <FullText subtitle={subtitle} templateTitle={title} text = {text} />
          break;      

          default:
          console.log('WTF?!');    
      }
  });
}
  render() {


    if (!this.state.isLoading) {

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

    else if (this.state.isLoading) {
      return (
        <View style={{ marginTop: 50 }}>
          <Text>Loading, please wait.</Text>
          <Text>Hashing {this.state.hashing} of {this.state.hashingL} files.</Text>
          <Text>Downloaded {this.state.downloaded} of {this.state.downloadedL} files.</Text>
        </View>
      );
    }

    else if (this.state.isLoading == 'offline') {
      return (
        <View style={{ marginTop: 50 }}>
          <Text>You are starting app for first time and you are offline. We need to show some content, and for this we need to download it.</Text>
          <Text>Please connect to internet first.</Text>
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
