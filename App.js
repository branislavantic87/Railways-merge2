import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Alert, NetInfo, WebView } from 'react-native';
import axios from 'axios';
import expo, { FileSystem, Video } from 'expo';
import MenuList from './src/components/MenuList';
import md5 from 'md5';

export default class App extends Component {

  state = {
    fetchedProject: {},
    project: {},
    fetchedData: {},
    data: {},
    isLoading: true,
    downloadedL: 0,
    downloaded: 0,
    hashing: 0,
    hashingL: 0
  };

  componentWillMount() {

    const pathToContentJson = FileSystem.documentDirectory + 'contentJson.json';
    const pathToProjectJson = FileSystem.documentDirectory + 'projectJson.json';
    const contentJsonURL = 'http://www.cduppy.com/salescms/?a=ajax&do=getContent&projectId=3&token=1234567890';
    const projectJsonURL = 'http://www.cduppy.com/salescms/?a=ajax&do=getProject&projectId=3&token=1234567890';
    const pathToFiles = FileSystem.documentDirectory + 'files/';



    /*axios.get(projectJsonURL)
      .then(response => this.setState({ fetchedProject: response.data }))
      .then(() => FileSystem.getInfoAsync(pathToProjectJson, { md5: true }))
      .then((res) => !res.exists ? FileSystem.downloadAsync(projectJsonURL, pathToProjectJson) : compareHash(res))


    compareHash = () => {

    }*/
    //dodati uslov ako ima interneta
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
        <ScrollView>
          {/*<WebView
          bounces={false}
          scrollEnabled={false} 
          source={{ uri: FileSystem.documentDirectory + 'files/105.pdf' }}
          style={{width: 300, height: 300}}
      />*/}
          <Image source={{ uri: FileSystem.documentDirectory + 'files/1597.jpg' }} style={{ height: 300, width: 300 }} />
          <Video
            source={{ uri: FileSystem.documentDirectory + 'files/94.mp4' }}
            style={{ width: 300, height: 300 }}
            rate={1.0}
            volume={0.0}
            muted={true}
            resizeMode="cover"
            shouldPlay
            isLooping
          />

          <MenuList data={this.state.data} />
        </ScrollView>
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
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
