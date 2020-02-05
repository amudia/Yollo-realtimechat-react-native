import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Text,
  Dimensions,
  ToastAndroid,
  PermissionsAndroid,
  Platform,
  Image,
} from 'react-native';
import Header from '../components/Contact/Header';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import SafeAreaView from 'react-native-safe-area-view';
import Carousel from 'react-native-snap-carousel';
import firebase from 'react-native-firebase';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class Contact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initial: 'state',
      mapRegion: null,
      latitude: 0,
      longitude: 0,
      userList: [],
      uid: null,
    };
  }

  componentDidMount = async () => {
    await this.getUser();
    await this.getLocation();
  };
  getUser = async () => {
    const uid = await AsyncStorage.getItem('userid');
    this.setState({uid: uid});
    firebase
      .database()
      .ref('/user')
      .on('child_added', result => {
        let data = result.val();
        // eslint-disable-next-line eqeqeq
        if (data !== null && data.id != uid) {
          this.setState(prevData => {
            return {userList: [...prevData.userList, data]};
          });
        }
      });
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
          let region = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.00922,
            longitudeDelta: 0.00421 * 1.5,
          };
          this.setState({
            mapRegion: region,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            loading: false,
          });
          // console.warn(position);
        },
        error => {
          this.setState({errorMessage: error});
          // console.warn(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
          distanceFilter: 50,
          forceRequestLocation: true,
        },
      );
    });
  };

  onCorouselItemChange = index => {
    let location = this.state.userList[index];
    this._map.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.00922,
      longitudeDelta: 0.00421 * 1.5,
    });
  };

  _renderItem = ({item}) => (
    <>
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('ChatDetail', {item})}>
        <View style={styles.card}>
          <Text style={styles.name}>{item.name}</Text>
          <View style={styles.itemscoro}>
            <Image source={{uri: item.photo}} style={styles.imgcard} />
          </View>
          <Icon name="user" style={styles.icon} />
        </View>
      </TouchableOpacity>
    </>
  );

  render() {
    return (
      <>
        <StatusBar barStyle="light-content" backgroundColor="#847FE5" />
        <View style={styles.root}>
          <Header />
          <View>
            <SafeAreaView>
              {/* <Header /> */}
              <View>
                <MapView
                  style={styles.mapview}
                  showsMyLocationButton={true}
                  provider={PROVIDER_GOOGLE}
                  ref={map => (this._map = map)}
                  showsIndoorLevelPicker={true}
                  showsUserLocation={true}
                  zoomControlEnabled={true}
                  showsCompass={true}
                  showsTraffic={true}
                  region={this.state.mapRegion}
                  initialRegion={{
                    latitude: this.state.latitude,
                    longitude: this.state.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                  }}>
                  {this.state.userList.map(item => {
                    // console.warn(item);
                    return (
                      <Marker
                        key={item.id}
                        title={item.name}
                        description={item.status}
                        draggable
                        coordinate={{
                          latitude: item.latitude || 0,
                          longitude: item.longitude || 0,
                        }}
                        onCalloutPress={() => {
                          this.props.navigation.navigate('ProfileFriend', {
                            item,
                          });
                        }}>
                        <View style={styles.wrapimg}>
                          <Image
                            source={{uri: item.photo}}
                            style={styles.fotomap}
                          />
                          <Text>{item.name}</Text>
                        </View>
                      </Marker>
                    );
                  })}
                </MapView>
                <Carousel
                  ref={c => {
                    this._carousel = c;
                  }}
                  data={this.state.userList}
                  renderItem={this._renderItem}
                  containerCustomStyle={styles.corousel}
                  sliderWidth={Dimensions.get('window').width}
                  itemWidth={240}
                  style={styles.flex}
                  onSnapToItem={index => this.onCorouselItemChange(index)}
                />
              </View>
            </SafeAreaView>
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: '#fff', paddingBottom: 60},
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
  personStatus: {
    color: '#ACB5A0',
  },
  btnplus: {
    height: 50,
    width: 50,
    backgroundColor: '#757EE3',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    elevation: 5,
    position: 'absolute',
    top: 630,
    left: 310,
  },
  wrapcard: {
    marginHorizontal: 20,
    marginTop: 150,
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    borderColor: '#ACB5A0',
    backgroundColor: '#fff',
  },
  inputstyle: {borderBottomWidth: 1, borderBottomColor: '#ACB5A0'},
  btnlogin: {
    borderColor: '#757EE3',
    backgroundColor: '#757EE3',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnlogin1: {
    borderColor: '#757EE3',
    backgroundColor: 'orange',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textbtn: {textAlign: 'center', color: '#fff'},
  corousel: {
    position: 'absolute',
    bottom: 0,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    height: 170,
    width: 240,
    padding: 18,
    borderRadius: 5,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'orange',
    marginBottom: 10,
  },
  imgcard: {
    height: 60,
    width: 60,
    position: 'absolute',
    borderRadius: 50,
    marginTop: -10,
  },
  name: {
    color: '#4a675a',
    fontSize: 16,
    alignSelf: 'center',
    textAlign: 'center',
    position: 'absolute',
  },
  icon: {
    color: '#4a675a',
    fontSize: 32,
    marginTop: 100,
  },
  itemscoro: {alignItems: 'center'},
  mapview: {width: '100%', height: '100%'},
  fotomap: {width: 40, height: 40, borderRadius: 50},
  flex: {flex: 1},
  wrapimg: {alignItems: 'center'},
});

export default Contact;
