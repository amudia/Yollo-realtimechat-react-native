import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
  Keyboard,
  // Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import {TextInput, Button} from 'react-native-paper';
import {withNavigation} from 'react-navigation';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
import {setData, signup, pushData} from '../utils/initialize';
import {Spinner} from 'native-base';

class RegisterOriginal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      email: '',
      password: '',
      photo: '',
      errorMessage: null,
      isLoading: false,
      isSubmit: false,
    };
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.isSubmit !== this.state.isSubmit) {
      // eslint-disable-next-line react/no-did-update-set-state
      await this.setState({
        isLoading: false,
      });
      await this.register();
    }
  }
  async register() {
    try {
      await this.setState({
        isLoading: true,
        isAuth: true,
      });
      const responseFirebase = await signup(
        this.state.email,
        this.state.password,
      );
      // await this.clearState();
      if (responseFirebase) {
        const uid = await responseFirebase.user.uid;
        const email = await responseFirebase.user.email;
        await pushData('messages/' + uid, {
          isRegister: true,
        });
        await pushData('users/' + uid, {
          uid: uid,
          fullname: this.state.fullname,
          email: email,
          photo: null,
        });
        await this.props.navigation.replace('Login');
      } else {
        await this.setState({
          isLoading: false,
        });
        await Alert.alert(
          'Error',
          'Oops.. something error',
          [
            {
              text: 'Ok',
              style: 'cancel',
            },
          ],
          {cancelable: false},
        );
      }
    } catch ({message}) {
      await this.setState({
        isLoading: false,
      });
      Alert.alert(
        'Error',
        message,
        [
          {
            text: 'Ok',
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
    }
  }

  onSubmit() {
    Keyboard.dismiss();
    this.setState({
      isSubmit: true,
      isLoading: true,
    });
  }

  clearState() {
    this.setState({
      fullname: '',
      email: '',
      password: '',
    });
  }

  handleFullname = fullname => {
    this.setState({fullname});
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
                {/* <View style={{alignItems: 'center'}}>
                  <TouchableOpacity
                    style={{
                      height: 120,
                      width: 120,
                      backgroundColor: '#eee',
                      borderRadius: 100,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onPress={this.handleChoosePhoto}>
                    <Image
                      source={
                        this.state.photo !== ''
                          ? this.state.photo
                          : require('../assets/img/profile.jpg')
                      }
                      style={{height: 120, width: 120, borderRadius: 100}}
                    />
                  </TouchableOpacity>
                </View> */}
                <TextInput
                  label="Full Name"
                  mode="outlined"
                  autoCapitalize="words"
                  style={styles.textInput}
                  value={this.state.fullname}
                  onChangeText={fullname => this.handleFullname(fullname)}
                  theme={{
                    colors: {primary: '#757EE3', underlineColor: 'transparent'},
                  }}
                />
                <TextInput
                  label="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  mode="outlined"
                  style={styles.textInput}
                  value={this.state.email}
                  onChangeText={value =>
                    this.setState({
                      email: value,
                    })
                  }
                  theme={{
                    colors: {primary: '#757EE3', underlineColor: 'transparent'},
                  }}
                />
                <TextInput
                  label="Password"
                  mode="outlined"
                  secureTextEntry={true}
                  style={styles.textInput}
                  value={this.state.password}
                  onChangeText={value =>
                    this.setState({
                      password: value,
                    })
                  }
                  theme={{
                    colors: {primary: '#757EE3', underlineColor: 'transparent'},
                  }}
                />
                <Button
                  mode="outlined"
                  color="#FFF"
                  style={styles.btnregister}
                  onPress={event => this.onSubmit(event)}>
                  {this.state.isLoading && <Spinner />}
                  {!this.state.isLoading && <Text>REGISTER</Text>} 
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
