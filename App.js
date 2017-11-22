import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import axios from 'axios';
import expo, { FileSystem } from 'expo';
import MenuList from './src/components/MenuList';
import md5 from 'md5';

export default class App extends Component {

  state = { fetchedData: {}, data: {}, isLoading: true };

  componentWillMount() {

    const pathToContentJson = FileSystem.documentDirectory + 'contentJson.json';
    const pathToFiles = FileSystem.documentDirectory + 'files/';
    const contentJsonURL = 'http://www.cduppy.com/salescms/?a=ajax&do=getContent&projectId=3&token=1234567890';

    /*FileSystem.downloadAsync('http://www.medias.rs/images/15/1545/prolece_3.jpg', 
    FileSystem.documentDirectory + 'a/' + 'prolece.jpg')
    .catch((error) => console.log('Pukao DownloadAsync'));*/
    //FileSystem.deleteAsync(pathToFiles + 'prolece.jpg');
    // pravljenje foldera './files'
    /*FileSystem.getInfoAsync(pathToFiles)
    .then(response => {
      console.log(response.isDirectory);
      console.log(response.size);
      if(!response.isDirectory) {
        FileSystem.makeDirectoryAsync(pathToFiles);
      }
    });*/
    
    // problem jer size od foldera je uvek 4096, nebitno dal ima nesto u njemu
    // naci drugi nacin kako proveriti dal ima nesto u folderu

    checkFilesAndDownloadMissingOnes = () => {
      
    }
    
    FileSystem.getInfoAsync(FileSystem.documentDirectory + 'a/').catch('error kod getInfo')
    .then(res => { console.log(res.isDirectory); console.log(res.size); });

    // ako ima interneta
    axios.get(contentJsonURL)
      .then(response => this.setState({ fetchedData: response.data }))
      .done(() => {
        FileSystem.getInfoAsync(pathToContentJson) // uzmi info od contentJson
          .then(data => {
            if (!data.exists) { // ako ne postoji contentJson
              console.log('Fajl nije postojao i sad je snimljen contentJson.json'); 
              putContentInFile3(); // skini, smesti, ocitaj, smesti u this.state.data iz fajla
            } else { // ako postoji contentJson vec
              compareJsonsAndDownloadNewContent();
            }
          });
      });

    putContentInFile3 = () => {
      FileSystem.downloadAsync(contentJsonURL, pathToContentJson)
      .then((dataFromDownload) => FileSystem.readAsStringAsync(pathToContentJson))
      .then((dataFromRead) => { 
        let contentJsonObj = JSON.parse(dataFromRead);
        this.setState({ data: contentJsonObj, isLoading: false }) 
      });
    }

    putContentInFile2 = () => {
      FileSystem.downloadAsync(contentJsonURL, pathToContentJson, {}, (data) => { 
        console.log("Preuzeo");
        FileSystem.readAsStringAsync(data.fileUri, (str) => {
          console.log("Ocitao");
          let contentJsonObj = JSON.parse(str);
          this.setState({ data: contentJsonObj, isLoading: false });
        });
      });
    }


    putContentInFile = () => {
      FileSystem.downloadAsync(contentJsonURL, pathToContentJson)
      .catch(err => console.log('catch od download: ' + err))
        .then(({ fileUri }) => {
          console.log('=====================');
          FileSystem.readAsStringAsync(fileUri).catch(console.log('Catch od Read'))
            .then(str => {
              let contentJsonObj = JSON.parse(str);
              this.setState({ data: contentJsonObj, isLoading: false })
              .then(() => {
                console.log('Krece skidanje svih fajlova');
                //downloadAllFiles();
              })
              .catch(console.log('error posle setState'));
              
            })
            .catch(console.log('error kod then posle catch of read'));
        })
        .catch(error => { console.log('catch od prvog then') });
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

    downloadAllFiles = () => {
      if(!this.state.isLoading) {
        this.state.data.files.map(file => {
          FileSystem.downloadAsync(
            'http://www.cduppy.com/salescms/files/3/' + file.fileId,
            FileSystem.documentDirectory + file.fileId + '.' + file.ext
          )
          .then(({ uri }) => {
            console.log('Finished downloading to ', uri);
          })
          .catch(error => {
            console.log(error);
          });  
        });
      }
    }

    // iz state u json fajl

    /*expo.FileSystem.getInfoAsync(path).then(data => { console.log(data.exists) });

    expo.FileSystem.downloadAsync(
      'http://www.cduppy.com/salescms/?a=ajax&do=getContent&projectId=3&token=1234567890',
      path
    ).then(({ uri }) => {
      console.log('Finished downloading to ', uri);
    })
    .catch(error => {
      console.error(error);
    });    

    expo.FileSystem.getInfoAsync(path).then(data => { console.log(md5(data)) });
    // json iz fajla
    expo.FileSystem.readAsStringAsync(path)
    .then(data => { 
      let a = JSON.parse(data);
      console.log(a) });*/

    // preuzeti json, staviti u state
    // proveriti dal postoji kao fajl
    // ako ne postoji, snimiti kao fajl
    // ako postoji, proveriti hash-eve

    //this.downloadAllFiles();

  }

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
  }

  downloadAllFiles() {
    if(!this.state.isLoading) {
      this.state.data.files.map(file => {
        expo.FileSystem.downloadAsync(
          'http://www.cduppy.com/salescms/files/3/' + file.fileId,
          expo.FileSystem.documentDirectory + file.fileId + '.' + file.ext
        )
        .then(({ uri }) => {
          console.log('AAAAAAAAAAAAAAAAAFinished downloading to ', uri);
        })
        .catch(error => {
          console.error(error);
        });  
      });
    }
  }*/

  compareJsonHash() {

  }

  render() {
    if (!this.state.isLoading) {
      //this.downloadAllFiles();
      return (
        <ScrollView>
          {/*<Image style={{marginTop: 300, height: 300, width: 300}} source={{uri: expo.FileSystem.documentDirectory + '90.jpg'}} />
        <Image source={{uri: FileSystem.documentDirectory + 'files/prolece.jpg'}}  style={{height: 300, width: 300}} />
          
          <Video
          source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
          rate={1.0}
          volume={1.0}
          muted={false}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={{ width: 300, height: 300 }}
        />*/}

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
