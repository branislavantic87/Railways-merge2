import React, { Component } from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from '../Home';
import Settings from '../Settings';
import FullText from '../temp4_fulltext';
import FullImage from '../temp2_fullimage';
import TextImage from '../temp3_textimage';

export default class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Stack key="root" hideNavBar={true}>
          <Scene key="login" component={Login} title="Login" initial={true} />
          <Scene key="signup" component={Signup} title="Register" />
          <Scene key="home" component={Home} title="Home" />
          <Scene key="settings" component={Settings} title="Settings" />
          <Scene key="temp4" component={FullText} title="Text temlpate" />
          <Scene key="temp2" component={FullImage} title="Image template" />
          <Scene key="temp3" component={TextImage} title="Text and image Template" />
        </Stack>
      </Router>
    )
  }
}
