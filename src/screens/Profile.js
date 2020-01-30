import React, {Component} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import Header from '../components/Profile/Header';
class Profile extends Component {
  render() {
    return (
      <>
        <StatusBar barStyle="light-content" backgroundColor="#847FE5" />
        <View style={styles.root}>
          <Header />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: '#fff'},
});

export default Profile;
