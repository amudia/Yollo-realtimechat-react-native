import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  Image,
  TouchableOpacity,
  ToastAndroid,
  PermissionsAndroid,
} from 'react-native';
import Header from '../components/Profile/Header';
import Icon from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-picker';
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';
import RNFetchBlob from 'rn-fetch-blob';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: null,
      permissionsGranted: null,
      errorMessage: null,
      loading: false,
      updatesEnabled: false,
      location: {},
      photo: null,
      imageUri: null,
      imgSource: '',
      uploading: false,
    };
  }
  componentDidMount = async () => {
    const userId = await AsyncStorage.getItem('userid');
    const userName = await AsyncStorage.getItem('user.name');
    const userAvatar = await AsyncStorage.getItem('user.photo');
    const userEmail = await AsyncStorage.getItem('user.email');
    this.setState({userId, userName, userAvatar, userEmail});
  };
  requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.log(err);
      return false;
    }
  };
  handleLogout = async () => {
    await AsyncStorage.getItem('userid')
      .then(async userid => {
        firebase
          .database()
          .ref('user/' + userid)
          .update({status: 'Offline'});
        await AsyncStorage.clear();
        firebase.auth().signOut();
        ToastAndroid.show('Logout success', ToastAndroid.LONG);
        this.props.navigation.navigate('Login');
      })
      .catch(error => this.setState({errorMessage: error.message}));
  };
  changeImage = async type => {
    const Blob = RNFetchBlob.polyfill.Blob;
    // eslint-disable-next-line no-unused-vars
    const fs = RNFetchBlob.fs;
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
    window.Blob = Blob;

    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      mediaType: 'photo',
    };

    let cameraPermission =
      (await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA)) &&
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ) &&
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
    if (!cameraPermission) {
      cameraPermission = await this.requestCameraPermission();
    } else {
      ImagePicker.showImagePicker(options, response => {
        if (response.didCancel) {
          ToastAndroid.show('You cancelled image picker', ToastAndroid.LONG);
        } else if (response.error) {
          ToastAndroid.show(response.error, ToastAndroid.LONG);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          this.setState({loading: true});
          ToastAndroid.show('Please wait...', ToastAndroid.LONG);
          const imageRef = firebase
            .storage()
            .ref('avatar/' + this.state.userId)
            .child('photo');
          imageRef
            .putFile(response.path)
            .then(data => {
              ToastAndroid.show('Upload success', ToastAndroid.LONG);
              firebase
                .database()
                .ref('user/' + this.state.userId)
                .update({photo: data.downloadURL});
              this.setState({userAvatar: data.downloadURL});
              AsyncStorage.setItem('user.photo', this.state.userAvatar);
            })

            .catch(err => console.log(err));
        }
      });
    }
  };
  render() {
    const {uploading} = this.state;

    // eslint-disable-next-line no-unused-vars
    const disabledStyle = uploading ? styles.disabledBtn : {};

    return (
      <>
        <StatusBar barStyle="light-content" backgroundColor="#847FE5" />
        <View style={styles.root}>
          <Header />
          <View style={styles.wrapimgprofile}>
            <View style={styles.wrapimgprofile1}>
              <TouchableOpacity onPress={this.changeImage}>
                <Image
                  loadingIndicatorSource={this.state.loading}
                  source={{uri: this.state.userAvatar}}
                  style={styles.imgprofile}
                />
              </TouchableOpacity>
              <View style={styles.wrapcamera}>
                <TouchableOpacity onPress={this.changeImage}>
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
              <Text style={styles.textitems}>{this.state.userName}</Text>
            </View>
            <View style={styles.wrapitems}>
              <Icon name="mail" size={20} color="#4a675a" />
              <Text style={styles.textitems}>{this.state.userEmail}</Text>
            </View>
            <View style={styles.wrapitems}>
              <Icon name="info" size={20} color="#4a675a" />
              <Text style={styles.textitems}>Available</Text>
            </View>

            <TouchableOpacity onPress={this.handleLogout}>
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
  wrapitems2: {
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 20,
    flexDirection: 'row',
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
