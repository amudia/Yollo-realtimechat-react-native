import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  PermissionsAndroid,
  ToastAndroid,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import {TextInput, Button} from 'react-native-paper';
import {withNavigation} from 'react-navigation';
import {TouchableOpacity} from 'react-native-gesture-handler';

import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from 'react-native-geolocation-service';
import firebase from 'react-native-firebase';

class LoginOriginal extends Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      email: '',
      password: '',
    };
  }
  componentDidMount = async () => {
    this._isMounted = true;
    await this.getLocation();
  };

  componentWillUnmount() {
    this._isMounted = false;
    Geolocation.clearWatch();
    Geolocation.stopObserving();
  }
  toRegister = () => {
    this.props.navigation.navigate('Register');
  };

  inputHandler = (name, value) => {
    this.setState(() => ({[name]: value}));
  };
  hasLocationPermission = async () => {
    if (
      Platform.OS === 'ios' ||
      (Platform.OS === 'android' && Platform.Version < 23)
    ) {
      return true;
    }
    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (hasPermission) {
      return true;
    }
    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }
    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location Permission Denied By User.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location Permission Revoked By User.',
        ToastAndroid.LONG,
      );
    }
    return false;
  };
  getLocation = async () => {
    const hasLocationPermission = await this.hasLocationPermission();

    if (!hasLocationPermission) {
      return;
    }

    this.setState({loading: true}, () => {
      Geolocation.getCurrentPosition(
        position => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            loading: false,
          });
        },
        error => {
          this.setState({errorMessage: error});
        },
        {
          enableHighAccuracy: true,
          timeout: 8000,
          maximumAge: 8000,
          distanceFilter: 50,
          forceRequestLocation: true,
        },
      );
    });
  };

  handleChange = key => val => {
    this.setState({[key]: val});
  };
  submitForm = async () => {
    const {email, password} = this.state;
    if (email.length < 6) {
      ToastAndroid.show(
        'Please input a valid email address',
        ToastAndroid.LONG,
      );
    } else if (password.length < 6) {
      ToastAndroid.show(
        'Password must be at least 6 characters',
        ToastAndroid.LONG,
      );
    } else {
      firebase
        .database()
        .ref('user/')
        .orderByChild('/email')
        .equalTo(email)
        .once('value', result => {
          let data = result.val();
          if (data !== null) {
            let user = Object.values(data);

            AsyncStorage.setItem('user.email', user[0].email);
            AsyncStorage.setItem('user.name', user[0].name);
            AsyncStorage.setItem('user.photo', user[0].photo);
          }
        });
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(async response => {
          firebase
            .database()
            .ref('/user/' + response.user.uid)
            .update({
              status: 'Online',
              latitude: this.state.latitude || null,
              longitude: this.state.longitude || null,
            });
          // AsyncStorage.setItem('user', response.user);
          await AsyncStorage.setItem('userid', response.user.uid);
          // await AsyncStorage.setItem('user', response.user);
          ToastAndroid.show('Login success', ToastAndroid.LONG);
          await this.props.navigation.navigate('Chat');
        })
        .catch(error => {
          this.setState({
            errorMessage: error.message,
            email: '',
            password: '',
          });
          ToastAndroid.show(this.state.errorMessage, ToastAndroid.LONG);
        });
      // Alert.alert('Error Message', this.state.errorMessage);
    }
  };
  _toastWithDurationGravityOffsetHandler = () => {
    //function to make Toast With Duration, Gravity And Offset
    ToastAndroid.showWithGravityAndOffset(
      `Hi, Welcome '${this.state.user.name}'`,
      ToastAndroid.LONG, //can be SHORT, LONG
      ToastAndroid.BOTTOM, //can be TOP, BOTTON, CENTER
      25, //xOffset
      50, //yOffset
    );
  };
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
                <Text style={styles.textheader}>LOGIN</Text>
              </View>
            </LinearGradient>
          </View>
          <ScrollView>
            <View style={styles.wraplogo}>
              <Text style={styles.text}>YoLLO</Text>
              <Icon name="wind" size={22} color="#4a675a" />
            </View>
            <View style={styles.wrapcontent}>
              {this.state.errorMessage && (
                <Text style={styles.texterr}>{this.state.errorMessage}</Text>
              )}
              {/* {this.state.isLoading && <Spinner />} */}

              <View style={styles.wraptextinput}>
                <TextInput
                  label="Email"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  mode="outlined"
                  style={styles.textInput}
                  onChangeText={this.handleChange('email')}
                  theme={{
                    colors: {
                      primary: '#757EE3',
                      underlineColor: 'transparent',
                    },
                  }}
                />
                <TextInput
                  label="Password"
                  mode="outlined"
                  secureTextEntry={true}
                  style={styles.textInput}
                  onChangeText={this.handleChange('password')}
                  theme={{
                    colors: {
                      primary: '#757EE3',
                      underlineColor: 'transparent',
                    },
                  }}
                />

                <Button
                  mode="outlined"
                  color="#fff"
                  loading={this.state.loading}
                  style={styles.btnlogin}
                  onPress={this.submitForm}>
                  LOGIN
                </Button>

                <View style={styles.wrapsignup}>
                  <Text>Don't have an account? </Text>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Register')}>
                    <Text style={styles.textsignup}> Sign up!</Text>
                  </TouchableOpacity>
                </View>
                {/* <View style={styles.textor}>
                  <Text>OR</Text>
                </View>

                <View style={styles.wrapgooglesign}>
                  <GoogleSigninButton
                    style={styles.googleSign}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Light}
                    onPress={this.signInGoogle}
                    />
                </View> */}
              </View>
            </View>
          </ScrollView>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: '#fff'},
  wrapheader: {elevation: 5},
  header: {
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textheader: {color: '#fff', fontSize: 16, fontWeight: 'bold'},
  wraplogo: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 200,
  },
  textInput: {
    backgroundColor: '#FFF',
    height: 45,
    marginTop: 20,
    color: '#eee',
    marginBottom: 5,
    fontSize: 12,
  },
  wrapcontent: {justifyContent: 'center', alignItems: 'center'},
  wraptextinput: {width: '100%', paddingHorizontal: 20},
  btnlogin: {borderColor: '#757EE3', backgroundColor: '#757EE3', marginTop: 20},
  textor: {alignItems: 'center', marginTop: 20},
  wrapgooglesign: {alignItems: 'center', justifyContent: 'center'},
  googleSign: {
    marginTop: 20,
    width: '100%',
    height: 50,
  },
  text: {
    marginTop: 20,
    fontSize: 40,
    color: '#4a675a',
    fontFamily: 'Holaholo',
  },
  wrapsignup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  textsignup: {color: 'orange'},
  texterr: {color: 'red', textAlign: 'center'},
});

const Login = withNavigation(LoginOriginal);

export default Login;
