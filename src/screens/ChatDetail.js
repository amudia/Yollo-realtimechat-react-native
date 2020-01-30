import React, {Component} from 'react';
import {Text, View, StyleSheet, StatusBar, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import {Left, Right} from 'native-base';
import {withNavigation} from 'react-navigation';

class ChatDetailOriginal extends Component {
  render() {
    return (
      <>
        <StatusBar barStyle="light-content" backgroundColor="#847FE5" />
        <View style={styles.root}>
          <View style={styles.wrapheader}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1.5, y: 0}}
              colors={['#757EE3', '#A972F4']}>
              <View style={styles.header}>
                <Left style={styles.leftico}>
                  <Icon name="arrow-left" size={20} color="#fff" />
                </Left>
                <View style={styles.wraptextheader}>
                  <View style={styles.wrapimg}>
                    <Image
                      source={require('../assets/img/profile.jpg')}
                      style={styles.img}
                    />
                  </View>
                  <Text style={styles.textheader}>Selingkuhan</Text>
                </View>
                <Right style={styles.rightico}>
                  <Text />
                </Right>
              </View>
            </LinearGradient>
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: '#fff'},
  profilePic: {
    height: 50,
    width: 50,
    backgroundColor: '#4A675A',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  imguser: {height: 50, width: 50, borderRadius: 50},
  listChat: {
    padding: 20,
    marginBottom: 20,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrapchat: {
    borderBottomWidth: 1,
    width: '100%',
    borderColor: '#eee',
    flex: 1,
    paddingBottom: 10,
    justifyContent: 'flex-end',
    height: 60,
  },
  personName: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  personChat: {
    color: '#1f1f1f',
  },
  wrapheader: {marginBottom: 10, elevation: 5},
  header: {
    height: 55,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  wraptextheader: {
    alignItems: 'center',
    paddingLeft: 20,
    width: '70%',
    flexDirection: 'row',
  },
  textheader: {color: '#fff', fontSize: 16, paddingLeft: 20},
  rightico: {
    alignItems: 'flex-end',
    paddingRight: 30,
  },
  leftico: {paddingLeft: 30},
  wrapimg: {
    width: 40,
    height: 40,
    backgroundColor: '#eee',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {width: 40, height: 40, borderRadius: 50},
});

const ChatDetail = withNavigation(ChatDetailOriginal);

export default ChatDetail;
