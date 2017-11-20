import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import axios from 'axios';
import MenuList from './src/components/MenuList';

export default class App extends Component {

  state = { data: {}, isLoading: true };

  componentWillMount() {
    axios.get('http://www.cduppy.com/salescms/?a=ajax&do=getContent&projectId=3&token=1234567890')
      .then(response => this.setState({ data: response.data }))
      .then(() => this.setState({ isLoading: false }));
  }

  render() {
    if (!this.state.isLoading) {
      return (
        <ScrollView>

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
