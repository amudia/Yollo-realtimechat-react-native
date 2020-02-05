import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  Platform,
  ToastAndroid,
  PermissionsAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import {TextInput, Button} from 'react-native-paper';
import {withNavigation} from 'react-navigation';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Geolocation from 'react-native-geolocation-service';
import firebase from 'react-native-firebase';

class RegisterOriginal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      name: '',
      email: '',
      password: '',
      latitude: null,
      longitude: null,
      errorMessage: null,
      loading: false,
      updatesEnabled: false,
    };
  }
  componentDidMount = async () => {
    await this.getLocation();
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
          console.warn(position);
        },
        error => {
          this.setState({errorMessage: error, loading: false});
          console.warn(error);
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
  toLogin = () => {
    this.props.navigation.navigate('Login');
  };

  inputHandler = (name, value) => {
    this.setState(() => ({[name]: value}));
  };
  submitForm = () => {
    this.setState({loading: true});
    const {email, name, password} = this.state;
    if (name.length < 1) {
      this.setState({
        loading: false,
      });
      ToastAndroid.show('Please input your fullname', ToastAndroid.LONG);
    } else if (email.length < 6) {
      this.setState({
        loading: false,
      });
      ToastAndroid.show(
        'Please input a valid email address',
        ToastAndroid.LONG,
      );
    } else if (password.length < 6) {
      this.setState({
        loading: false,
      });
      ToastAndroid.show(
        'Password must be at least 6 characters',
        ToastAndroid.LONG,
      );
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(response => {
          console.warn(response);
          firebase
            .database()
            .ref('/user/' + response.user.uid)
            .set({
              name: this.state.name,
              status: 'Offline',
              email: this.state.email,
              photo: 'https://image.flaticon.com/icons/png/512/145/145843.png',
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              id: response.user.uid,
            })
            .catch(error => {
              ToastAndroid.show(error.message, ToastAndroid.LONG);
              this.setState({
                name: '',
                email: '',
                password: '',
              });
            });
          ToastAndroid.show(
            'Your account is successfully registered!',
            ToastAndroid.LONG,
          );

          this.props.navigation.navigate('Login');
        })
        .catch(error => {
          this.setState({
            errorMessage: error.message,
            loading: false,
            name: '',
            email: '',
            password: '',
          });
          ToastAndroid.show(this.state.errorMessage.message, ToastAndroid.LONG);
        });
      // Alert.alert('Error Message', this.state.errorMessage);
    }
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
                <Text style={styles.textheader}>SIGN UP</Text>
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
              <View style={styles.wraptextinput}>
                <TextInput
                  label="Full Name"
                  mode="outlined"
                  autoCapitalize="words"
                  style={styles.textInput}
                  onChangeText={txt => this.inputHandler('name', txt)}
                  theme={{
                    colors: {
                      primary: '#757EE3',
                      underlineColor: 'transparent',
                    },
                  }}
                />
                <TextInput
                  label="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  mode="outlined"
                  style={styles.textInput}
                  onChangeText={txt => this.inputHandler('email', txt)}
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
                  onChangeText={txt => this.inputHandler('password', txt)}
                  theme={{
                    colors: {
                      primary: '#757EE3',
                      underlineColor: 'transparent',
                    },
                  }}
                />
                <Button
                  mode="outlined"
                  color="#FFF"
                  loading={this.state.loading}
                  disabled={this.state.loading}
                  style={styles.btnregister}
                  onPress={this.submitForm}>
                  REGISTER
                </Button>
                <View style={styles.wrapsignup}>
                  <Text>Already have an account? </Text>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={styles.textsignup}> Sign In!</Text>
                  </TouchableOpacity>
                </View>
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
  btnregister: {
    borderColor: '#757EE3',
    backgroundColor: '#757EE3',
    marginTop: 20,
  },
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
  texterr: {color: 'red'},
});

const Register = withNavigation(RegisterOriginal);

export default Register;
