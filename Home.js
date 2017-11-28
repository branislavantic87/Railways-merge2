import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, StatusBar, TouchableWithoutFeedback, TouchableOpacity, Alert, NetInfo } from 'react-native';
import axios from 'axios';
import expo, { FileSystem, Video } from 'expo';
import MenuList from './src/components/MenuList';
import md5 from 'md5';
import SlidingUpPanel from 'rn-sliding-up-panel';
import { Actions } from 'react-native-router-flux';

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
    Actions.settings()
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


  componentWillMount() {

    const pathToContentJson = FileSystem.documentDirectory + 'contentJson.json';
    const pathToProjectJson = FileSystem.documentDirectory + 'projectJson.json';
    const contentJsonURL = 'http://www.cduppy.com/salescms/?a=ajax&do=getContent&projectId=3&token=1234567890';
    const projectJsonURL = 'http://www.cduppy.com/salescms/?a=ajax&do=getProject&projectId=3&token=1234567890';
    const pathToFiles = FileSystem.documentDirectory + 'files/';



    akoImaNeta = () => {
      axios.get(contentJsonURL)
        .then(response => this.setState({ fetchedData: response.data }))
        .then(() => FileSystem.getInfoAsync(pathToFiles))
        .then((res) => !res.exists ? FileSystem.makeDirectoryAsync(pathToFiles) : null)
        .then(() => FileSystem.getInfoAsync(pathToContentJson)) // uzmi info od contentJson
        .then(data => !data.exists ? putContentInFile() : compareJsonsAndDownloadNewContent())
    }

    if (NetInfo.isConnected)
      akoImaNeta();
    else {
      FileSystem.getInfoAsync(pathToContentJson)
        .then((res) => !res.exists ? this.setState({ isLoading: 'offline' }) : this.setState({ isLoading: false }))
    }

    putContentInFile = () => {
      FileSystem.downloadAsync(contentJsonURL, pathToContentJson)
        .then((dataFromDownload) => FileSystem.readAsStringAsync(pathToContentJson))
        .then((dataFromRead) => JSON.parse(dataFromRead))
        .then((contentJsonObj) => this.setState({ data: contentJsonObj }))
        .then(() => calculateSize(this.state.data.files))
        .then((mb) => alertForDownload(mb)
          .then(() => downloadAllFiles())
          .catch(() => console.log('Pritisnut je NO'))
        )
        .then(() => this.setState({ isLoading: false }))
    }
    // 1 vodenica == 7 kamenova
    // 1 kamen == 4 litre
    // 1 litra == 7 dana
    // 100 drama == 1 litra == 7 dana == 28 kamenova == 4 vodenice
    // 100 drama == 7 dana
    // 7 kamenova == 196 dana

    calculateDifference = async () => {
      let sD = [];
      let size = 0;
      let t0 = Date.now();
      const a = this.state.data.files.map(file =>
        FileSystem.getInfoAsync(pathToFiles + file.fileId + '.' + file.ext, { md5: true })
          .then((res) => res.md5 != file.hash ? sD.push(file) : null)
      );
      this.setState({ hashingL: a.length });
      try {
        await Promise.all(a)
          .then(() => {
            this.setState({ downloadedL: sD.length });
            this.setState(prevState => ({ hashing: prevState.hashing + 1 }));
            if (sD.length > 0)
              return calculateSize(sD)
                .then((mb) => alertForDownload(mb))
                .then(() => sD.map(file => downloadOne(file)))
                .then(async (res) => await Promise.all(res))
                .catch(() => console.log('Pritisnut je NO u calculateDifference()'))
                .then(() => this.setState({ isLoading: false }))
            else {
              console.log('Fajlovi su isti, nema potrebe za novim download-om');
              this.setState({ isLoading: false });
            }
            let t1 = Date.now();
            console.log(Number(t1) - Number(t0));
          })
      } catch (error) {
        console.log(sD);
        console.log(calculateSize(sD));
        console.log('Catch od Promise.all(a)' + error);
      }
    }

    downloadOne = (file) => {
      return FileSystem.downloadAsync('http://www.cduppy.com/salescms/files/3/' + file.fileId, pathToFiles + file.fileId + '.' + file.ext)
        .then(({ uri }) => { this.setState(prevState => ({ downloaded: prevState.downloaded + 1 })); console.log("One file has been downloaded at " + uri); })

    }

    calculateSize = (filesArr) => {
      return new Promise((resolve, reject) => {
        let result = 0;
        filesArr.forEach(ele => {
          result += Number(ele.size);
        });
        result = (result / 1024 / 1024).toFixed(2);
        resolve(result);
      })
    }

    alertForDownload = async (result) => {
      let p = new Promise((resolve, reject) => {
        Alert.alert(
          'About to download ' + result + ' MB.',
          'Do you wish to download?',
          [{ text: 'Yes', onPress: () => { resolve(); } },
          { text: 'No', onPress: () => { reject(); } }
          ]
        )
      });
      return p;
    }

    compareJsonsAndDownloadNewContent = () => {
      FileSystem.readAsStringAsync(pathToContentJson) // ocitaj
        .then(fileAsString => {
          const contentJsonObj = JSON.parse(fileAsString); // parsiraj kao objekat
          if (md5(this.state.fetchedData) == md5(contentJsonObj)) { // ako su hash-evi isti
            this.setState({ data: contentJsonObj }); // u this.state.data stavi {} iz fajla
            console.log("Hashevi su isti, poredim fajlove!");
            calculateDifference();
            console.log("Fajlovi se sada podudaraju!");
          } else { // ako hash-evi nisu isti
            console.log("Hash nije isti, POCNI");
            const oldJson = JSON.parse(fileAsString); // smesti trenutni fajl u ovu varijablu
            const newJson = this.state.fetchedData;
            FileSystem.writeAsStringAsync(pathToContentJson, newJson.toString()); // overwrite file

            // provera fajlova
          }
        });

    }

    downloadAllFiles = async () => {
      console.log('Usao u funkciju downloadAllFiles()');
      const a = this.state.data.files.map(file =>
        downloadOne(file)
      ); // end of map
      this.setState({ downloadedL: a.length })
      try {
        await Promise.all(a);
      } catch (error) {
        console.log('Catch od downloadAllFiles()');
      }
      console.log('All downloads completed!');
    }

  } // end of componentWillMount

  render() {
    if (!this.state.isLoading) {
      //this.downloadAllFiles();
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

            <Image style={{ width: '100%', height: '100%' }} source={{ uri: 'http://www.planwallpaper.com/static/images/880665-road-wallpapers.jpg' }} />
            <View style={styles.content2}>
              <TouchableOpacity style={styles.videotour} onPress={this.openVideos}><View style={styles.content3}><Image style={styles.ico2} source={require('./ico/play-button.png')} /><Text style={{ color: 'white', fontSize: 18, marginTop: 10 }}>VIDEOTOUR</Text></View></TouchableOpacity>
            </View>



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
        <View style={{ marginTop: 50,  }}>
          <Text >Loading, please wait.</Text>
          <Text >Hashing {this.state.hashing} of {this.state.hashingL} files.</Text>
          <Text>Downloaded {this.state.downloaded} of {this.state.downloadedL} files.</Text>
        </View>
      );
    }
    else if (this.state.isLoading == 'offline') {
      return (
        <View style={{ marginTop: 50, }}>
          <Text>You are starting app for first time and you are offline. We need to show some content, and for this we need to download it.</Text>
          <Text>Please connect to internet first.</Text>
        </View>
      );
    }
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
  },
 


});
console.disableYellowBox = true;

