import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import {Left, Right} from 'native-base';

export default class Header extends Component {
  render() {
    return (
      <View style={styles.wrapheader}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1.5, y: 0}}
          colors={['#757EE3', '#A972F4']}>
          <View style={styles.header}>
            <Left>
              <Text />
            </Left>
            <View style={styles.wraptextheader}>
              <Text style={styles.textheader}>Messages</Text>
            </View>
            <Right style={styles.rightico}>
              <Icon name="search" size={16} color="#fff" />
            </Right>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapheader: {marginBottom: 10, elevation: 5},
  header: {
    height: 55,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 0,
    flexDirection: 'row',
  },
  wraptextheader: {justifyContent: 'center', paddingLeft: 30},
  textheader: {color: '#fff', fontSize: 16, fontWeight: 'bold'},
  rightico: {
    alignItems: 'flex-end',
    paddingRight: 30,
  },
});
