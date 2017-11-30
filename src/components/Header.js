import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, StatusBar, TouchableWithoutFeedback, TouchableOpacity, Alert, NetInfo } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class Header extends React.Component {

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
    Actions.home({isLoading: false})
  };


  render() {

    return (

      <View style={styles.navbarH}>
        
        <StatusBar barStyle="dark-content" hidden={true} />
        <View style={{ flexDirection: 'row' }}>
          <View style={{ marginRight: '33%', marginTop: '1%' }}><Text>{this.props.title ? this.props.title : ''}</Text></View>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
         
            <TouchableWithoutFeedback onPress={this.openLanguage}><Image style={styles.ico} source={require('./ico/32/earth.png')} /></TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this.openHome}><Image style={styles.ico} source={require('./ico/32/home.png')} /></TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this.openFavorites}><Image style={styles.ico} source={require('./ico/32/star.png')} /></TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this.openMenu}><Image style={styles.ico} source={require('./ico/32/menu.png')} /></TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this.openSearch}><Image style={styles.ico} source={require('./ico/32/search.png')} /></TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this.openFolder}><Image style={styles.ico} source={require('./ico/32/folder.png')} /></TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this.openSettings}><Image style={styles.ico} source={require('./ico/32/settings.png')} /></TouchableWithoutFeedback>
          </View>
        </View>
      </View>

    )
  }
}

const styles = StyleSheet.create({

  navbarH: {
    height: 30,
    width: '100%',
    backgroundColor: 'white',
    justifyContent: "center",
    alignItems: 'flex-end',
  },
  ico: {
    height: 24,
    width: 24,
    marginRight: 15,
  },




});
console.disableYellowBox = true;