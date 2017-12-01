import React, { Component } from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from '../Home';
import Settings from '../Settings';
import TestPage from './components/TestPage';
import HBF from './components/HBF';
import aaa from './components/aaa';

export default class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Stack key="root" hideNavBar={true}>
          <Scene key="login" component={Login} title="Login"  />
          <Scene key="signup" component={Signup} title="Register" />
          <Scene key="home" component={Home} title="Home" initial={true}/>
          <Scene key="settings" component={Settings} title="Settings" />
          <Scene key="HBF" component={HBF} title="HBF" />
          <Scene key="aaa" component={aaa} title="aaa" />
        </Stack>
      </Router>
    )
  }
}
