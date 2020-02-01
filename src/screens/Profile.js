import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import Header from '../components/Profile/Header';
import Icon from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-picker';
import firebase from 'react-native-firebase';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photo: '',
      email: '',
      displayName: '',
      currentUser: null,
    };
  }
  componentDidMount() {
    const {email, displayName} = firebase.auth().currentUser;
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({email, displayName});
  }

  signOutUser = () => {
    firebase
      .auth()
      .signOut()
      .then(() => this.props.navigation.navigate('Login'));
  };

  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    // eslint-disable-next-line prettier/prettier
    ImagePicker.launchImageLibrary(options, (response) => {
      const source = {uri: response.uri};
      if (response.uri) {
        this.setState({photo: source});
      }
    });
  };
  render() {
    return (
      <>
        <StatusBar barStyle="light-content" backgroundColor="#847FE5" />
        <View style={styles.root}>
          <Header />
          <View style={styles.wrapimgprofile}>
            <View style={styles.wrapimgprofile1}>
              <TouchableOpacity onPress={this.handleChoosePhoto}>
                <Image
                  source={
                    this.state.photo !== ''
                      ? this.state.photo
                      : require('../assets/img/profile.jpg')
                  }
                  style={styles.imgprofile}
                />
              </TouchableOpacity>
              <View style={styles.wrapcamera}>
                <TouchableOpacity onPress={this.handleChoosePhoto}>
                  <View style={styles.wrapcamera1}>
                    <Icon name="camera" size={20} color="#fff" />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View>
            <View style={styles.wrapitems}>
              <Icon name="user" size={20} color="#4a675a" />
              <Text style={styles.textitems}>{this.state.displayName}</Text>
            </View>
            <View style={styles.wrapitems}>
              <Icon name="mail" size={20} color="#4a675a" />
              <Text style={styles.textitems}>{this.state.email}</Text>
            </View>
            <View style={styles.wrapitems}>
              <Icon name="info" size={20} color="#4a675a" />
              <Text style={styles.textitems}>Available</Text>
            </View>

            <TouchableOpacity onPress={this.signOutUser}>
              <View style={styles.wrapitems1}>
                <Icon name="log-out" size={20} color="orange" />
                <Text style={styles.textitems1}>LOGOUT</Text>
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
});

export default Profile;
