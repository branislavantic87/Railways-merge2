import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import MenuList from './src/components/MenuList';

export default class App extends React.Component {
  render() {
    return (
      <ScrollView horizontal={true}>
        <MenuList />
      </ScrollView>
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
