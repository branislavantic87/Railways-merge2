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
    projectJson: {},
    contentJson: {},
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

    // project Json vars
    let fetchedProject = {};
    let server = '';
    const pathToProjectJson = FileSystem.documentDirectory + 'projectJson.json';
    const projectJsonURL = 'http://www.cduppy.com/salescms/?a=ajax&do=getProject&projectId=3&token=1234567890';

    // content json vars
    let fetchedContent = {};
    const pathToContentJson = FileSystem.documentDirectory + 'contentJson.json';
    const contentJsonURL = 'http://www.cduppy.com/salescms/?a=ajax&do=getContent&projectId=3&token=1234567890';


    // project Json Logic
    projectJsonLogic = () => {
      return new Promise((resolve, reject) => {
        axios.get(projectJsonURL)
          .then(res => { fetchedProject = res.data })
          .then(() => FileSystem.getInfoAsync(pathToProjectJson))
          .then(res => !res.exists ? nePostojiProjectJson() : postojiProjectJson())
          .then(() => checkServer())
          .then(res => { server = res.config.url; })
          .then(() => resolve())
          .catch((err) => { console.log('Greska u projectJsonLogic: ' + err); reject(); })
      })
    }

    nePostojiProjectJson = () => {
      console.log('Usao u nePostojiProjectJson()');
      return new Promise((resolve, reject) => {
        FileSystem.downloadAsync(projectJsonURL, pathToProjectJson)
          .then(res => this.setState({ projectJson: fetchedProject }))
          .then(() => resolve())
          .catch((err) => { console.log('Greska kod nePostojiProjectJson:' + err); reject(); })
      })

    }

    postojiProjectJson = () => {
      console.log('Usao u postojiProjectJson()');
      return new Promise((resolve, reject) => {
        FileSystem.readAsStringAsync(pathToProjectJson)
          .then(res => {
            const projectJsonObj = JSON.parse(res);
            if (md5(fetchedProject) == md5(projectJsonObj)) {
              console.log('Hashevi Project JSON-a su isti');
              this.setState({ projectJson: projectJsonObj });
              resolve();
            } else {
              console.log('Hashevi nisu isti, skinuo fajl i stavio ga u this.state.projectJson');
              FileSystem.downloadAsync(projectJsonURL, pathToProjectJson)
                .then(() => this.setState({ projectJson: fetchedProject }))
                .then(() => resolve())
            }
          })
      })
    }

    checkServer = () => {
      let s1 = axios.get(this.state.projectJson.project.server1);
      let s2 = axios.get(this.state.projectJson.project.server2);

      return Promise.race([s1, s2]);
    }

    // content Json Logic
    contentJsonLogic = () => {
      return new Promise((resolve, reject) => {
        axios.get(contentJsonURL)
          .then(res => { fetchedContent = res.data })
          .then(() => FileSystem.getInfoAsync(pathToContentJson))
          .then(res => !res.exists ? nePostojiContentJson() : postojiContentJson())
          .then(() => resolve())
          .catch((err) => { console.log('Greska u contentJsonLogic: ' + err); reject() })
      })
    }

    nePostojiContentJson = () => {
      console.log('Usao u nePostojiContentJson()');
      return new Promise((resolve, reject) => {
        FileSystem.downloadAsync(contentJsonURL, pathToContentJson)
          .then(res => this.setState({ contentJson: fetchedContent }))
          .then(() => resolve())
          .catch((err) => { console.log('Greska kod nePostojiContentJson:' + err); reject(); })
      })
    }

    postojiContentJson = () => {
      console.log('Usao u postojiContentJson()');
      return new Promise((resolve, reject) => {
        FileSystem.readAsStringAsync(pathToContentJson)
          .then(res => {
            const contentJsonObj = JSON.parse(res);
            if (md5(fetchedContent) == md5(contentJsonObj)) {
              console.log('Hashevi Content JSON-a su isti');
              this.setState({ contentJson: contentJsonObj });
              resolve();
            } else {
              // OVDE RESITI KADA STIGNE NOVI JSON
              console.log('Hashevi nisu isti, skinuo fajl i stavio ga u this.state.contentJson');
              srediFajlove(contentJsonObj);
            }
          })
      })
    }

    srediFajlove = (stariJson) => {
      return new Promise((resolve, reject) => {

        let stageRemove = stariJson.files.filter(x => fetchedContent.files.indexOf(x) < 0)
        let stageDownload = fetchedContent.files.filter(x => stariJson.files.indexOf(x) < 0)

        console.log('StageRemove: ' + stageRemove);
        console.log('StageDownload: ' + stageDownload);
      })
    }

    downloadOne = (file) => {
      return new Promise((resolve, reject) => {
        FileSystem.downloadAsync(server + this.state.projectJson.project.contentDir + file.fileId, FileSystem.documentDirectory + file.fileId + '.' + file.ext)
          .then(({ uri }) => {
            this.setState(prevState => ({ downloaded: prevState.downloaded + 1 }));
            console.log('File downloaded at: ' + uri);
            resolve();
          })
          .catch((err) => { console.log('Greska kod downloadOne kod fajla: ' + file.fileId); reject(); })
      })
    }

    calculateSize = (filesArr) => {
      return new Promise((resolve, reject) => {
        let result = 0;
        if (filesArr.length <= 0) {

          reject('Array is empty');
        }
        filesArr.forEach(element => {
          result += Number(element.size);
        });
        result = (result / 1024 / 1024).toFixed(2);
        resolve(result);
      })
    }

    alertForDownload = (mb) => {
      return new Promise((resolve, reject) => {
        if (!mb) {
          reject();
        }
        Alert.alert(
          'About to download ' + mb + ' MB.',
          'Do you wish to download?',
          [
            { text: 'OK', onPress: () => { resolve(); } }
          ]
        )
      })
    }

    checkHashFiles = () => {
      return new Promise((resolve, reject) => {
        let downloadStage = [];

        let a = this.state.contentJson.files.map(file =>
          FileSystem.getInfoAsync(FileSystem.documentDirectory + file.fileId + '.' + file.ext, { md5: true })
            .then(res => res.md5 != file.hash ? downloadStage.push(file) : null)
            .then(() => this.setState(prevState => ({ hashing: prevState.hashing + 1 })))
        );
        this.setState({ hashingL: a.length });

        Promise.all(a)
          .then(() => resolve(downloadStage))
          .catch((err) => console.log('Greska kod checkHashFiles()'))

      })
    }

    downloadFiles = (filesArr) => {
      return new Promise((resolve, reject) => {
        console.log('Usao u funkciju downloadFiles()');
        let a = filesArr.map(file =>
          downloadOne(file)
        );
        this.setState({ downloadedL: a.length });

        Promise.all(a)
          .then(() => resolve())
          .catch(err => console.log('Greska kod checkHashFiles(): ' + err))

      })
    }

    // ovako radim closure u then-ovima
    if(NetInfo.isConnected) {
      projectJsonLogic()
        .then(() => contentJsonLogic())
        .then(() => checkHashFiles())
        .then((niz) => calculateSize(niz)
          .then((data) => alertForDownload(data))
          .then(() => downloadFiles(niz))
        )
        .catch((err) => console.log("Catch od glavnog bloka od checkHashFiles: " + err))
        .then(() => this.setState({ isLoading: false }))
    } else {
      FileSystem.getInfoAsync(pathToContentJson)
      .then((res) => !res.exists ? this.setState({ isLoading: 'offline' }) : this.setState({ isLoading: false }))
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
                <MenuList data={this.state.contentJson} />
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

