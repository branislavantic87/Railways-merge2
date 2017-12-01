import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, StatusBar, TouchableWithoutFeedback, TouchableOpacity, Alert, NetInfo } from 'react-native';
import axios from 'axios';
import expo, { FileSystem, Video } from 'expo';
import MenuList from './src/components/MenuList';
import md5 from 'md5';
import SlidingUpPanel from 'rn-sliding-up-panel';
import Routes from './src/Routes';
import hash from 'object-hash';
import * as Progress from 'react-native-progress';

export default class App extends Component {

  state = {
    downloadedL: 0,
    downloaded: 0,
    hashing: 0,
    hashingL: 0,
    isLoading: true,
    visibleDownload: false,
    indeterminate: true
  }

  isLoading() {
    // project Json vars
    let fetchedProject = {};
    let server = '';
    const pathToProjectJson = FileSystem.documentDirectory + 'projectJson.json';
    const projectJsonURL = 'http://www.cduppy.com/salescms/?a=ajax&do=getProject&projectId=3&token=1234567890';

    // content json vars
    let fetchedContent = {};
    const pathToContentJson = FileSystem.documentDirectory + 'contentJson.json';
    //const contentJsonURL = 'http://192.168.0.30:8000/railways';
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
          .then(() => console.log(server))
          .then(() => resolve())
          .catch((err) => { console.log('Greska u projectJsonLogic: ' + err); reject(); })
      })
    }

    nePostojiProjectJson = () => {
      console.log('Usao u nePostojiProjectJson()');
      return new Promise((resolve, reject) => {
        FileSystem.downloadAsync(projectJsonURL, pathToProjectJson)
          .then(res => global.projectJson = fetchedProject)
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
            if (hash(fetchedProject) == hash(projectJsonObj)) {
              console.log('Hashevi Project JSON-a su isti');
              global.projectJson = projectJsonObj;
              resolve();
            } else {
              console.log('Hashevi nisu isti, skinuo fajl i stavio ga u this.state.projectJson');
              FileSystem.downloadAsync(projectJsonURL, pathToProjectJson)
                .then(() => global.projectJson = fetchedProject)
                .then(() => resolve())
            }
          })
      })
    }

    checkServer = () => {
      let a = global.projectJson.project.servers.map(server =>
        axios.get(server)
      );

      return Promise.race(a);
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
          .then(res => global.globalJson = fetchedContent)
          .then(() => resolve())
          .catch((err) => { console.log('Greska kod nePostojiContentJson:' + err); reject(); })
      })
    }

    postojiContentJson = () => {
      return new Promise((resolve, reject) => {
        FileSystem.readAsStringAsync(pathToContentJson)
          .then(res => {
            const contentJsonObj = JSON.parse(res);
            if (hash(contentJsonObj) == hash(fetchedContent)) {
              console.log('Hashevi Content JSON-a su isti');
              //this.setState({ contentJson: contentJsonObj });
              global.globalJson = contentJsonObj;
              resolve();
            } else {
              // OVDE RESITI KADA STIGNE NOVI JSON
              console.log('Hashevi nisu isti, skinuo fajl i stavio ga u this.state.contentJson');
              global.globalJson = fetchedContent;
              obrisiStare(contentJsonObj, fetchedContent);
              FileSystem.downloadAsync(contentJsonURL, pathToContentJson)
                .then(() => resolve())
            }
          })
      })
    }

    obrisiStare = (stariJson, noviJson) => {
      return new Promise((resolve, reject) => {
        console.log('usao u obrisi stare');

        let stageRemove = stariJson.files.filter(x => noviJson.files.map(nj => nj.hash).indexOf(x.hash) < 0);
        stageRemove.map(x => {
          deleteOne(x);
        })

      })
    }

    deleteOne = (file) => {
      let src = FileSystem.documentDirectory + file.fileId + '.' + file.ext;
      console.log("deleteOne: " + src);
      FileSystem.getInfoAsync(src)
        .then(res => res.exists ? FileSystem.deleteAsync(src) : console.log('Ne postoji taj fajl za brisanje'))
    }

    downloadOne = (file) => {
      return new Promise((resolve, reject) => {
        FileSystem.downloadAsync(server + global.projectJson.project.contentDir + file.fileId, FileSystem.documentDirectory + file.fileId + '.' + file.ext)
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
        this.setState({visibleDownload: true});
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
        let a = global.globalJson.files.map(file =>
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
    if (NetInfo.isConnected) {

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
  }

  componentWillMount() {
    this.isLoading();
  } // end of componentWillMount

  calcProgress() {
    if (this.state.downloaded == 1) {
      this.state.indeterminate = false;
    } 
    if (this.state.downloaded > 0) {
      return this.state.downloaded / this.state.downloadedL;
    }
  }

  render() {
    if (!this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Routes />
        </View>
      );
    } else if (this.state.isLoading) {
      return (
        <View style={{ alignSelf: 'center', paddingTop: 120, width: "100%", height: "100%", backgroundColor: '#4169e1' }}>
          <View style={{ borderBottomColor: 'white', borderBottomWidth: 1, }} />
          <View style={{ alignSelf: 'center', width: 800, height: 500, backgroundColor: '#4169e1', justifyContent: 'center', }}>
            <Text style={styles.loadTextF}>Loading, please wait...</Text>
            <Image style={styles.gif} source={require('./loading.gif')} />
            { /*<Text style={styles.loadText}>Hashing... {this.state.hashing} of {this.state.hashingL} files.</Text>*/}
            {this.state.visibleDownload && <Text style={styles.loadText}>Downloaded {this.state.downloaded} of {this.state.downloadedL} files.</Text>}
            <Progress.Bar
              style={{ alignSelf: 'center', margin: 10, opacity: this.state.showProgress }}
              indeterminate={this.state.indeterminate}
              progress={this.calcProgress()}
              color='#fff'
            />
          </View>
          <View style={{ borderBottomColor: 'white', borderBottomWidth: 1, }} />
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
    flex: 1,

  },
  loadText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 30,
    paddingTop: 80
  },
  loadTextF: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 30,

    paddingBottom: 30
  },
  gif: {
    alignSelf: 'center',
    width: 64,
    height: 64
  }
}
)
