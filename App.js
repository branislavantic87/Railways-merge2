import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import axios from 'axios';
import expo, { FileSystem } from 'expo';
import MenuList from './src/components/MenuList';
import md5 from 'md5';

export default class App extends Component {

  state = { data: {}, isLoading: true };

  componentWillMount() {
    axios.get('http://www.cduppy.com/salescms/?a=ajax&do=getContent&projectId=3&token=1234567890')
      .then(response => this.setState({ data: response.data }))
      .then(console.log(md5(this.state.data)))
      .then(() => this.setState({ isLoading: false }));

      const path = expo.FileSystem.documentDirectory + 'contentJson.json';

      FileSystem.deleteAsync(FileSystem.documentDirectory)
      .catch(err => console.log('aaaa'));


      FileSystem.getInfoAsync(path).then(data => { console.log(data.exists)});

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
        <View style={{marginTop: 50}}>
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
