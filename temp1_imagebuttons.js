import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
//import Pdf from 'react-native-pdf';

import { Actions } from 'react-native-router-flux';

export default class ImageButtons extends Component{
        ajmo(){
          Actions.pdf()  
    
        }
        render() {
              return (
                  <View style={styles.container}>
                    <View style={styles.header}>
    
                    </View>
                    <View style={styles.imgContainer}>
                          <Image
                              style={styles.contentImage}
                              source={{ uri: 'https://www.bahn.com/en/view/mdb/pv/agenturservice/2011/mdb_22990_ice_3_schnellfahrstrecke_nuernberg_-_ingolstadt_1000x500_cp_0x144_1000x644.jpg' }}
                          />
                          <View style={styles.ButtonContainer}>
                              <TouchableOpacity style={styles.ButtonContent}  >
                                  <Image
                                      style={styles.ButtonIconStyle}
                                      source={require('./ico/menu1.png')}
                                  />
                                  <Text style={styles.ButtonTextStyle}>CONTENT</Text>
                              </TouchableOpacity >
                              <TouchableOpacity style={styles.ButtonContent}  >
                                  <Image
                                      style={styles.ButtonIconStyle}
                                      source={require('./ico/play-button.png')}
                                  />
                                  <Text style={styles.ButtonTextStyle}>VIDEO</Text>
                              </TouchableOpacity >
                              <TouchableOpacity style={styles.ButtonContent} onPress={this.ajmo} >
                                  <Image
                                      style={styles.ButtonIconStyle}
                                      source={require('./ico/file.png')}
    
                                  />
    
                                  <Text style={styles.ButtonTextStyle}>DOCUMENT</Text>
                              </TouchableOpacity >
                          </View>
                      </View>
    
                      <View style={styles.menuContainer}>
                          <TouchableHighlight >
                              <Image
                                  style={styles.menuImage}
                                  source={{ uri: 'http://www.gducrotoy.com/web/images/menu-icon-8_lmresized_1.png' }}
                              />
                          </TouchableHighlight>
                      </View>
                  </View>
    
              );
          }
      }
    
      const styles = StyleSheet.create({
          header:{
            backgroundColor:'white',
            height:25,
    
          },
          ButtonContainer: {
              // flexDirection:'row',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              position: 'absolute',
              bottom: 0,
              right: 50,
              marginBottom: 50,
              width: '51%',
              justifyContent:'space-between'
    
    
          },
          pdf: {
            flex:1,
            width:Dimensions.get('window').width,
        },
          container: {
              position: 'relative',
          },
          ButtonIconStyle: {
              marginRight: 10,
    
          },
          menuContainer: {
              //  flex: 1,
              alignItems: 'flex-start',
              justifyContent: 'flex-end',
          },
          container: {
              flex: 1,
              backgroundColor: '#fff',
              justifyContent: 'center',
          },
          menuImage: {
              width: 50,
              height: 50,
          },
          contentImage: {
              width: '100%',
              height: '100%',
              resizeMode: 'cover'
          },
          imgContainer: {
            flex:1,
              height: '92%',
              justifyContent: 'center',
              position: 'relative',
              // flexDirection:'row',
              // marginTop: 55
          },
          ButtonContent: {
              borderColor: '#fff',
              borderWidth: 3,
              borderRadius: 4,
              paddingHorizontal: 40,
              backgroundColor: '#0082B3',
              padding: 18,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
          },
          ButtonTextStyle:{
            fontSize: 20,
            color: '#fff'
    
          },
      });