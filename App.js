import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import axios from 'axios';
import expo, { FileSystem, Video } from 'expo';
import MenuList from './src/components/MenuList';
import md5 from 'md5';

export default class App extends Component {

  state = { fetchedData: {}, data: {}, isLoading: true };

  componentWillMount() {

    const pathToContentJson = FileSystem.documentDirectory + 'contentJson.json';
    const contentJsonURL = 'http://www.cduppy.com/salescms/?a=ajax&do=getContent&projectId=3&token=1234567890';

    const slika = 'http://edukacija.rs/wp-content/uploads/2016/03/prolece-cvece-890x395.jpg';
    const slika2 = 'http://www.medias.rs/images/15/1545/prolece_3.jpg';
    // FileSystem.deleteAsync(pathToContentJson)
    // .then(() => console.log('Obrisao'));

    //dodati uslov ako ima interneta
    axios.get(contentJsonURL)
      .then(response => this.setState({ fetchedData: response.data }))
      .then(() => FileSystem.downloadAsync(slika, FileSystem.documentDirectory + 'prolece.jpg'))
      .then(() => FileSystem.getInfoAsync(pathToContentJson)) // uzmi info od contentJson
      .then(data => {
            if (!data.exists) { // ako ne postoji contentJson
              console.log('Fajl nije postojao i sad je snimljen contentJson.json');
              putContentInFile(); // skini, smesti, ocitaj, smesti u this.state.data iz fajla
            } else { // ako postoji contentJson vec
              compareJsonsAndDownloadNewContent();
            }
          });

    putContentInFile = () => {
      FileSystem.downloadAsync(contentJsonURL, pathToContentJson)
        .then((dataFromDownload) => FileSystem.readAsStringAsync(pathToContentJson))
        .then((dataFromRead) => { return contentJsonObj = JSON.parse(dataFromRead) })
        .then((contentJsonObj) => { this.setState({ data: contentJsonObj }) })
        .then(() => downloadAllFiles())
        .then(() => this.setState({ isLoading: false })) 
    }

    calculateSize = () => {

    }


    compareJsonsAndDownloadNewContent = () => {
      FileSystem.readAsStringAsync(pathToContentJson) // ocitaj
        .then(fileAsString => {
          const contentJsonObj = JSON.parse(fileAsString); // parsiraj kao objekat
          if (md5(this.state.fetchedData) == md5(contentJsonObj)) { // ako su hash-evi isti
            this.setState({ data: contentJsonObj, isLoading: false }); // u this.state.data stavi {} iz fajla
            console.log("Hashevi su isti, nema potrebe za preuzimanjem podataka!");
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
        FileSystem.downloadAsync('http://www.cduppy.com/salescms/files/3/' + file.fileId, FileSystem.documentDirectory + file.fileId + '.' + file.ext)
        .then(({ uri }) => { console.log('Finished downloading to ', uri);  })
      ); // end of map
      try {
        await Promise.all(a);
      } catch(error) {
        console.log('Catch od downloadAllFiles2()');
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
          <Image source={{ uri: FileSystem.documentDirectory + 'prolece.jpg' }} style={{ height: 300, width: 300 }} />
          <Video
            source={{ uri: FileSystem.documentDirectory + '94.mp4' }}
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
