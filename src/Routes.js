import React, { Component } from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from '../Home';
import HBF from './components/HBF';
import VideoView from './components/Video';
import DocumentView from './components/Doc'

export default class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Stack key="root" hideNavBar={true}>
          <Scene key="login" component={Login} title="Login" initial={true} />
          <Scene key="signup" component={Signup} title="Register" />
          <Scene key="home" component={Home} title="Home" />
          <Scene key="HBF" component={HBF} title="HBF" />
          <Scene key="VideoView" component={VideoView} title="VideoView" />
          <Scene key="DocumentView" component={DocumentView} title="DocumentView" />
        </Stack>
      </Router>
    )
  }
}
