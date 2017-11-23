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
    // FileSystem.deleteAsync(pathToContentJson)
    // .then(() => console.log('Obrisao'));

    //dodati uslov ako ima interneta
    axios.get(contentJsonURL)
      .then(response => this.setState({ fetchedData: response.data }))
      .then(() => FileSystem.getInfoAsync(pathToFiles))
      .then((res) => !res.exists ? FileSystem.makeDirectoryAsync(pathToFiles) : null)
      .then(() => FileSystem.getInfoAsync(pathToContentJson)) // uzmi info od contentJson
      .then(data => !data.exists ? putContentInFile() : compareJsonsAndDownloadNewContent())
  

    putContentInFile = () => { 
      FileSystem.downloadAsync(contentJsonURL, pathToContentJson)
        .then((dataFromDownload) => FileSystem.readAsStringAsync(pathToContentJson))
        .then((dataFromRead) => JSON.parse(dataFromRead))
        .then((contentJsonObj) => this.setState({ data: contentJsonObj }))
        .then(() => calculateSize(this.state.data.files))
        .then((mb) => alertForDownload(mb))
        .then(() => doDownload ? downloadAllFiles() : null)
        .then(() => this.setState({ isLoading: false })) 
    } 
    // 1 vodenica == 7 kamenova
    // 1 kamen == 4 litre
    // 1 litra == 7 dana
    // 100 drama == 1 litra == 7 dana == 28 kamenova == 4 vodenice
    // 100 drama == 7 dana
    // 7 kamenova == 196 dana

    calculateSize = (filesArr) => {
      let result = 0;
      filesArr.forEach(ele => {
        result += Number(ele.size);
      });
      result = Math.round(result / 1024 / 1024, 2);
      return result;
    }

    alertForDownload = async (result) => {
      let p = new Promise((resolve, reject) => {
        Alert.alert(
          'About to download ' + result + ' MB.',
          'Do you wish to download?',
          [
            {
              text: 'Yes', onPress: () => {
                console.log('Kliknut YES');
                doDownload = true;
                resolve();
              }
            },
            {
              text: 'No', onPress: () => {
                console.log('Kliknut No');
                doDownload = false;
                resolve();
              }
            }
          ]
        )
      });
      return p;
    }

    /*
      Alert.alert(
        'About to download ' + result + ' MB.',
        'Do you wish to download?',
        [
          {
            text: 'Yes', onPress: () => {
              console.log('Kliknut YES');
            }
          },
          {
            text: 'No', onPress: () => {
              console.log('Kliknut No');
            
            }
          }
        ]
      )
    */


    compareJsonsAndDownloadNewContent = () => {
      FileSystem.readAsStringAsync(pathToContentJson) // ocitaj
        .then(fileAsString => {
          const contentJsonObj = JSON.parse(fileAsString); // parsiraj kao objekat
          if (md5(this.state.fetchedData) == md5(contentJsonObj)) { // ako su hash-evi isti
            this.setState({ data: contentJsonObj, isLoading: false }); // u this.state.data stavi {} iz fajla
            console.log("Hashevi su isti, poredim fajlove!");


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
          .then(({ uri }) => { console.log('Finished downloading to ', uri); })
      ); // end of map
      try {
        await Promise.all(a);
      } catch (error) {
        console.log('Catch od downloadAllFiles()');
      }
      console.log('All downloads completed!');
    }

  } // end of componentWillMount

  /*downloadOne() {
    console.log(this.state.isLoading);
    if(!this.state.isLoading) {
      console.log("aaaa");
        expo.FileSystem.downloadAsync(
          'http://www.cduppy.com/salescms/files/3/' + this.state.data.files[0].fileId,
          expo.FileSystem.documentDirectory + this.state.data.files[0].fileId + '.' + this.state.data.files[0].ext
        )
        .then(({ uri }) => {
          console.log('AAAAAAAAAAAAAAAAAFinished downloading to ', uri);
        })
        .catch(error => {
          console.error(error);
        });  
    }
  }*/

  render() {
    if (!this.state.isLoading) {
      //this.downloadAllFiles();
      return (
        <ScrollView>
          <Image source={{ uri: FileSystem.documentDirectory + 'files/82.jpg' }} style={{ height: 300, width: 300 }} />
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
