import React, { Component } from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from '../Home';
import Settings from '../Settings';
import ImageButtons from './components/temp2_imagebuttons';
import FullImage from './components/temp1_fullimage';
import TextImage from './components/temp3_textimage';
import FullText from './components/temp4_fulltext';
import HeaderFooter from './components/HeaderFooter';

export default class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Stack key="root" hideNavBar={true}>
          <Scene key="login" component={Login} title="Login"  />
          <Scene key="signup" component={Signup} title="Register" />
          <Scene key="home" component={Home} title="Home" />
          <Scene key="settings" component={Settings} title="Settings" />
          <Scene key="temp1" component={FullImage} title="Image and buttons temlpate" />
          <Scene key="temp2" component={ImageButtons} title="Image template" initial={true}/>
          <Scene key="temp3" component={TextImage} title="Text and image Template" />
          <Scene key="temp4" component={FullText} title="Text temlpate" />
          <Scene key="hf" component={HeaderFooter} title="HeaderFooter" />
        </Stack>
      </Router>
    )
  }
}
