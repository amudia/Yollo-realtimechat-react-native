import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import {Left, Right} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {withNavigation} from 'react-navigation';

class HeaderOriginal extends Component {
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
              <Icon name="user" color="#fff" size={16} />
              <Text style={styles.textheader}>My Profile</Text>
            </View>
            <Right style={styles.rightico}>
              {/* <TouchableOpacity
                onPress={() => this.props.navigation.navigate('EditProfile')}>
                <View
                  style={{
                    backgroundColor: '#757EE3',
                    height: 40,
                    width: 40,
                    elevation: 4,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 50,
                  }}>
                  <Icon name="settings" color="#fff" size={16} />
                </View>
              </TouchableOpacity> */}
              <Text />
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
  wraptextheader: {
    justifyContent: 'center',
    paddingLeft: 30,
    flexDirection: 'row',
  },
  textheader: {color: '#fff', fontSize: 16, fontWeight: 'bold', marginLeft: 5},
  rightico: {
    alignItems: 'flex-end',
    paddingRight: 30,
    justifyContent: 'flex-end',
  },
});

const Header = withNavigation(HeaderOriginal);

export default Header;
