import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Alert, NetInfo } from 'react-native';
import axios from 'axios';
import expo, { FileSystem, Video } from 'expo';
import MenuList from './src/components/MenuList';
import md5 from 'md5';

export default class App extends Component {

  state = { fetchedData: {}, data: {}, isLoading: true };

  componentWillMount() {

    const pathToContentJson = FileSystem.documentDirectory + 'contentJson.json';
    const contentJsonURL = 'http://www.cduppy.com/salescms/?a=ajax&do=getContent&projectId=3&token=1234567890';
    const pathToFiles = FileSystem.documentDirectory + 'files/';
    let doDownload = false;
    // FileSystem.deleteAsync(pathToFiles + '94.mp4')
    // .then(() => console.log('Obrisao'));
    let successDownload = [];

    //dodati uslov ako ima interneta
    axios.get(contentJsonURL)
      .then(response => this.setState({ fetchedData: response.data }))
      .then(() => FileSystem.getInfoAsync(pathToFiles))
      .then((res) => !res.exists ? FileSystem.makeDirectoryAsync(pathToFiles) : console.log(res.size))
      .then(() => FileSystem.getInfoAsync(pathToContentJson)) // uzmi info od contentJson
      .then(data => !data.exists ? putContentInFile() : compareJsonsAndDownloadNewContent())


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
      const a = this.state.data.files.map(file =>
        FileSystem.getInfoAsync(pathToFiles + file.fileId + '.' + file.ext, {size: true})
          .then((res) => res.size != Number(file.size) ? sD.push(file) : null)
      );

      try {
        await Promise.all(a)
          .then(() => sD.length > 0 ? calculateSize(sD) : console.log('Ne treba nista da se skine'))
          .then((mb) => alertForDownload(mb)
            .then(() => sD.map(file => downloadOne(file)))
            .catch(() => console.log('Pritisnut je NO u calculateDifference()'))
          )
          .then(() => this.setState({ isLoading: false}))
      } catch (error) {
        console.log(sD);
        console.log(calculateSize(sD));
        console.log('Catch od Promise.all(a)' + error);
      }



    }


    downloadOne = (file) => {
      FileSystem.downloadAsync('http://www.cduppy.com/salescms/files/3/' + file.fileId, pathToFiles + file.fileId + '.' + file.ext)
      .then(({uri}) => { console.log("One file has been downloaded at " + uri); successDownload.push(file); })
    }

    calculateSize = (filesArr) => {
      let result = 0;
      filesArr.forEach(ele => {
        result += Number(ele.size);
      });
      result = (result / 1024 / 1024).toFixed(2);
      return result;
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
            this.setState({ data: contentJsonObj}); // u this.state.data stavi {} iz fajla
            console.log("Hashevi su isti, poredim fajlove!");
            calculateDifference();

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
        FileSystem.downloadAsync('http://www.cduppy.com/salescms/files/3/' + file.fileId, pathToFiles + file.fileId + '.' + file.ext)
          .then(({ uri }) => { console.log('Finished downloading to ', uri); successDownload.push(file); })
      ); // end of map
      try {
        await Promise.all(a);
        console.log(a);
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
          <Image source={{ uri: FileSystem.documentDirectory + 'files/93.jpg' }} style={{ height: 300, width: 300 }} />
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
    else
      return (
        <View style={{ marginTop: 50 }}>
          <Text>Loading, please wait.</Text>
        </View>
      );
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
