import React, {Component} from 'react';
import {Text, View, StatusBar, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';

class SplashScreen extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('Login');
    }, 2000);
  }
  render() {
    return (
      <>
        <StatusBar hidden />
        <View style={styles.root}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1.5, y: 0}}
            colors={['#757EE3', '#A972F4']}>
            <View style={styles.header}>
              <Text style={styles.text}>YoLLO</Text>
              <Icon name="wind" size={22} color="#fff" />
            </View>
          </LinearGradient>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    marginTop: 20,
    fontSize: 40,
    color: '#fff',
    fontFamily: 'Holaholo',
  },
  header: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    flexDirection: 'row',
  },
  textheader: {color: '#fff', fontSize: 20, fontFamily: 'Holaholo'},
});

export default SplashScreen;
