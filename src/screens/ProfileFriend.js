import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import Header from '../components/ProfileFriend/Header';
import Icon from 'react-native-vector-icons/Feather';

class ProfileFriend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      person: props.navigation.getParam('item'),
      items: props.navigation.getParam('item'),
    };
  }
  render() {
    return (
      <>
        <StatusBar barStyle="light-content" backgroundColor="#847FE5" />
        <View style={styles.root}>
          <Header />
          <View style={styles.wrapimgprofile}>
            <View style={styles.wrapimgprofile1}>
              <Image
                source={{
                  uri: this.state.person.photo,
                }}
                style={styles.imgprofile}
              />
            </View>
          </View>
          <View>
            <View style={styles.wrapitems}>
              <Icon name="user" size={20} color="#4a675a" />
              <Text style={styles.textitems}>{this.state.person.name}</Text>
            </View>
            <View style={styles.wrapitems}>
              <Icon name="mail" size={20} color="#4a675a" />
              <Text style={styles.textitems}>{this.state.person.email}</Text>
            </View>
            <View style={styles.wrapitems}>
              <Icon name="info" size={20} color="#4a675a" />
              <Text style={styles.textitems}>{this.state.person.status}</Text>
            </View>
            <TouchableOpacity>
              <View style={styles.wrapitems}>
                <Icon name="map-pin" size={20} color="#757EE3" />
                <Text style={styles.textitems2}>See Location</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.wrapitems1}>
                <Icon name="user-x" size={18} color="orange" />
                <Text style={styles.textitems1}>BLOCK</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: '#fff'},
  wrapimgprofile: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  wrapimgprofile1: {
    height: 150,
    width: 150,
    backgroundColor: '#eee',
    borderRadius: 100,
  },
  imgprofile: {
    height: 150,
    width: 150,
    borderRadius: 100,
  },
  wrapcamera: {position: 'absolute', top: 80, left: 110},
  wrapcamera1: {
    height: 45,
    width: 45,
    borderRadius: 50,
    backgroundColor: '#847FE5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapitems: {
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 20,
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderColor: '#eee',
  },
  wrapitems1: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    marginHorizontal: 20,
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderColor: '#eee',
  },
  textitems: {paddingLeft: 20, color: '#4a675a'},
  textitems1: {paddingLeft: 10, color: 'orange', fontWeight: 'bold'},
  textitems2: {paddingLeft: 20, color: '#757EE3'},
});

export default ProfileFriend;
