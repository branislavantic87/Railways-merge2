import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, StatusBar, TouchableWithoutFeedback, TouchableOpacity, Alert, NetInfo } from 'react-native';
import axios from 'axios';
import expo, { FileSystem, Video } from 'expo';
import MenuList from './src/components/MenuList';
import md5 from 'md5';
import SlidingUpPanel from 'rn-sliding-up-panel';
import { Actions } from 'react-native-router-flux';
import HBF from './src/components/HBF';

export default class Home extends Component {

  state = {
      startPage: global.globalJson.startPage,
      menu: {},
      filtered: []
  };

  componentWillMount() {

    let a = this.findStartPage();
    let b = this.findMenu(a[0].menuId);
    this.setState({ menu: b, filtered: a });
    

  }

  render() {
      return (
        <View>
          <HBF from={this.state.menu} filtered={this.state.filtered} />
        </View>
      );
    }


    findStartPage() {
      let a = [];
      for(let i=0; i<global.globalJson.pages.length; i++) {
        if(global.globalJson.pages[i].pageId == this.state.startPage){
          a.push(global.globalJson.pages[i]);
        }
      }
      return a;
    }
  
    findMenu(menuIdS) {
      let menus = global.globalJson.menuTrees[1].menuTree;
      let found = {};
  
      for(let i=0; i<menus.length; i++) {
        if( menus[i].menuId == menuIdS) {found = menus[i]; break;}
        else {
          if(menus[i].children)
          for(let j=0;j<menus[i].children.length; j++) {
            if(menus[i].children[j].menuId == menuIdS) {found = menus[i].children[j]; break;}
            else {
              if(menus[i].children[j].children) {
                for(let k=0; k<menus[i].children[j].children.length; k++) {
                  if(menus[i].children[j].children[k].menuId == menuIdS) { found = menus[i].children[j].children[k]; break;} 
                } 
              }
            }
          }
        }
      }
      return found;
    }
  
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4169e1',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  navbar: {
    height: '7%',
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row'
  },
  content: {
    backgroundColor: 'white',
    width: '100%',
    flex: 1,
    position: 'relative',
  },
  menuList: {
    position: 'absolute',
    width: 100,
    height: 100,
    top: 200,
    left: 40,
    backgroundColor: 'white'
  },
  footbar: {
    height: '7%',
    width: '100%',
    backgroundColor: 'white',
    borderColor: 'white',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 10
  },
  menuButton: {
    width: 200,
    alignItems: 'center',
    height: 50,
  },
  subMenuButton: {
    width: 200,
    alignItems: 'center',
    height: 50,
    backgroundColor: 'white',
  },
  main_panel: {
    height: '50%',
    marginTop: '22%',
    backgroundColor: 'white',
  },
  scroll: {
    flexDirection: 'row',
    backgroundColor: 'red',
    height: 50,
  },
  ico: {
    height: 24,
    width: 24,
    marginRight: 15,
  },
  headerIcons: {
    flex: 1,
    backgroundColor: "white",
    height: 40,
    width: '50%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 20
  },
  content2: {
    position: 'absolute',
    justifyContent: 'flex-start',
    marginLeft: '15%'

  },
  content3: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: '15%'
  },
  videotour: {
    backgroundColor: '#4169e1',
    width: 270,
    height: 39,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 90,
    paddingTop: 50
  },
  ico2: {
    width: 24,
    marginRight: 20,
    height: 24,
    marginTop: 10
  },



});
console.disableYellowBox = true;

