import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, StatusBar, TouchableWithoutFeedback, TouchableOpacity, Alert, NetInfo, TouchableHighlight } from 'react-native';
import axios from 'axios';
import expo, { FileSystem, Video } from 'expo';
import MenuList from './src/components/MenuList';
import md5 from 'md5';
import SlidingUpPanel from 'rn-sliding-up-panel';
import { Actions } from 'react-native-router-flux';
import Footer from './src/components/Footer';


export default class Home extends Component {

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
    return global.projectJson.project.map((object, index)=>
    <Text>object.language</Text>); 
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
    console.log('otvorili ste folder')
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
    Actions.home({isLoading: false}) 
  };


textView(text) {
  return <Text>{text}</Text>
  console.log('aaaaaaaaaa' + text);
}

imprint = () => {
  let imprintTexts = global.projectJson.project.imprintText;
  this.textView(imprintTexts);
  console.log('ispisan imprint texts');
}
terms() {
    let termsText = global.projectJson.project.termsText;
  this.textView(termsText);
  console.log('ispisan terms text');
}
licence() {
  let copyrightText = global.projectJson.project.copyrightText;
  this.textView(copyrightText);
  console.log('ispisan copyright text');
}
version() {
  let version = global.projectJson.project.version;
  this.textView(version);
  console.log('ispisan version text');

}
  

  render() {
    console.log(global.projectJson.project.imprintText);

      return (
        <View style={styles.container}>
          <StatusBar barStyle="dark-content" hidden={true} />
         
          <View style={styles.navbar}>
          
            <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end', alignItems: 'center', width:'20%' }}>
              <TouchableWithoutFeedback onPress={this.openLanguage}><Image style={styles.ico} source={require('./ico/32/earth.png')} /></TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={this.openHome}><Image style={styles.ico} source={require('./ico/32/home.png')} /></TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={this.openFavorites}><Image style={styles.ico} source={require('./ico/32/star.png')} /></TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={this.openMenu}><Image style={styles.ico} source={require('./ico/32/menu.png')} /></TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={this.openSearch}><Image style={styles.ico} source={require('./ico/32/search.png')} /></TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={this.openFolder}><Image style={styles.ico} source={require('./ico/32/folder.png')} /></TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={this.openSettings}><Image style={styles.ico} source={require('./ico/32/settings.png')} /></TouchableWithoutFeedback>
            </View>

          </View>
       
          <View style={styles.content}>
          <View style={{backgroundColor: 'white', width:'40%', height: "100%", justifyContent: 'center'}}>
              <TouchableOpacity style={styles.btn_settings} onPress={this.imprint()}><Text style={styles.btn_text}>Imprint</Text></TouchableOpacity>
              <TouchableOpacity style={styles.btn_settings} onPress={this.terms()}><Text style={styles.btn_text}>Terms</Text></TouchableOpacity>
              <TouchableOpacity style={styles.btn_settings} onPress={this.licence()}><Text style={styles.btn_text}>Copyrights/License</Text></TouchableOpacity>
              <TouchableOpacity style={styles.btn_settings} onPress={this.version()}><Text style={styles.btn_text}>Version 1.0.1 (Build 28)</Text></TouchableOpacity>
          </View>
          <View style={{backgroundColor: '#E0E0E0', width:'60%', height: "100%", borderWidth: 5, borderColor: 'white'}}>
            <Text style={styles.btn_text}>{this.imprint()}</Text>
          </View>

         


          </View>
          {this.state.visible &&
                        <MenuList data={global.globalJson} from={this.props.from.menuId} />
                    }
            <Footer data={this.state.contentJson} onPress={() => { this.state.visible ? this.setState({ visible: false }) : this.setState({ visible: true }); }} />
        </View>
      );
    }
   
  
  }


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
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
    backgroundColor: 'transparent',
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    height: '86%'
   
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
  },
  btn_settings: {
    backgroundColor: '#E0E0E0',
    height:"17%",
    width: "100%",
    paddingTop: 10,
    borderWidth: 3,
    borderColor: 'white',
    justifyContent: 'center'
    
    
  },
  btn_text: {
    fontSize: 30,
    paddingLeft: 30,
    paddingTop: 7
  } 



});
console.disableYellowBox = true;