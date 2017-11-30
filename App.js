import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, StatusBar, TouchableWithoutFeedback, TouchableOpacity, Alert, NetInfo } from 'react-native';
import axios from 'axios';
import expo, { FileSystem, Video } from 'expo';
import MenuList from './src/components/MenuList';
import md5 from 'md5';
import SlidingUpPanel from 'rn-sliding-up-panel';
import Routes from './src/Routes';

export default class App extends Component {

  state = {
    downloadedL: 0,
    downloaded: 0,
    hashing: 0,
    hashingL: 0,
    isLoading: true
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
            if (md5(fetchedProject) == md5(projectJsonObj)) {
              console.log('Hashevi Project JSON-a su isti');
              global.projectJson = projectJsonObj;
              resolve();
            } else {
              console.log('Hashevi nisu isti, skinuo fajl i stavio ga u this.state.projectJson');
              FileSystem.downloadAsync(projectJsonURL, pathToProjectJson)
                .then(() => global.projectJson = fetchedProject )
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
            if (md5(fetchedContent) == md5(contentJsonObj)) {
              console.log('Hashevi Content JSON-a su isti');
              //this.setState({ contentJson: contentJsonObj });
              global.globalJson = contentJsonObj;
              resolve();
            } else {
              // OVDE RESITI KADA STIGNE NOVI JSON
              console.log('Hashevi nisu isti, skinuo fajl i stavio ga u this.state.contentJson');
              global.globalJson = fetchedContent;
              obrisiStare(contentJsonObj);
              FileSystem.downloadAsync(contentJsonURL, pathToContentJson)
              .then(() => resolve())
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


  render() {
    if (!this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Routes />
        </View>
      );
    } else if (this.state.isLoading) {
      return (
        <View style={{ marginTop: 50 }}>
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
    flex: 1,

  },
}
)
