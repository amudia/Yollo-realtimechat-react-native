//import liraries
import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import Router from './src/config/router';

class App extends Component {
  render() {
    return (
      <View style={styles.root}>
        <Router />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
});

export default App;
